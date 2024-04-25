// backend/routes/certificationRoutes.js

const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');

// Routes
router.get('/', certificationController.getAllCertifications);
router.post('/issue', certificationController.issueCertification);
router.get('/:id', certificationController.getCertificationById);
router.put('/:id', certificationController.updateCertification);
router.delete('/:id', certificationController.deleteCertification);

module.exports = router;
