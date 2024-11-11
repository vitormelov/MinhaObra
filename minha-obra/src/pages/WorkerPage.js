// src/pages/WorkerPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WorkerPage = () => {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/works');
        setWorks(response.data);
      } catch (error) {
        console.error('Erro ao buscar obras:', error);
      }
    };
    fetchWorks();
  }, []);

  const handleWorkClick = (workId) => {
    navigate(`/home/${workId}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Selecione a Obra</h2>
      <ul style={styles.list}>
        {works.map((work) => (
          <li key={work._id} style={styles.listItem}>
            <p style={styles.workName}>{work.name}</p>
            <p style={styles.workAddress}>{work.address}</p>
            <button
              onClick={() => handleWorkClick(work._id)}
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Selecionar Obra
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '1.5rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  workName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  workAddress: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '1rem',
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

export default WorkerPage;
