// src/controllers/authController.js
const Worker = require('../models/Worker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o email existe
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, worker.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: worker._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};
