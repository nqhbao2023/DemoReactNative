import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// định nghĩa danh sách các màn hình
type RootStackParamList = {
  Design: undefined;
  CreateAcc: undefined;
};
const CreateAcc = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ showConfirm, setShowConfirm] = useState(false);
  type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateAcc'>;
  const navigation = useNavigation<NavigationProp>();

  return (
 
    <View style = {styles.container}>
        <Text style= {styles.title}> Create a new account!</Text>
      <View style= {styles.inputContainer}>
      <Icon name="email-outline" size={20} style = {styles.Icon}/>
      <TextInput
       style = {styles.input}
      placeholder='Hbao@gmail.com'
      placeholderTextColor= '#999'
      value={email}
      onChangeText={setEmail}
      />
      </View>

      <View style = {styles.inputContainer}>
      <Icon name="lock-outline" style = {styles.Icon}/>
        <TextInput
        style = {styles.input}
        placeholder='•••••••'
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        />
        <TouchableOpacity onPress = {()=> setShowPassword( !showPassword)} >
          <Icon name= { showPassword ? 'eye-off-outline': 'eye-outline'}
          size={20}
          style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
            <Icon name='lock-outline' style={styles.Icon}/>
            <TextInput
            style = {styles.input}
            placeholder='•••••••'
            secureTextEntry={!showConfirm}
            value={confirmPass}
            onChangeText={setConfirmPass}
            />
            <TouchableOpacity onPress={() => setShowConfirm( !showConfirm)} >
              <Icon name = {showConfirm ? 'eye-off-outline':'eye-outline'}
              size={20}
              style={styles.iconRight}
              />
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={styles.signupBtn}>
              <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Design')}>
              <Text style={styles.linkText}>Already have an account?</Text>
            </TouchableOpacity>
    </View>
  );};

const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignContent:'center',
    padding:10,
  },
  title:{
    fontSize:25,
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:15,
  },

  inputContainer: {
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom : 15,
    paddingHorizontal: 10,
  },
  Icon: {
    color: '#999',
    marginRight:5,

  },
  iconRight:{
    color: '#ccc',
    marginLeft:5,
  },
  input:{
    flex: 1,
    height: 40,
    color:'#000'
  },
  signupBtn:{
    borderRadius:9,
    backgroundColor:'#fa6348',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop:10,
  },
  signupText:{
    fontSize:15,
    fontWeight:'bold',
    color:'#fff'
  },
  linkContainer:{
    marginTop:10,
    alignItems:'center',
  },
  linkText:{
    color:'#679df5',
    fontSize:13,
  },
})


export default CreateAcc;