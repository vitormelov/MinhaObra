// src/routes/workerRoutes.js
const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

// Rota para criar novo funcionário
router.post('/', workerController.createWorker);
router.get('/', workerController.getAllWorkers);
router.delete('/:id', workerController.deleteWorker);

module.exports = router;
