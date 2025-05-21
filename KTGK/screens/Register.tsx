import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RootStackParamList } from '../type/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = ({ navigation }: RegisterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
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
      setPasswordError('Bạn chưa nhập mật khẩu');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải từ 6 ký tự trở lên');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Bạn chưa xác nhận mật khẩu');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Mật khẩu xác nhận không khớp');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      setLoading(true);
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await firestore().collection('KTGK_USER').doc(user.uid).set({
          email: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
          role: 'customer',
        });

        Alert.alert('Thông báo', 'Đăng ký thành công');
        navigation.replace('Login');
      } catch (error: any) {
        Alert.alert('Lỗi', error?.message || 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        onChangeText={setEmail}
        value={email}
        left={<TextInput.Icon icon="email" />}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!emailError}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
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
        autoCapitalize="none"
        error={!!passwordError}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="key" />}
        autoCapitalize="none"
        error={!!confirmPasswordError}
      />
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <TouchableOpacity
        style={styles.forgotBtn}
        onPress={() => navigation.navigate('ForgotPassword')}
        disabled={loading}
      >
        <Text style={styles.forgotBtnText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.registerBtn, loading && { backgroundColor: '#ccc' }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.registerBtnText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginRedirectBtn}
        onPress={() => navigation.navigate('Login')}
        disabled={loading}
      >
        <Text style={styles.loginRedirectText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

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
  registerBtn: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  registerBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loginRedirectBtn: {
    marginTop: 10,
  },
  loginRedirectText: {
    fontSize: 14,
    color: '#1976d2',
  },
});
