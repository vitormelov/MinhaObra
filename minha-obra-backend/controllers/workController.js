// src/controllers/workController.js
const Work = require('../models/Work');

// Função para criar uma nova obra
exports.createWork = async (req, res) => {
  try {
    const { name, address, type, startDate, duration, endDate } = req.body;

    const newWork = new Work({
      name,
      address,
      type,
      startDate,
      duration,
      endDate,
    });

    await newWork.save();
    res.status(201).json({ message: 'Obra cadastrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar obra', error });
  }
};

exports.updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedWork = await Work.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar obra', error });
  }
};

// Função para listar todas as obras
exports.getAllWorks = async (req, res) => {
  try {
    const works = await Work.find(); // Busca todas as obras
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obras', error });
  }
};

// Função para deletar uma obra pelo ID
exports.deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    await Work.findByIdAndDelete(id);
    res.status(200).json({ message: 'Obra deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar obra', error });
  }
};

exports.getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Work.findById(id);
    if (!work) {
      return res.status(404).json({ message: 'Obra não encontrada' });
    }
    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obra', error });
  }
};