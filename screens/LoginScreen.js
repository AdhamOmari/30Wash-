import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    }
    setEmailError('');

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordError('');
    setServerError(''); // Clear any previous server error

    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/login',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Home');
      } else {
        setServerError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setServerError('An error occurred while logging in. Please try again later.');
      console.error('Login error:', error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/cars.png')}
        style={styles.logo}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          Platform.OS === 'ios' ? styles.iosInput : styles.androidInput,
        ]}
        placeholderTextColor="#BDBDBD"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          Platform.OS === 'ios' ? styles.iosInput : styles.androidInput,
        ]}
        placeholderTextColor="#BDBDBD"
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      {serverError ? <Text style={styles.errorText}>{serverError}</Text> : null}
      <TouchableOpacity
        style={[
          styles.loginButton,
          Platform.OS === 'ios' ? styles.iosButton : styles.androidButton,
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  input: {
    width: '80%',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#323232',
    color: 'white',
    borderRadius: 8,
  },
  iosInput: {},
  androidInput: {},
  errorText: {
    color: '#E57373',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  loginButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  iosButton: {
    backgroundColor: '#007AFF',
    width: '80%',
  },
  androidButton: {
    backgroundColor: '#007AFF',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: 'white',
    marginRight: 5,
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
