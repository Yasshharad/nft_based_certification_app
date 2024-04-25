// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const certificationRoutes = require('./routes/certificationRoutes');
const connectDB = require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/certifications', certificationRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
