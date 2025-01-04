const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userSchema'); 
const sgMail = require('@sendgrid/mail');

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  

router.post('/send-verification-email', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Authorization required' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const emailToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
    user.emailVerificationToken = emailToken;
    user.emailVerificationExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const verificationLink = `http://localhost:3000/verify-email/${emailToken}`;
    const message = {
      to: user.email,
      from: 'vaishnavirk2203@gmail.com', // Your SendGrid verified email address
      subject: 'Email Verification',
      text: `Verify your email by clicking this link: ${verificationLink}`,
      html: `<p>Verify your email by clicking this link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    await sgMail.send(message);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification token expired' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = null; // Clear the token after successful verification
    user.emailVerificationExpires = null;
    await user.save();

    res.status(200).json({ message: 'Email successfully verified' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});



// Route to fetch user's email and mobile
router.get('/user-details', async (req, res) => {
  try {
    // Check if Authorization header exists
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Extract user ID from decoded token
    const userId = decoded.id;

    // Fetch user details from database
    const user = await User.findById(userId).select('email mobile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.status(200).json({
      email: user.email,
      mobile: user.mobile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
