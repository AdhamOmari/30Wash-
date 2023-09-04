const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  title: String,
  price: Number,
  numWashes: Number,
  imageUrl: String, // Add imageUrl field for storing image URLs or file paths
  // Add more fields as needed
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
