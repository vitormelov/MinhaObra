// src/pages/WorkList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkList = () => {
  const [workers, setWorkers] = useState([]);
  const [works, setWorks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null); // Armazena dados para edição
  const [isWorker, setIsWorker] = useState(true); // Define se é um funcionário ou obra sendo editado

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

  // Abrir modal de edição com dados do funcionário ou obra selecionada
  const openEditModal = (item, isWorker) => {
    setEditData(item);
    setIsWorker(isWorker);
    setIsEditModalOpen(true);
  };

  // Fechar o modal de edição
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  // Função para atualizar os dados de funcionário ou obra no backend
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isWorker
        ? `http://localhost:5000/api/workers/${editData._id}`
        : `http://localhost:5000/api/works/${editData._id}`;
      await axios.put(url, editData);

      // Atualizar a lista com os novos dados
      isWorker ? fetchWorkers() : fetchWorks();
      closeEditModal();
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Funcionários</h2>
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            <strong>Nome:</strong> {worker.name} - <strong>Email:</strong> {worker.email}
            <button onClick={() => openEditModal(worker, true)}>Editar</button>
            <button onClick={() => deleteWorker(worker._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      <h2>Lista de Obras</h2>
      <ul>
        {works.map((work) => (
          <li key={work._id}>
            <p><strong>Nome da Obra:</strong> {work.name}</p>
            <p><strong>Endereço:</strong> {work.address}</p>
            <p><strong>Tipo da Obra:</strong> {work.type}</p>
            <p><strong>Data de Início:</strong> {new Date(work.startDate).toLocaleDateString()}</p>
            <p><strong>Duração (em dias):</strong> {work.duration}</p>
            <p><strong>Data de Término:</strong> {new Date(work.endDate).toLocaleDateString()}</p>
            <button onClick={() => openEditModal(work, false)}>Editar</button>
            <button onClick={() => deleteWork(work._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar {isWorker ? 'Funcionário' : 'Obra'}</h3>
            <form onSubmit={handleEditSubmit}>
              {isWorker ? (
                <>
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <label>Nome da Obra:</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <label>Endereço:</label>
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                  />
                  <label>Tipo da Obra:</label>
                  <input
                    type="text"
                    value={editData.type}
                    onChange={(e) =>
                      setEditData({ ...editData, type: e.target.value })
                    }
                  />
                  <label>Data de Início:</label>
                  <input
                    type="date"
                    value={editData.startDate.split('T')[0]} // Remove timestamp
                    onChange={(e) =>
                      setEditData({ ...editData, startDate: e.target.value })
                    }
                  />
                  <label>Duração (em dias):</label>
                  <input
                    type="number"
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData({ ...editData, duration: e.target.value })
                    }
                  />
                  <label>Data de Término:</label>
                  <input
                    type="date"
                    value={editData.endDate.split('T')[0]} // Remove timestamp
                    onChange={(e) =>
                      setEditData({ ...editData, endDate: e.target.value })
                    }
                  />
                </>
              )}
              <button type="submit">Salvar Alterações</button>
              <button type="button" onClick={closeEditModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkList;
