import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';


const Project1 = () => {
  return (
    <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.styleTxt}> Hello World!</Text>
        </View>

    </View>

  );};
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#74a7ed',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        width: 250,          
        height: 250,        
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,   
    },
    styleTxt:{
        fontSize:20,
        fontWeight:'bold'
    }
})
export default Project1;