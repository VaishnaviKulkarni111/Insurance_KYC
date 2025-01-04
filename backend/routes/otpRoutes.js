const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // For generating OTP
const sns = require('../config/awsConfig');
const { PublishCommand } = require('@aws-sdk/client-sns'); 

// Function to generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { mobile } = req.body;
  console.log("Mobile number received:", mobile);

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
    console.log('SNS Response:', result);

    // Save OTP and mobile number to DB (for verification later)
    // Example schema: OTPs({ mobile, otp, expiresAt })
    // await OTP.create({ mobile, otp, expiresAt: Date.now() + 300000 });

    return res.status(200).json({ message: 'OTP sent successfully', otpId: result.MessageId });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Failed to send OTP', error });
  }
});


router.post('/verify-otp', async (req, res) => {
    const { mobile, otp } = req.body;
  
    if (!mobile || !otp) {
      return res.status(400).json({ message: 'Mobile number and OTP are required' });
    }
  
    try {
      // Fetch OTP from DB
      const record = await OTP.findOne({ mobile });
  
      if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      // Mark the number as verified in DB
      await User.updateOne({ mobile }, { $set: { mobileVerified: true } });
  
      return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ message: 'Failed to verify OTP', error });
    }
  });
  
module.exports = router;
