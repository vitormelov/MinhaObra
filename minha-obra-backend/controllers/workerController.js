// src/controllers/workerController.js
const Worker = require('../models/Worker');
const bcrypt = require('bcrypt');

exports.createWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o email já está em uso
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar e salvar o novo funcionário
    const newWorker = new Worker({ name, email, password: hashedPassword });
    await newWorker.save();

    res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar funcionário', error });
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find({}, '-password'); // Oculta a senha
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar funcionários', error });
  }
};

exports.deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    await Worker.findByIdAndDelete(id);
    res.status(200).json({ message: 'Funcionário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar funcionário', error });
  }
};

exports.updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedWorker = await Worker.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar funcionário', error });
  }
};