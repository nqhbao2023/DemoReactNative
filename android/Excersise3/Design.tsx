// Design.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Tạo kiểu cho Stack Navigator
type RootStackParamList = {
  Design: undefined;
  CreateAcc: undefined;
  ForgotAcc: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Design'>;

const Design = () => {
  const navigation = useNavigation<NavigationProp>(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleLogin = () => {
    let valid = true;

    if (!email.trim()) {
      setErrorEmail('Email is required!');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail('Please enter a valid email address.');
      valid = false;
    } else {
      setErrorEmail('');
    }

    if (!password.trim()) {
      setErrorPassword('Password is required!');
      valid = false;
    } else if (password.length < 6) {
      setErrorPassword('Password must be at least 6 characters.');
      valid = false;
    } else {
      setErrorPassword('');
    }

    if (valid) {
      console.log('Login successful!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Firebase_Logo_%28No_wordmark%29_%282024-%29.svg/1200px-Firebase_Logo_%28No_wordmark%29_%282024-%29.svg.png?20240514212555' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder='Enter Email'
        placeholderTextColor='#ccc'
        value={email}
        onChangeText={setEmail}
      />
      {errorEmail !== '' && <Text style={styles.errorText}>{errorEmail}</Text>}

      <TextInput
        style={styles.input}
        placeholder='Enter Password'
        placeholderTextColor='#ccc'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorPassword !== '' && <Text style={styles.errorText}>{errorPassword}</Text>}

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CreateAcc')}>
        <Text style={styles.linkText}>Create a new account?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate('ForgotAcc')}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#000',
    borderWidth: 0.6,
    alignSelf: 'center',
  },
  loginBtn: {
    backgroundColor: '#fa6348',
    width: '90%',
    height: 40,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  createBtn: {
    marginTop: 5,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  forgotBtn: {
    marginTop: 5,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
  },
});

export default Design;
