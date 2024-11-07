// src/pages/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifique as credenciais de funcionário
    if (email === 'funcionario@gmail.com' && password === 'senha') {
      login(); // Login de funcionário
      navigate('/home');
    } else {
      alert('Credenciais inválidas. Tente novamente.');
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
