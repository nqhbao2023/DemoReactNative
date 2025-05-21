import { View, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { login, useMyContextController } from '../store/Index';

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const userLogin = controller?.userLogin;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;

  const loginHandle = () => {
    if (!hasErrorEmail() && !hasErrorPassword()) {
      login(dispatch, email, password);
    }
  };

  useEffect(() => {
    if (userLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: userLogin.role === 'admin' ? 'Admin' : 'Customer' }],
      });
    }
  }, [userLogin]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <HelperText type="error" visible={hasErrorEmail()}>
        Email không hợp lệ
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hiddenPassword}
        right={
          <TextInput.Icon
            icon={hiddenPassword ? 'eye' : 'eye-off'}
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <HelperText type="error" visible={hasErrorPassword()}>
        Mật khẩu phải từ 6 ký tự
      </HelperText>

      <Button mode="contained" onPress={loginHandle}>Login</Button>

      <View style={styles.link}>
        <Text>Chưa có tài khoản? </Text>
        <Button onPress={() => navigation.navigate('Register')}>Đăng ký</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
  link: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
});

export default Login;
