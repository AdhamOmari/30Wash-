import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = ({ navigation, userLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login'); // Replace 'Login' with your login screen name
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userLoggedIn ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Ionicons name="log-out" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomHeader;
