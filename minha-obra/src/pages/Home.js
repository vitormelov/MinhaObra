// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { workId } = useParams(); // Captura o ID da obra pela URL
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Buscar dados da obra ao carregar a página
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

  if (loading) return <p>Carregando detalhes da obra...</p>;
  if (!work) return <p>Obra não encontrada.</p>;

  return (
    <div>
      <h2>Home da Obra: {work.name}</h2>
      <p><strong>Endereço:</strong> {work.address}</p>
      <p><strong>Tipo da Obra:</strong> {work.type}</p>
      <p><strong>Data de Início:</strong> {new Date(work.startDate).toLocaleDateString()}</p>
      <p><strong>Duração:</strong> {work.duration} dias</p>
      <p><strong>Data de Término:</strong> {new Date(work.endDate).toLocaleDateString()}</p>

      {/* Botões de navegação para funcionalidades */}
      <button onClick={() => navigate(`/contracts-control/${workId}`)}>
        Controle de Contratos
      </button>
      <button onClick={() => navigate(`/schedule-control/${workId}`)}>
        Controle de Cronograma
      </button>
      <button onClick={() => navigate(`/diary-control/${workId}`)}>
        Diário de Obra
      </button>
      <button onClick={() => navigate(`/cost-control/${workId}`)}>
        Controle de Custo
      </button>
    </div>
  );
};

export default Home;
