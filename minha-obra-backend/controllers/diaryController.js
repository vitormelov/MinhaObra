// controllers/diaryController.js
const Diary = require('../models/Diary');

// Criar novo diário
exports.createDiary = async (req, res) => {
  try {
    const newDiary = new Diary(req.body);
    const savedDiary = await newDiary.save();
    res.status(201).json(savedDiary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os diários
exports.getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find();
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um diário
exports.updateDiary = async (req, res) => {
  try {
    const updatedDiary = await Diary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDiary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um diário
exports.deleteDiary = async (req, res) => {
  try {
    await Diary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Diário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
