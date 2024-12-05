const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/awsConfig'); // Import the S3 configuration from awsConfig.js
const router = express.Router();

// Configure Multer to store files directly in S3
const upload = multer({
  storage: multerS3({
    s3: s3, // Use the imported S3 instance
    bucket: process.env.AWS_BUCKET_NAME, // S3 Bucket name
    acl: 'private', // Set to 'public-read' if files should be publicly accessible
    key: (req, file, cb) => {
      // Define the file name in S3 with a timestamp to avoid overwriting
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

// Handle file upload route
router.post('/upload-doc', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Return the file URL after successful upload to S3
  res.status(200).json({
    message: 'Document uploaded successfully!',
    fileUrl: req.file.location, // S3 file URL
  });
});

module.exports = router;
