// src/routes/workRoutes.js
const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

// Rota para criar uma nova obra
router.post('/', workController.createWork);
router.put('/:id', workController.updateWork);
router.delete('/:id', workController.deleteWork);
router.get('/', workController.getAllWorks);

// Aqui você pode adicionar outras rotas, como listar, atualizar e deletar obras

module.exports = router;
