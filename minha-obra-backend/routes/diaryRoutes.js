// routes/diaryRoutes.js
const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

// Rotas do diário
router.post('/', diaryController.createDiary);
router.get('/', diaryController.getDiaries);
router.put('/:id', diaryController.updateDiary);
router.delete('/:id', diaryController.deleteDiary);
router.get('/:workId', diaryController.getDiariesByWorkId);
router.post('/:workId', diaryController.createDiary);

module.exports = router;
