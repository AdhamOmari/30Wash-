const User = require('../Models/User'); // Adjust the path as needed
const Subscription = require('../Models/Subscription');

// Create a new user with a subscription
const createUserWithSubscription = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, subscriptionId } = req.body;

    // Create a user
    const user = new User({ name, email, phoneNumber, password });

    // Find the selected subscription by its ID
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Assign the subscription to the user
    user.subscription = subscription;

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created with a subscription', user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

module.exports = {
  createUserWithSubscription,
};
