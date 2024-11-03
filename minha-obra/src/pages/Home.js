// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Bem-vindo ao MinhaObra</h2>
      <p>Escolha uma das opções abaixo para gerenciar sua obra:</p>
      
      <div style={styles.optionsContainer}>
        <button style={styles.button} onClick={() => navigate('/contracts-control')}>
          Controle de Contratos
        </button>
        <button style={styles.button} onClick={() => navigate('/schedule-control')}>
          Controle de Cronograma
        </button>
        <button style={styles.button} onClick={() => navigate('/diary-control')}>
          Diário de Obra
        </button>
        <button style={styles.button} onClick={() => navigate('/cost-control')}>
          Controle de Custo
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  optionsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Home;
