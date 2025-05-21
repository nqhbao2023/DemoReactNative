import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const lyThuyetComponents = [
  { name: 'Pokemon', componentName: 'Pokemon' },
  { name: 'Cafe', componentName: 'Cafe' },
  { name: 'Design', componentName: 'Design' },
  { name: 'CreateAcc', componentName: 'CreateAcc' },
  { name: 'ForgotAcc', componentName: 'ForgotAcc' },
  { name: 'HomeScreen', componentName: 'HomeScreen' },
  { name: 'MyDrawer', componentName: 'MyDrawer' },
  {name : 'BottomTabNavigator', componentName: 'BottomTabNavigator'},
  {name: 'TodoScreen', componentName: 'TodoScreen'}, 
];

const thucHanhComponents = [
  { name: 'Project1', componentName: 'Project1' },
  { name: 'Project2', componentName: 'Project2' },
  { name: 'Project3', componentName: 'Project3' },
  { name: 'Project4', componentName: 'Project4' },
  { name: 'Project5', componentName: 'Project5' },
  { name: 'Project6', componentName: 'Project6' },
  { name: 'Project7', componentName: 'Project7' },
  { name: 'Project8', componentName: 'Project8' },
  { name: 'LAB1_2', componentName: 'LAB1_2' },
  {name: 'Login', componentName: 'Login'},
  {name: 'Routes', componentName: 'Routes'},
];


export default function ListScreen({ navigation, route }) {
  const components = route.params.type === 'lythuyet' ? lyThuyetComponents : thucHanhComponents;

  return (
    <ScrollView>
      {components.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('Detail', {
            title: item.name,
            componentName: item.componentName,
          })}
          style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
