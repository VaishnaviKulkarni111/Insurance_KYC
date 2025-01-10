const express = require('express');
const router = express.Router();
const authenticate = require('../config/authMiddleware');
console.log('authenticate:', authenticate); // Should log the function definition

const User = require('../models/userSchema'); // Assuming a User model exists

// Get all users
router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.find({}, 'name email createdAt status');
    console.log("users in bkend", users )
    res.status(200).json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
});

module.exports = router;
