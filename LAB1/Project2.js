import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';


const Project2 = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style ={styles.btn} onPress = {() => Alert.alert('Hello!!!')}>
                <Text style={styles.styleTxt}>Button</Text>
        </TouchableOpacity>

    </View>

  );};



const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#747ced',
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{
        backgroundColor:'#74edc7',
        borderRadius:8,
    },
    styleTxt:{
        fontSize:20,
        fontWeight:'bold'
    }
})
export default Project2;