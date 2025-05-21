// store/Index.tsx
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// Kiểu dữ liệu cho user
interface User {
  email: string;
  password: string;
  fullName: string;
}

interface State {
  userLogin: User | null;
  jobs: any[];
}

type Action =
  | { type: "USER_LOGIN"; value: User }
  | { type: "LOGOUT" };

const MyContext = createContext<[State, Dispatch<Action>] | undefined>(undefined);
MyContext.displayName = "My store";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value };
    case "LOGOUT":
      return { ...state, userLogin: null };
    default:
      throw new Error("Action không tồn tại");
  }
};

interface ProviderProps {
  children: ReactNode;
}

const MyContextControllerProvider = ({ children }: ProviderProps) => {
  const initialState: State = {
    userLogin: null,
    jobs: [],
  };
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch] as [State, Dispatch<Action>], [controller, dispatch]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContextProvider = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContextProvider must be used within a MyContextControllerProvider");
  }
  return context;
};

// Firebase Firestore & Auth Instances
const USERS_COLLECTION = firestore().collection("USERS");
const auth = firebaseAuth();

// Tạo tài khoản mới
const createAccount = async (email: string, password: string, fullName: string) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    Alert.alert("Tạo tài khoản thành công với email: " + email);

    await USERS_COLLECTION.doc(email).set({
      email,
      password,
      fullName,
    });
  } catch (e: any) {
    console.log("Lỗi tạo tài khoản:", e.message);
  }
};

// Đăng nhập
const login = async (dispatch: Dispatch<Action>, email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);

    const userDocRef = USERS_COLLECTION.doc(email);

    const unsubscribe = userDocRef.onSnapshot((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as User;
        console.log("Đăng nhập thành công với: " + email);
        dispatch({ type: "USER_LOGIN", value: data });
      }
    });

    // Optionally: return unsubscribe if you want to cleanup later
  } catch (e) {
    Alert.alert("Sai email và mật khẩu");
  }
};

// Đăng xuất
const logout = async (dispatch: Dispatch<Action>) => {
  try {
    await auth.signOut();
    dispatch({ type: "LOGOUT" });
  } catch (e) {
    console.log("Lỗi đăng xuất:", e);
  }
};

export {
  createAccount,
  login,
  logout,
  MyContextControllerProvider,
  useMyContextProvider
};
