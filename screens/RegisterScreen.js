import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false); // State for spinner
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      // Validation logic...
      if (!name) {
        setNameError('Name is required');
        return;
      }
      setNameError('');

      if (!validateEmail(email)) {
        setEmailError('Invalid email');
        return;
      }
      setEmailError('');

      if (!phoneNumber) {
        setPhoneNumberError('Phone number is required');
        return;
      }
      setPhoneNumberError('');

      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      }
      setPasswordError('');

      setLoading(true); // Show the spinner

      await axios.post('http://localhost:8000/api/users/register', {
        name,
        email,
        phoneNumber,
        password,
      });

      console.log(name, email,
        phoneNumber,
        password)
      setLoading(false); // Hide the spinner

      navigation.navigate('Login');
    } catch (error) {
      setLoading(false); // Hide the spinner in case of an error
      console.error('Registration error:', error);
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
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        onFocus={() => setFocusedField('name')}
        style={[
          styles.input,
          focusedField === 'name' && styles.focusedInput,
          nameError && styles.errorInput,
        ]}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedField('email')}
        style={[
          styles.input,
          focusedField === 'email' && styles.focusedInput,
          emailError && styles.errorInput,
        ]}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        onFocus={() => setFocusedField('phoneNumber')}
        style={[
          styles.input,
          focusedField === 'phoneNumber' && styles.focusedInput,
          phoneNumberError && styles.errorInput,
        ]}
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onFocus={() => setFocusedField('password')}
        secureTextEntry
        style={[
          styles.input,
          focusedField === 'password' && styles.focusedInput,
          passwordError && styles.errorInput,
        ]}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Button title="Register" onPress={handleRegister} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center', // Center the placeholder text
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light background color for input
    color: 'white',
  },
  focusedInput: {
    borderColor: '#007AFF', // Add a border color when focused
  },
  errorInput: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Light red background for error input
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default RegisterScreen;
