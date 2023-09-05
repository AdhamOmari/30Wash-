import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WaveView from 'react-native-waveview';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <WaveView
        style={styles.waveContainer}
        H={40} // Adjust the wave height as needed
        waveParams={[
          { A: 10, T: 180, fill: 'rgba(0, 0, 255, 0.2)' },
          { A: 15, T: 140, fill: 'rgba(0, 0, 255, 0.4)' },
          { A: 20, T: 100, fill: 'rgba(0, 0, 255, 0.6)' },
        ]}
      />
      <Text style={styles.title}>Welcome to My App</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton} onPress={handleRegisterPress}>
          <Text style={styles.socialButtonText}>Register with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleRegisterPress}>
          <Text style={styles.socialButtonText}>Register with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveContainer: {
    width: '100%',
    height: 150, // Adjust the wave container height as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  socialButtons: {
    flexDirection: 'row',
  },
  socialButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  socialButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
