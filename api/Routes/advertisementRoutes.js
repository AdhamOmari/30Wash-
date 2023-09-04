// advertisementRoutes.js

const express = require('express');
const router = express.Router();
const AdvertisementController = require('../Controllers/advertisementController');
const SubscriptionController = require('../Controllers/subscriptionController');

// Fetch all advertisements
router.get('/advertisements', AdvertisementController.getAllAdvertisements);

// Fetch all subscriptions
router.get('/subscriptions', SubscriptionController.getAllSubscriptions);

module.exports = router;
