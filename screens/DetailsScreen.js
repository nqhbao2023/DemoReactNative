import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Pokemon from '../components/Pokemon';
import Cafe from '../components/Cafe';
import Design from '../android/Excersise3/Design'
import CreateAcc from '../android/Excersise3/CreateAcc';
import ForgotAcc from '../android/Excersise3/ForgotAcc';
import Project1 from '../LAB1/Project1';
import Project2 from '../LAB1/Project2';
import Project3 from '../LAB1/Project3';
import Project4 from '../LAB1/Project4';
import Project5 from '../LAB1/Project5';
import Project6 from '../LAB1/Project6';
import Project7 from '../LAB1/Project7';
import Project8 from '../LAB1/Project8';
import LAB1_2 from '../LAB1/LAB1_2';
import HomeScreen from '../Exercise4/HomeScreen';
import CustomDrawerBar from '../Exercise4/CustomDrawerBar';
import CustomNavigationBar from '../Exercise4/CustomNavigationBar';
import Ex4_DetailScreen from '../Exercise4/Ex4_DetailScreen';
import MyDrawer from '../Exercise4/MyDrawer';
import Profile from '../Exercise4/Profile';
import BottomTabNavigator from '../Exercise4/BottomTabNavigator';
import Routes from '../LAB2/components/Routes';
import TodoScreen from '../android/Exercise5/TodoScreen';
import Todo from '../android/Exercise5/Todo';
import  Login from '../KTGK/screens/Login';
import Register from '../KTGK/screens/Register';
import FoodList from '../KTGK/screens/FoodList';
import Cart from '../KTGK/screens/Cart';
import Cuisine from '../KTGK/screens/Cuisine';
import PaymentSuccess from '../KTGK/screens/PaymentSuccess';

export default function DetailScreen({ route, navigation }) {
  const componentName = route?.params?.componentName;

  const componentsMap = {
    Pokemon: Pokemon,
    Cafe: Cafe,
    Design: Design,
    CreateAcc: CreateAcc,
    ForgotAcc: ForgotAcc,
    Project1: Project1,
    Project2: Project2,
    Project3: Project3,
    Project4: Project4,
    Project5: Project5,
    Project6: Project6,
    Project7: Project7,
    Project8: Project8,
    LAB1_2: LAB1_2,
    CustomDrawerBar: CustomDrawerBar,
    CustomNavigationBar: CustomNavigationBar,
    Ex4_DetailScreen: Ex4_DetailScreen,
    HomeScreen: HomeScreen,
    MyDrawer: MyDrawer,
    Profile: Profile,
    BottomNavigation: BottomTabNavigator, 
    BottomTabNavigator: BottomTabNavigator,
    Routes: Routes,
    TodoScreen: TodoScreen,
    Todo: Todo,
    Login: Login,
    Register: Register,
    FoodList: FoodList,
    Cart: Cart,
    Cuisine: Cuisine,
  };

  const SelectedComponent = componentsMap[componentName];

  if (!SelectedComponent) {
    return (
      <View style={styles.container}>
        <Text>Component not found: {componentName || 'Unknown Component'}</Text>

      </View>
    );
  }

  return <SelectedComponent navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});
