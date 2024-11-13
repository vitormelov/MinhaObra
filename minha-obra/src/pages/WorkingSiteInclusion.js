// src/pages/WorkingSiteInclusion.js
import React, { useState } from 'react';
import axios from 'axios';

const WorkingSiteInclusion = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [endDate, setEndDate] = useState('');

  // Função para calcular a data de término com base na data de início e duração
  const calculateEndDate = (start, durationInDays) => {
    const startDateObj = new Date(start);
    startDateObj.setDate(startDateObj.getDate() + parseInt(durationInDays, 10));
    return startDateObj.toISOString().split('T')[0];
  };

  // Atualizar a data de término automaticamente ao alterar a duração
  const handleDurationChange = (e) => {
    const durationValue = e.target.value;
    setDuration(durationValue);

    if (startDate && durationValue) {
      const calculatedEndDate = calculateEndDate(startDate, durationValue);
      setEndDate(calculatedEndDate);
    } else {
      setEndDate('');
    }
  };

  // Enviar os dados da obra ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWork = { name, address, type, startDate, duration, endDate };

    try {
      await axios.post('http://192.168.15.95:5000/api/works', newWork);
      alert('Obra cadastrada com sucesso!');
      setName('');
      setAddress('');
      setType('');
      setStartDate('');
      setDuration('');
      setEndDate('');
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error);
      alert('Erro ao cadastrar obra. Tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Inclusão de Obra</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome da Obra:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Endereço da Obra:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Tipo da Obra:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Data de Início da Obra:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (duration) {
                  setEndDate(calculateEndDate(e.target.value, duration));
                }
              }}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Duração da Obra (em dias):</label>
            <input
              type="number"
              value={duration}
              onChange={handleDurationChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Data de Término da Obra:</label>
            <input
              type="date"
              value={endDate}
              readOnly
              style={{ ...styles.input, backgroundColor: '#f0f2f5', cursor: 'not-allowed' }}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Cadastrar Obra
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
    maxWidth: '500px',
    padding: '2rem',
    borderRadius: '10px',
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  title: {
    fontSize: '26px',
    color: '#113f4b',
    marginBottom: '1.5rem',
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

export default WorkingSiteInclusion;
