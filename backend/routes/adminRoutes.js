const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  

const authenticate = require('../config/authMiddleware');

const User = require('../models/userSchema'); // Assuming a User model exists

// Get all users
router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.find({}, 'name email createdAt status');
    res.status(200).json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
});

// Get user details by ID
router.get('/users/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from URL params
    // Find the user by ID
    const user = await User.findById(userId).select('fname email mobile mobileVerified emailVerified submission status');

    if (!user) {  
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details
    res.status(200).json({ message: 'User details fetched successfully', user });
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ message: 'Failed to fetch user details', error: error.message });
  }
});

router.put('/update-status/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status, reason } = req.body; // `reason` is optional, used for rejection

  try {
    // Update the user's status in the database
    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Define the email message
    const message = {
      to: user.email,
      from: 'vaishnavirk2203@gmail.com', // Your SendGrid verified email address
      subject: `Your application status has been updated to ${status}`,
      text: status === 'Approved'
        ? `Congratulations! Your application has been approved. You can now access additional features.`
        : `Your application has been rejected. Reason: ${reason || 'Not specified'}`,
    };

    // Send the email
    await sgMail.send(message);

    res.status(200).json({
      message: `Status updated to ${status} and email sent successfully.`,
      user,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});

module.exports = router;
