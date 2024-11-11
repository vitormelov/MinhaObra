// src/pages/WorkerPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WorkerPage = () => {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  // Buscar todas as obras ao carregar a página
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

  // Função para navegar para a Home da obra selecionada
  const handleWorkClick = (workId) => {
    navigate(`/home/${workId}`);
  };

  return (
    <div>
      <h2>Selecione a Obra</h2>
      <ul>
        {works.map((work) => (
          <li key={work._id}>
            <button onClick={() => handleWorkClick(work._id)}>
              {work.name} - {work.address}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerPage;
