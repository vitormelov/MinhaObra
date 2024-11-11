// controllers/diaryController.js
const Diary = require('../models/Diary');

// Função para obter diários específicos de uma obra
exports.getDiariesByWorkId = async (req, res) => {
  try {
    const { workId } = req.params;
    const diaries = await Diary.find({ workId });
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar diários da obra', error });
  }
};

// Função para criar um novo diário para uma obra específica
exports.createDiary = async (req, res) => {
  try {
    const { workId } = req.params;
    const diaryData = { ...req.body, workId };
    const newDiary = new Diary(diaryData);
    await newDiary.save();
    res.status(201).json(newDiary);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar diário', error });
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
