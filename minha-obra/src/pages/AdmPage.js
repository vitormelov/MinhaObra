// src/pages/AdmPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdmPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Área do Administrador</h2>
      <p>Escolha uma das opções abaixo:</p>
      
      <button onClick={() => navigate('/working-site-inclusion')}>
        Inclusão de Obra
      </button>
      
      <button onClick={() => navigate('/worker-inclusion')}>
        Inclusão de Funcionário
      </button>
      
      <button onClick={() => navigate('/permissions')}>
        Permissões
      </button>
    </div>
  );
};

export default AdmPage;
