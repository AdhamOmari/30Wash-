const express = require('express');
const router = express.Router();
const SubscriptionController = require('../Controllers/subscriptionController');

// Create a new subscription
router.post('/', SubscriptionController.createSubscriptionForUser);

// Get all subscriptions for a specific user
router.get('/:userId', SubscriptionController.getAllSubscriptionsForUser);

// Get all subscriptions (add this route)
router.get('/', SubscriptionController.getAllSubscriptions);

// Subscribe a user to a subscription
router.post('/subscribe', SubscriptionController.subscribeUserToSubscription);

module.exports = router;
