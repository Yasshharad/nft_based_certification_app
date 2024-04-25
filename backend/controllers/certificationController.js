// backend/controllers/certificationController.js
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

const Certification = require('../models/Certification');
const certificationContractABI = require('../../build/contracts/Certification.json').abi; // Import the contract ABI
const certificationContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your contract address

// Create a contract instance
const certificationContract = new web3.eth.Contract(certificationContractABI, certificationContractAddress);

// Get all certifications
const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Issue a new certification
const issueCertification = async (req, res) => {
  const { title, issuer, metadata, recipient } = req.body;
  const recipientAddress = '0xb2330BF9A376e12c8da8622bc013e144add49D65'; // Default recipient address

  try {
    // Call the smart contract function to issue certification
    const transactionReceipt = await certificationContract.methods.issueCertification(recipientAddress, title, issuer, metadata)
      .send({ from: '0x0733e64d57f7B60DE4e22A6b470e4B13f3a4a510', gas: 2000000 }); // Replace senderAddress with the sender's address

    // Save certification to MongoDB
    const certification = new Certification({
      title,
      recipient,
      recipientAddress,
      issuer,
      metadata,
      transactionHash: transactionReceipt.transactionHash
    });
    await certification.save();

    res.status(201).json({ transactionHash: transactionReceipt.transactionHash });
  } catch (error) {
    console.error('Error issuing certification:', error);
    res.status(400).json({ message: 'Error issuing certification' });
  }
};

// Get certification by ID
const getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(certification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update certification by ID
const updateCertification = async (req, res) => {
  try {
    // Implementation of update logic
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete certification by ID
const deleteCertification = async (req, res) => {
  try {
    // Implementation of delete logic
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCertifications,
  issueCertification,
  getCertificationById,
  updateCertification,
  deleteCertification
};
