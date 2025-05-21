import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert
} from 'react-native';


const Pokemon = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    Alert.alert('Thông tin đăng nhập', `Username: ${username}\nPassword: ${password}`);
  };

  return (
        <ImageBackground
        source={{ uri: 'https://e1.pxfuel.com/desktop-wallpaper/638/653/desktop-wallpaper-pokemon-go-type-backgrounds-background-pokemon.jpg' }}
        style={styles.background}
        resizeMode="cover"
        >
      <View style={styles.overlay}>
        <Image
          source={{ uri: 'https://wallpapers.com/images/featured/pokemon-go-72o54uz3g9w6rxyg.jpg' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.registerText}>REGISTER</Text>

        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          placeholderTextColor="#ccc"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          placeholderTextColor="#ccc"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    padding: 200,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 10,
  },
  registerText: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: -10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    width: '80%',
    height: 45,
    backgroundColor: '#f0e68c',
    marginTop: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  loginButton: {
    marginTop: 25,
    width: '80%',
    height: 45,
    backgroundColor: '#c17878',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
