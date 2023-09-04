const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription', // This should match the model name of your Subscription
  },
});

module.exports = mongoose.model('User', userSchema);
