import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CustomHeader from './CustomHeader';
import Home from '../screens/Home';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen"
      screenOptions={{
        header: ({ scene, navigation }) => (
          <CustomHeader navigation={navigation} />
        ),
      }}
    >



<Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ title: 'WelcomeScreen' }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'LoginScreen'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Register' }}
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
