import { createContext, useContext, useReducer } from "react";
import { auth, firestore } from "../firebaseConfig";

// --- Initial state
const initialState = {
  userLogin: null,
};

// --- Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_USER_LOGIN":
      return { ...state, userLogin: action.value };
    default:
      return state;
  }
}

// --- Context
const MyContext = createContext();

// --- Provider
function MyContextControllerProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={[controller, dispatch]}>
      {children}
    </MyContext.Provider>
  );
}

// --- Custom hook
const useMyContextController = () => useContext(MyContext);

// --- Login logic (dành cho native SDK)
const encodeEmail = (email) => email.replace(/\./g, "_").replace(/@/g, "_");

const login = async (dispatch, email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userDoc = await firestore().collection("USERS").doc(encodeEmail(email)).get();

    if (userDoc.exists) {
      dispatch({ type: "SET_USER_LOGIN", value: userDoc.data() });
    } else {
      alert("Không tìm thấy thông tin người dùng.");
    }
  } catch (error) {
    alert("Đăng nhập thất bại: " + error.message);
  }
};

export { MyContextControllerProvider, useMyContextController, login };
