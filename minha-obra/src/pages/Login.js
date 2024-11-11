// src/pages/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png'; // Ajuste o caminho conforme necessário

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      login();
      navigate('/worker');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique as credenciais e tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="MinhaObra Logo" style={styles.logo} />
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <button
          onClick={() => navigate('/admin-login')}
          style={styles.adminButton}
          onMouseOver={(e) => (e.target.style.color = styles.adminButtonHover.color)}
          onMouseOut={(e) => (e.target.style.color = '#007bff')}
        >
          Área do Administrador
        </button>
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
    boxSizing: 'border-box', // Garante que o padding não aumente o tamanho total do elemento
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  logo: {
    width: '200px', // Ajuste o tamanho conforme necessário
    marginBottom: '1rem',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', // Limita o formulário ao tamanho do card
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
    width: '100%', // Ajusta o tamanho dos inputs ao tamanho do contêiner
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box', // Garante que padding não aumente o tamanho total
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  button: {
    width: '100%', // Ajusta o tamanho do botão ao tamanho do formulário
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
  adminButton: {
    marginTop: '1rem',
    backgroundColor: 'transparent',
    color: '#007bff',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'underline',
    transition: 'color 0.3s',
  },
  adminButtonHover: {
    color: '#0056b3',
  },
};

export default Login;