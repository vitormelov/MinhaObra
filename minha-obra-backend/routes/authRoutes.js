// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.loginWorker);

module.exports = router;
