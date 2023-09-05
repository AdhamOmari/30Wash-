const User = require('../Models/User'); // Adjust the path as needed
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file
const bcrypt = require('bcrypt');
// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Perform validation on the input data
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If the credentials are valid, generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    console.log('✅ token    ', user._id )
    

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};



// Get user data by user ID
const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // You can customize the user data you want to return
    const userData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // Add more user properties as needed...
    };

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserData,

};
