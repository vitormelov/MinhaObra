// src/pages/AdmLogin.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png'; // Certifique-se de ajustar o caminho para a logo

const AdmLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const { loginAsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Verificar as credenciais
    if (adminEmail === 'admin' && adminPassword === 'admin') {
      loginAsAdmin(); // Autenticar como administrador
      navigate('/admin-page');
    } else {
      alert('Credenciais de administrador inválidas.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="MinhaObra Logo" style={styles.logo} />
        <h2 style={styles.title}>Área do Administrador</h2>
        <form onSubmit={handleAdminLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha:</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '10px',
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  logo: {
    width: '200px',
  },
  title: {
    fontSize: '24px',
    color: '#113f4b',
    margin: '0px',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  inputGroup: {
    marginBottom: '1rem',
    width: '100%',
    textAlign: 'left',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '0.5rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default AdmLogin;
