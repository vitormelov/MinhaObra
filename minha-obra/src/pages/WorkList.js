// src/pages/WorkList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkList = () => {
  const [workers, setWorkers] = useState([]);
  const [works, setWorks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isWorker, setIsWorker] = useState(true);

  useEffect(() => {
    fetchWorkers();
    fetchWorks();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const fetchWorks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/works');
      setWorks(response.data);
    } catch (error) {
      console.error('Erro ao buscar obras:', error);
    }
  };

  const deleteWorker = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workers/${id}`);
      setWorkers(workers.filter((worker) => worker._id !== id));
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
    }
  };

  const deleteWork = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/works/${id}`);
      setWorks(works.filter((work) => work._id !== id));
    } catch (error) {
      console.error('Erro ao deletar obra:', error);
    }
  };

  const openEditModal = (item, isWorker) => {
    setEditData(item);
    setIsWorker(isWorker);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isWorker
        ? `http://localhost:5000/api/workers/${editData._id}`
        : `http://localhost:5000/api/works/${editData._id}`;
      await axios.put(url, editData);
      isWorker ? fetchWorkers() : fetchWorks();
      closeEditModal();
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Funcionários</h2>
      <ul style={styles.list}>
        {workers.map((worker) => (
          <li key={worker._id} style={styles.listItem}>
            <p><strong>Nome:</strong> {worker.name}</p>
            <p><strong>Email:</strong> {worker.email}</p>
            <button style={styles.button} onClick={() => openEditModal(worker, true)}>Editar</button>
            <button style={styles.deleteButton} onClick={() => deleteWorker(worker._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      <h2 style={styles.title}>Lista de Obras</h2>
      <ul style={styles.list}>
        {works.map((work) => (
          <li key={work._id} style={styles.listItem}>
            <p><strong>Nome da Obra:</strong> {work.name}</p>
            <p><strong>Endereço:</strong> {work.address}</p>
            <p><strong>Tipo da Obra:</strong> {work.type}</p>
            <p><strong>Data de Início:</strong> {new Date(work.startDate).toLocaleDateString()}</p>
            <p><strong>Duração (em dias):</strong> {work.duration}</p>
            <p><strong>Data de Término:</strong> {new Date(work.endDate).toLocaleDateString()}</p>
            <button style={styles.button} onClick={() => openEditModal(work, false)}>Editar</button>
            <button style={styles.deleteButton} onClick={() => deleteWork(work._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      {isEditModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Editar {isWorker ? 'Funcionário' : 'Obra'}</h3>
            <form onSubmit={handleEditSubmit} style={styles.form}>
              {isWorker ? (
                <>
                  <label style={styles.label}>Nome:</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    style={styles.input}
                  />
                  <label style={styles.label}>Email:</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    style={styles.input}
                  />
                </>
              ) : (
                <>
                  <label style={styles.label}>Nome da Obra:</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    style={styles.input}
                  />
                  <label style={styles.label}>Endereço:</label>
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    style={styles.input}
                  />
                  <label style={styles.label}>Tipo da Obra:</label>
                  <input
                    type="text"
                    value={editData.type}
                    onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                    style={styles.input}
                  />
                  <label style={styles.label}>Data de Início:</label>
                  <input
                    type="date"
                    value={editData.startDate.split('T')[0]}
                    onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                    style={styles.input}
                  />
                  <label style={styles.label}>Duração (em dias):</label>
                  <input
                    type="number"
                    value={editData.duration}
                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                    style={styles.input}
                  />
                  <label style={styles.label}>Data de Término:</label>
                  <input
                    type="date"
                    value={editData.endDate.split('T')[0]}
                    onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                    style={styles.input}
                  />
                </>
              )}
              <button type="submit" style={styles.button}>Salvar Alterações</button>
              <button type="button" onClick={closeEditModal} style={styles.cancelButton}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '0.5rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
  },
  modalTitle: {
    fontSize: '20px',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  cancelButton: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default WorkList;
