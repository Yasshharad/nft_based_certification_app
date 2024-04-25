// backend/models/Certification.js

const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  recipientAddress: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  metadata: {
    type: Object,
    required: true
  },
  transactionHash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certification', certificationSchema);
