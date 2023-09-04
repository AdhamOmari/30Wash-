const Subscription = require('../Models/Subscription');
const User = require('../Models/User'); // Adjust the path as needed

// Create a new subscription for the user
const createSubscriptionForUser = async (req, res) => {
  try {
    const { userId, title, price, numWashes } = req.body;

    // Find the user by ID (replace this with your User model)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new subscription and associate it with the user
    const subscription = new Subscription({ title, price, numWashes, user: userId });
    await subscription.save();

    // Update the user's subscription field
    user.subscription = subscription;

    // Save the updated user
    await user.save();

    res.status(201).json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the subscription' });
  }
};

// Get all subscriptions for the user
const getAllSubscriptionsForUser = async (req, res) => {
  try {
    // Extract user-specific data from the request, e.g., userId
    const { userId } = req.params;

    // Find the user by ID (replace this with your User model)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all subscriptions associated with the user
    const subscriptions = await Subscription.find({ user: userId });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching subscriptions' });
  }
};
// Get all subscriptions (add this function)
const getAllSubscriptions = async (req, res) => {
  try {
    // Fetch all subscriptions from the database
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching subscriptions' });
  }
};

// Subscribe a user to a subscription
const subscribeUserToSubscription = async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the subscription by ID
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }




    // Update the user's subscription field
    user.subscription = subscription;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User subscribed to the subscription', user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while subscribing the user' });
  }
};


module.exports = {
  createSubscriptionForUser,
  getAllSubscriptionsForUser,
  subscribeUserToSubscription,
  getAllSubscriptions
};
