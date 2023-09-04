const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String, // Add imageUrl field for storing image URLs or file paths

  // Add more fields as needed
});

module.exports = mongoose.model('Advertisement', advertisementSchema);