import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [washData, setWashData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch wash data from the backend
    axios.get('http://localhost:8000/api/subscriptions')
      .then((response) => {
        setWashData(response.data); // Assuming the response is an array of wash data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wash data:', error);
        setLoading(false);
      });
  }, []);

  const handleSubscribe = (userId, subscriptionId) => {
    // Make a POST request to subscribe the user to the selected offer

    console.log('✅ element    ', userId)
    console.log('✅ element    ', subscriptionId)
    
    axios.post('http://localhost:8000/api/subscriptions/subscribe', {
      userId,
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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={() => handleSubscribe('user_id_here', item._id)}
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
          keyExtractor={(item) => item._id} // Assuming _id is a unique identifier
          style={styles.flatList}
        />
      )}
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
});

export default HomeScreen;
