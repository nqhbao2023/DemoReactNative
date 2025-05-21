import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RootStackParamList } from '../type/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  let valid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    setEmailError('Bạn chưa nhập email');
    valid = false;
  } else if (!emailRegex.test(email)) {
    setEmailError('Email không đúng định dạng');
    valid = false;
  } else {
    setEmailError('');
  }

  if (!password) {
    setPasswordError('Bạn chưa nhập password');
    valid = false;
  } else {
    setPasswordError('');
  }

  if (valid) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Đăng nhập thành công');
      navigation.replace('Cuisine', { category: 'Chinese' });
    } catch (error: any) {
      Alert.alert('Lỗi', error.message);
    }
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant App</Text>
      <TextInput
        style={styles.input}
        placeholder="Test@gmail.com"
        placeholderTextColor="#ccc"
        onChangeText={setEmail}
        value={email}
          left={<TextInput.Icon icon="email" />}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
     <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="key" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity
        style={styles.forgotBtn}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotBtnText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => navigation.navigate('Register')}
      >
<Text style={styles.signUpBtnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 0,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotBtnText: {
    fontSize: 14,
    color: '#f57c00',
  },
  loginBtn: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  signUpBtn: {
    backgroundColor: '#1976d2',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  signUpBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});