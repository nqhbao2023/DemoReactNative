import React from 'react';
import { View, Button } from 'react-native';

export default function MainMenuScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 20, padding: 20 }}>
      <Button title="Lý thuyết" onPress={() => navigation.navigate('List', { type: 'lythuyet', title: 'Lý thuyết' })} />
      <Button title="Thực hành" onPress={() => navigation.navigate('List', { type: 'thuchanh', title: 'Thực hành' })} />
    </View>
  );
}
