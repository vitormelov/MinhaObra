// src/pages/AdmPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdmPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Área do Administrador</h2>
        <p style={styles.subtitle}>Escolha uma das opções abaixo:</p>
        
        <div style={styles.buttonContainer}>
          <button 
            style={styles.button} 
            onClick={() => navigate('/working-site-inclusion')}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Inclusão de Obra
          </button>

          <button 
            style={styles.button} 
            onClick={() => navigate('/worker-inclusion')}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Inclusão de Funcionário
          </button>

          <button 
            style={styles.button} 
            onClick={() => navigate('/permissions')}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Permissões
          </button>

          <button 
            style={styles.button} 
            onClick={() => navigate('/work-list')}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Lista de Funcionários e Obras
          </button>
        </div>
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
    maxWidth: '500px',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '26px',
    color: '#333',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '1.5rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
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

export default AdmPage;
