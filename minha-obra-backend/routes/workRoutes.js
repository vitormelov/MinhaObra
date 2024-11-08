// src/routes/workRoutes.js
const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController'); // Certifique-se de que o caminho está correto

// Defina as rotas para obras
router.get('/', workController.getAllWorks);
router.delete('/:id', workController.deleteWork);

module.exports = router;
