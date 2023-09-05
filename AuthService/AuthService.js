// AuthService.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to set the user token upon successful login
export const setUserToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    console.error('Error setting user token:', e);
  }
};

// Function to get the user token (returns null if not logged in)
export const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.error('Error getting user token:', e);
    return null;
  }
};

// Function to clear the user token upon logout
export const clearUserToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.error('Error clearing user token:', e);
  }
};
