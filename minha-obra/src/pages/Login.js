// src/pages/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar requisição de login ao backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Armazenar o token e autenticar o usuário
      localStorage.setItem('token', response.data.token);
      login(); // Autenticar o usuário no contexto
      navigate('/worker'); // Redireciona para a WorkerPage para seleção de obra
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique as credenciais e tente novamente.');
    }
  };

  return (
    <div>
      <h2>Login - MinhaObra</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>

      {/* Botão para a área do administrador */}
      <button onClick={() => navigate('/admin-login')}>Área do Administrador</button>
    </div>
  );
};

export default Login;
