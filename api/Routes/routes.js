const express = require('express');
const router = express.Router();

// Import your controllers
const AdvertisementController = require('../Controllers/advertisementController');
const userRoutes = require('./userRoutes'); // Import user-related routes

// Create a new subscription
const subscriptionsRouter = express.Router();


// Create a new advertisement
const advertisementsRouter = express.Router();
advertisementsRouter.post('/', AdvertisementController.createAdvertisement);
advertisementsRouter.get('/', AdvertisementController.getAllAdvertisements);

// Mount the resource-specific routers
router.use('/subscriptions', subscriptionsRouter);
router.use('/advertisements', advertisementsRouter);
router.use('/users', userRoutes);

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

module.exports = router;
