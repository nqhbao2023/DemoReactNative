import { useEffect } from "react";
import { firestore, auth } from "../firebaseConfig";
import { MyContextControllerProvider } from "./Index";
import Router from "../routers/Router";

const encodeEmail = (email) => email.replace(/\./g, "_").replace(/@/g, "_");

const admin = {
  fullName: "Admin",
  email: "vanhuudhp@gmail.com",
  phone: "0913117132",
  address: "Bình Dương",
  role: "admin",
};

const Lab3Screen = () => {
  useEffect(() => {
    const adminId = encodeEmail(admin.email);

    const unsubscribe = firestore()
      .collection("LAB3_USER") // Đồng bộ với collection trong Register.js
      .doc(adminId)
      .onSnapshot(async (snapshot) => {
        if (!snapshot.exists) {
          try {
            // Kiểm tra xem user đã tồn tại trong auth chưa
            let userCredential;
            try {
              userCredential = await auth().signInWithEmailAndPassword(admin.email, "123456");
            } catch (signInError) {
              if (signInError.code === "auth/user-not-found") {
                userCredential = await auth().createUserWithEmailAndPassword(admin.email, "123456");
              } else {
                throw signInError;
              }
            }

            // Lưu thông tin admin vào Firestore
            await firestore().collection("LAB3_USER").doc(adminId).set(admin);
            console.log("Đã thêm tài khoản admin mới");
          } catch (error) {
            console.error("Lỗi khi tạo tài khoản admin:", error.message);
          }
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <MyContextControllerProvider>
      <Router />
    </MyContextControllerProvider>
  );
};

export default Lab3Screen;