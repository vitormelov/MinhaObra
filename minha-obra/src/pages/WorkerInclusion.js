// src/pages/WorkerInclusion.js
import React, { useState } from 'react';
import axios from 'axios';

const WorkerInclusion = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de senha
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Dados para enviar ao backend
    const newWorker = {
      name,
      email,
      password,
    };

    try {
      // Enviar dados ao backend
      const response = await axios.post('http://localhost:5000/api/workers', newWorker);
      alert('Funcionário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      alert('Erro ao cadastrar funcionário. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Inclusão de Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </div>
  );
};

export default WorkerInclusion;
