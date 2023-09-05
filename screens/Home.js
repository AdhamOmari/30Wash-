import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import jwt_decode from 'jwt-decode';

const HomeScreen = () => {
  const [washData, setWashData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // To store user data

  useEffect(() => {
    // Fetch wash data from the backend
    axios
      .get('http://localhost:8000/api/subscriptions')
      .then((response) => {
        setWashData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wash data:', error);
        setLoading(false);
      });

    // Fetch user ID from AsyncStorage
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          const decodedToken = jwt_decode(token);
          if (decodedToken) {
            const userId = decodedToken.userId;
            // Now you have the user ID (userId) available for use
            // Set it in the component state if needed
            setUserData({ userId }); // You can set other user data here as well
          }
        }
      })
      .catch((error) => {
        console.error('Error getting token from AsyncStorage:', error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  // Function to handle subscription
  const handleSubscribe = (subscriptionId) => {
    if (!userData?.userId) {
      // Handle the case where userData is null or userId is undefined
      console.error('User data or userId is missing');
      return;
    }

    // Make a POST request to subscribe the user to the selected offer
    axios
      .post('http://localhost:8000/api/subscriptions/subscribe', {
        userId: userData.userId, // You can use userData.userId here
        subscriptionId,
      })
      .then((response) => {
        // Handle the successful subscription (e.g., show a success message)
        console.log('User subscribed successfully:', response.data);
      })
      .catch((error) => {
        // Handle subscription error (e.g., show an error message)
        console.error('Subscription error:', error);
      });
  };

  // Function to render each subscription item
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={() => handleSubscribe(item._id)}
      >
        <Text style={styles.subscribeButtonText}>Subscribe</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subscription Plans</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={washData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.flatList}
        />
      )}
      {userData && (
        <View style={styles.userData}>
          <Text>User Data:</Text>
          <Text>User ID: {userData.userId}</Text>
          {/* Display other user data as needed */}
        </View>
      )}
      <View>

        <Button
          title="Open Drawer"
          onPress={() => navigation.openDrawer()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatList: {
    marginTop: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userData: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});

export default HomeScreen;
