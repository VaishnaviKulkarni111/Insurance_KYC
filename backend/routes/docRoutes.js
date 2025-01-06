const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const router = express.Router();
const authenticate = require('../config/authMiddleware');

const {s3} = require('../config/awsConfig');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}_${req.file.originalname}`, // Unique file name
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'private', // Change to 'public-read' if needed
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});


router.get('/files',authenticate, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication and can access req.user.id
    console.log('Fetching files for user ID:', userId);
    console.log('Authenticated user:', req.user);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: `${userId}/`, // Assuming user files are stored in folders named by userId
    };
    console.log('S3 ListObjectsV2Command params:', params);

    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    console.log('Raw data received from S3:', JSON.stringify(data, null, 2));

    if (!data.Contents || data.Contents.length === 0) {
      console.log('No files found in the S3 bucket for this user.');
      return res.status(200).json({ message: 'No files found', files: [] });
    }

    // Map the file data to include only the necessary details
    const files = data.Contents.map((item) => ({
      fileName: item.Key.split('/').pop(), // Get the file name
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
      size: item.Size, // File size in bytes
      lastModified: item.LastModified, // Last modified date
    }));

    console.log('Formatted file list:', JSON.stringify(files, null, 2));
    res.status(200).json({ message: 'Files retrieved successfully', files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Failed to fetch files', error: error.message });
  }
});


module.exports = router;
