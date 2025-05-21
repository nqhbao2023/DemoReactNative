import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/type';
import auth from '@react-native-firebase/auth';

type ForgotPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Vui lòng nhập email');
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('Email không đúng định dạng');
      return;
    } else {
      setEmailError('');
    }

    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Thành công',
        'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư đến.'
      );
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi gửi email đặt lại mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập email đã đăng ký"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
        autoCapitalize="none"
        keyboardType="email-address"
        error={!!emailError}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TouchableOpacity
        style={[styles.resetBtn, loading && { backgroundColor: '#ccc' }]}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.resetBtnText}>Gửi lại mật khẩu</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

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
  resetBtn: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  resetBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  backBtn: {
    marginTop: 20,
  },
  backBtnText: {
    fontSize: 14,
    color: '#1976d2',
  },
});
