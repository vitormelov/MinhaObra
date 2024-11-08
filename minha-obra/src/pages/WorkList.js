// src/pages/WorkList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkList = () => {
  const [workers, setWorkers] = useState([]);
  const [works, setWorks] = useState([]);

  // Buscar funcionários e obras ao carregar a página
  useEffect(() => {
    fetchWorkers();
    fetchWorks();
  }, []);

  // Função para buscar funcionários
  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  // Função para buscar obras
  const fetchWorks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/works');
      setWorks(response.data);
    } catch (error) {
      console.error('Erro ao buscar obras:', error);
    }
  };

  // Função para deletar funcionário
  const deleteWorker = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workers/${id}`);
      setWorkers(workers.filter((worker) => worker._id !== id));
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
    }
  };

  // Função para deletar obra
  const deleteWork = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/works/${id}`);
      setWorks(works.filter((work) => work._id !== id));
    } catch (error) {
      console.error('Erro ao deletar obra:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Funcionários</h2>
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            {worker.name} - {worker.email}
            <button onClick={() => deleteWorker(worker._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      <h2>Lista de Obras</h2>
      <ul>
        {works.map((work) => (
          <li key={work._id}>
            {work.name} - {work.description}
            <button onClick={() => deleteWork(work._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkList;
