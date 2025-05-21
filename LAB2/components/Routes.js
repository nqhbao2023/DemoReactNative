import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Contacts from '../components/Contacts';
import Favorites from '../components/Favorites';
import User from '../components/User';
import Profile from '../components/Profile';
import colors from '../utility/colors';

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <Ionicons name={icon} size={22} style={{ color: tintColor }} />
);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Contacts') iconName = 'people';
          else if (route.name === 'Favorites') iconName = 'star';
          else if (route.name === 'User') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const firstName = contact?.name?.split(' ')[0] || 'Profile';
          return {
            title: firstName,
            headerStyle: { backgroundColor: colors.blue },
            headerTintColor: 'white',
          };
        }}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: getDrawerItemIcon('home'),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          drawerIcon: getDrawerItemIcon('star'),
        }}
      />
      <Drawer.Screen
        name="User"
        component={User}
        options={{
          drawerIcon: getDrawerItemIcon('person'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Routes;