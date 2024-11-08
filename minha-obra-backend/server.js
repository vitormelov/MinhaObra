// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importação das rotas
const diaryRoutes = require('./routes/diaryRoutes');
const workerRoutes = require('./routes/workerRoutes'); // Rota para cadastro de funcionários
const authRoutes = require('./routes/authRoutes'); // Rota para autenticação
const workRoutes = require('./routes/workRoutes'); // Rota para cadastro de obras

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
app.use('/api/diaries', diaryRoutes);
app.use('/api/workers', workerRoutes); // Rota para funcionários
app.use('/api/auth', authRoutes); // Rota para autenticação
app.use('/api/works', workRoutes); // Rota para obras

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
