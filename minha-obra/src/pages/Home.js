// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { workId } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/works/${workId}`);
        setWork(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da obra:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkDetails();
  }, [workId]);

  if (loading) return <p style={styles.loading}>Carregando detalhes da obra...</p>;
  if (!work) return <p style={styles.error}>Obra não encontrada.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{work.name}</h2>
        <p style={styles.detail}><strong>Endereço:</strong> {work.address}</p>
        <p style={styles.detail}><strong>Tipo da Obra:</strong> {work.type}</p>
        <p style={styles.detail}><strong>Data de Início:</strong> {new Date(work.startDate).toLocaleDateString()}</p>
        <p style={styles.detail}><strong>Duração:</strong> {work.duration} dias</p>
        <p style={styles.detail}><strong>Data de Término:</strong> {new Date(work.endDate).toLocaleDateString()}</p>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate(`/contracts-control/${workId}`)}>
          Controle de Contratos
        </button>
        <button style={styles.button} onClick={() => navigate(`/schedule-control/${workId}`)}>
          Controle de Cronograma
        </button>
        <button style={styles.button} onClick={() => navigate(`/diary-control/${workId}`)}>
          Diário de Obra
        </button>
        <button style={styles.button} onClick={() => navigate(`/cost-control/${workId}`)}>
          Controle de Custo
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    textAlign: 'center',
  },
  loading: {
    fontSize: '18px',
    color: '#666',
  },
  error: {
    fontSize: '18px',
    color: '#dc3545',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    maxWidth: '600px',
    margin: 'auto',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  detail: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '0.5rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '400px',
    margin: 'auto',
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
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Home;
