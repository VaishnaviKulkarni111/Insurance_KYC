const express = require('express');
const multer = require('multer');
const {  PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const router = express.Router();
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const authenticate = require('../config/authMiddleware');
console.log('authenticate in docroute:', authenticate); // Should log the function definition

const {s3} = require('../config/awsConfig');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const userId = req.user._id; // Ensure this is fetched from the authenticated user

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${userId}/${Date.now()}_${req.file.originalname}`, // Unique file name
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
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


router.get('/files', authenticate, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: `${userId}/`, // Assuming user files are stored in folders named by userId
    };

    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    if (!data.Contents || data.Contents.length === 0) {
      console.log('No files found in the S3 bucket for this user.');
      return res.status(200).json({ message: 'No files found', files: [] });
    }

    // Generate pre-signed URLs for the files
    const files = await Promise.all(
      data.Contents.map(async (item) => {
        const fileKey = item.Key;

        // Generate a pre-signed URL for each file
        const getObjectCommand = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
        });

        const preSignedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 }); // URL valid for 1 hour

        return {
          fileName: fileKey.split('/').pop(),
          fileUrl: preSignedUrl, // Use the pre-signed URL
          size: item.Size,
          lastModified: item.LastModified,
        };
      })
    );

    // console.log('Formatted file list:', JSON.stringify(files, null, 2));
    res.status(200).json({ message: 'Files retrieved successfully', files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Failed to fetch files', error: error.message });
  }
});



module.exports = router;
