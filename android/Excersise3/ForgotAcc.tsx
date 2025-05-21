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

type RootStackParamList = {
  Design: undefined;
  CreateAcc: undefined;
  ForgotAcc: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'ForgotAcc'>;
const ForgotAcc = ()  => {

  const [forgotEmail, setforgotEmail] = useState('')
  type NavigationProp = StackNavigationProp<RootStackParamList, 'ForgotAcc'>;
  const navigation = useNavigation<NavigationProp>();
  return(

    <View style ={styles.container}>

      <Text style ={styles.title}>Reset your password! </Text>
      <View style= {styles.inputContainer}>
      <Icon name='email-outline' size={20} style={styles.icon}/>
      <TextInput
      style={styles.input}
      placeholder='Hbao@gmail.com'
      placeholderTextColor='#999'
      value={forgotEmail}
      onChangeText={setforgotEmail}
      />
      </View >
        <TouchableOpacity style ={styles.sendBtn}>
          <Text style={styles.sendTxt}>Send reset email </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.navigate('Design')}>
          <Text style={styles.goBackTxt}> Go back login </Text>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignContent:'center',
    bottom:360,
    padding:10,
  },
  title:{
    fontSize:20,
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:10,
  },
  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:8,
    marginBottom:15,
    paddingHorizontal:10,
  },
  icon:{
    color:'#999',
    marginRight:5,
  },
  input:{
    flex:1,
    height:40,
    color:'#000'
  },
  sendBtn:{
    backgroundColor:'#fa6348',
    borderRadius:8,
    paddingVertical:10,
    alignItems:'center',
    marginTop:10,
  },
  sendTxt:{
    fontSize:15,
    fontWeight:'bold',
    color:'#fff'
  },
  goBackBtn:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:6,
  },
  goBackTxt:{
    color:'#679df5',
    fontSize:13,
  },
})
export default ForgotAcc;
