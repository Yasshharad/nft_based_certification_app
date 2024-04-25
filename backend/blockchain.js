// backend/blockchain.js

const { Web3 } = require('web3');

// Initialize Web3 with the URL of your Ethereum client (e.g., Ganache)
const web3 = new Web3('http://127.0.0.1:7545'); // Adjust the URL as per your setup

module.exports = web3;
