const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userSchema'); // Adjust the path based on your project structure
const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const authenticate = async (req, res, next) => {
  const authHeader =req.headers.authorization // Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header is missing or invalid');
    return res.status(401).json({ message: 'Unauthorized' });
  }   

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id); // Assuming your JWT contains user ID as `id`

    if (!req.user) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


module.exports = authenticate ;
