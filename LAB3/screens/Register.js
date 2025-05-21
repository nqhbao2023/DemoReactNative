import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);

  const hasError = {
    fullName: () => fullName.trim() === "",
    email: () => !email.includes("@"),
    password: () => password.length < 6,
    confirm: () => passwordConfirm !== password,
  };

  const handleCreateAccount = async () => {
    if (hasError.fullName() || hasError.email() || hasError.password() || hasError.confirm()) {
      Alert.alert("Lỗi", "Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
      // Tạo người dùng trong Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      // Lưu thông tin vào Firestore với document id là uid
      await firestore()
        .collection("LAB3_USER")
        .doc(uid)
        .set({
          uid,
          fullName,
          email,
          phone,
          address,
          role: "customer",
          createdAt: firestore.FieldValue.serverTimestamp()
        });

      Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.code === "auth/email-already-in-use"
          ? "Email đã được sử dụng"
          : error.message
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 26, textAlign: "center", marginBottom: 25, fontWeight: "bold" }}>
        Đăng Ký Tài Khoản
      </Text>

      <TextInput
        label="Họ Tên"
        value={fullName}
        onChangeText={setFullName}
        style={{ marginBottom: 5 }}
      />
      <HelperText type="error" visible={hasError.fullName()}>
        Không được để trống
      </HelperText>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 5 }}
      />
      <HelperText type="error" visible={hasError.email()}>
        Email không hợp lệ
      </HelperText>

      <TextInput
        label="Mật Khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hiddenPassword}
        style={{ marginBottom: 5 }}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <HelperText type="error" visible={hasError.password()}>
        Tối thiểu 6 ký tự
      </HelperText>

      <TextInput
        label="Xác Nhận Mật Khẩu"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={hiddenPasswordConfirm}
        style={{ marginBottom: 5 }}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
          />
        }
      />
      <HelperText type="error" visible={hasError.confirm()}>
        Mật khẩu không khớp
      </HelperText>

      <TextInput
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Địa chỉ"
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleCreateAccount} style={{ paddingVertical: 5 }}>
        Đăng ký
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 10 }}
      >
        Quay lại đăng nhập
      </Button>
    </View>
  );
};

export default Register;
