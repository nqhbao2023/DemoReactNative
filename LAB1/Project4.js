import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

const Project4 = () => {
  const [pressCount, setPressCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>You've pressed the button: {pressCount} time(s)</Text>
      <Button
        title={`Pressed ${pressCount} time(s)`}  
        onPress={() => setPressCount(pressCount + 1)}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#747ced',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Project4;
