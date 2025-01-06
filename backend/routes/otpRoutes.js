const express = require('express');
const router = express.Router();
const { sns } = require('../config/awsConfig'); 
const { PublishCommand } = require('@aws-sdk/client-sns');
const crypto = require('crypto'); 
const OTP = require('../models/otpSchema'); 
const User = require('../models/userSchema'); 

// Function to generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }

  const otp = generateOTP();
  const message = `Your OTP for verification is: ${otp}`;

  try {
    // Send SMS via AWS SNS  
    const command = new PublishCommand({
      Message: message,
      PhoneNumber: mobile, // Mobile number with country code, e.g., +919876543210
    });

    const result = await sns.send(command);

    // Save OTP to DB
    const otpRecord = new OTP({
      mobile,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // Expires in 5 minutes
    });
    await otpRecord.save();
     console.log("saving otp", otpRecord)
    return res.status(200).json({ message: 'OTP sent successfully', otpId: result.MessageId });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Failed to send OTP', error });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;
  console.log('Request Body:', req.body);

  if (!mobile || !otp) {
    console.error('Missing mobile or OTP');
    return res.status(400).json({ message: 'Mobile number and OTP are required' });
  }

  try {
    const record = await OTP.findOne({ mobile }).sort({ expiresAt: -1 });
    console.log("record", record)
    if (!record) {
      console.error('No OTP record found for this mobile');
      return res.status(400).json({ message: 'No OTP record found for this mobile number' });
    }

    console.log('Fetched OTP Record:', record);

    if (record.otp !== otp || record.expiresAt < Date.now()) {
      console.error('Invalid or expired OTP');
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await User.updateOne({ mobile }, { $set: { mobileVerified: true } });
    await OTP.deleteOne({ _id: record._id });

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Failed to verify OTP', error });
  }
});



module.exports = router;
