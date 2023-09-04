const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const subscriptionController = require('../Controllers/subscriptionController');

// Register a new user
router.post('/register', userController.registerUser);

// Log in a user
router.post('/login', userController.loginUser);

// Create a new subscription for the user
router.post('/subscriptions', subscriptionController.createSubscriptionForUser);

// Get all subscriptions for the user
router.get('/subscriptions/:userId', subscriptionController.getAllSubscriptionsForUser);

// Subscribe a user to a subscription
router.post('/subscribe', subscriptionController.subscribeUserToSubscription);

module.exports = router;
