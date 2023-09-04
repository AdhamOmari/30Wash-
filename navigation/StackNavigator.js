import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CustomHeader from './CustomHeader';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">

      
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader navigation={navigation} />
          ),
        })}
      />
       <Stack.Screen
        name="Home"
        component={Home} // Add the Home screen component
        options={{ title: 'Home' }} // Optional: Customize the header title
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
