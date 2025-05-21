import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonComponent = ({ text, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const Project3 = () => {
  return (
    <View style={styles.container}>
      <ButtonComponent text="Say hello" onPress={() => alert("hello!")} />
      <ButtonComponent text="Say goodbye" onPress={() => alert("goodbye!")} buttonStyle={{ backgroundColor: '#4dc2c2' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#74edc7',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Project3;
