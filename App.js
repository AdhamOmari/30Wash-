import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
// import FacebookAuth from './AuthService/FacebookAuth';
// import GoogleAuth from './AuthService/GoogleAuth';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      {/* Add the Google and Facebook authentication components here */}
      {/* <GoogleAuth /> */}
      {/* <FacebookAuth /> */}
    </NavigationContainer>
  );
}
