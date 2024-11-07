// src/pages/AdmLogin.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdmLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const { loginAsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Verificar as credenciais
    if (adminEmail === 'admin' && adminPassword === 'admin') {
      // Autenticar como administrador e redirecionar para a página do administrador
      loginAsAdmin();
      navigate('/admin-page');
    } else {
      alert('Credenciais de administrador inválidas.');
    }
  };

  return (
    <div>
      <h2>Login do Administrador</h2>
      <form onSubmit={handleAdminLogin}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default AdmLogin;
