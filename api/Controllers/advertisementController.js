const Advertisement = require('../Models/Advertisement');

// Create a new advertisement
const createAdvertisement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const advertisement = new Advertisement({ title, content });
    await advertisement.save();
    res.status(201).json({ message: 'Advertisement created successfully', advertisement });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the advertisement' });
  }
};

// Get all advertisements
const getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching advertisements' });
  }
};

module.exports = {
  createAdvertisement,
  getAllAdvertisements,
};
