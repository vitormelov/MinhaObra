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
    return startDateObj.toISOString().split('T')[0]; // Formata para yyyy-mm-dd
  };

  // Atualizar a data de término automaticamente ao alterar a duração
  const handleDurationChange = (e) => {
    const durationValue = e.target.value;
    setDuration(durationValue);

    if (startDate && durationValue) {
      const calculatedEndDate = calculateEndDate(startDate, durationValue);
      setEndDate(calculatedEndDate);
    } else {
      setEndDate(''); // Limpa a data de término se não houver dados válidos
    }
  };

  // Enviar os dados da obra ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWork = {
      name,
      address,
      type,
      startDate,
      duration,
      endDate,
    };

    try {
      await axios.post('http://localhost:5000/api/works', newWork);
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
    <div>
      <h2>Inclusão de Obra</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Obra:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Endereço da Obra:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tipo da Obra:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Data de Início da Obra:</label>
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
          />
        </div>

        <div>
          <label>Duração da Obra (em dias):</label>
          <input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            required
          />
        </div>

        <div>
          <label>Data de Término da Obra:</label>
          <input
            type="date"
            value={endDate}
            readOnly
          />
        </div>

        <button type="submit">Cadastrar Obra</button>
      </form>
    </div>
  );
};

export default WorkingSiteInclusion;
