const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userSchema'); // Adjust the path based on your project structure

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Assuming your User model has a method to fetch user by ID
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
