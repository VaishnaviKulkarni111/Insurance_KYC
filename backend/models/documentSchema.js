// models/Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentType: { type: String, required: true, enum: ['Photo', 'PAN Card', 'ID Proof', 'Address Proof'] },
  fileUrl: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "In Review", "Approved", "Rejected"] },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
