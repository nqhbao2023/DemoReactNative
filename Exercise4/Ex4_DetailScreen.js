import { Text,  } from 'react-native-paper'
import {View,StyleSheet } from 'react-native'
import React from 'react'

const Ex4_DetailScreen = () => {
  return (
    <View style= {styles.container}>
      <Text> Details Screen</Text>
    </View>
  )
}
const styles = StyleSheet.create ({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
})
export default  Ex4_DetailScreen;
