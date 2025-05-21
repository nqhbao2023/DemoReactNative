import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { MyContextControllerProvider } from '../DemoReactNative/KTGK/store/Index';
import Lab3Screen from '../DemoReactNative/LAB3/store/Lab3Screen';
import Login from '../DemoReactNative/LAB3/screens/Login';
import Register from '../DemoReactNative/LAB3/screens/Register';
// import Home from '../DemoReactNative/LAB3/screens/Home';
// import FoodList from '../DemoReactNative/KTGK/screens/FoodList';
// import Cart from '../DemoReactNative/KTGK/screens/Cart';
// import Login from '../DemoReactNative/KTGK/screens/Login';
// import Register from '../DemoReactNative/KTGK/screens/Register';
// import Cuisine from '../DemoReactNative/KTGK/screens/Cuisine';
// import PaymentSuccess from '../DemoReactNative/KTGK/screens/PaymentSuccess';
// import ForgotPassword from './KTGK/screens/ForgotPassword';
// import MainMenuScreen from './screens/MainMenuScreen';
// import ListScreen from './screens/ListScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import Ex4_DetailScreen from './Exercise4/Ex4_DetailScreen';
// import HomeScreen from './Exercise4/HomeScreen';
// import Profile from './Exercise4/Profile';
// import CustomDrawerBar from './Exercise4/CustomDrawerBar';
// import Pokemon from './components/Pokemon';
// import Cafe from './components/Cafe';
// import Design from '../DemoReactNative/android/Excersise3/Design';
// import CreateAcc from './android/Excersise3/CreateAcc';
// import ForgotAcc from './android/Excersise3/ForgotAcc';
// import Routes from '../DemoReactNative/LAB2/components/Routes';
// import TodoScreen from './android/Exercise5/TodoScreen';
// import Todo from './android/Exercise5/Todo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <MyContextControllerProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lab3Screen">
            <Stack.Screen name="Lab3Screen" component={Lab3Screen} options={{ title: 'Lab3Screen' }} />
              <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
              {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'ForgotPassword' }} /> */}
              <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
              {/* <Stack.Screen name="FoodList" component={FoodList} options={{ title: 'Danh sách món ăn' }} />
              <Stack.Screen name="Cart" component={Cart} options={{ title: 'Giỏ hàng' }} /> */}
              {/* <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ title: 'Thanh toán thành công' }} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
}

export default App;
