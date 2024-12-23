// src/pages/DiaryControl.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { generateDiaryPDF } from '../utils/pdfStyles'; // Importa a função para gerar PDF

const API_URL = 'http://192.168.15.95:5000/api';

const DiaryControl = () => {
  const { workId } = useParams(); // Captura o ID da obra pela URL
  const [work, setWork] = useState(null); // Estado para armazenar os dados da obra
  const [diaries, setDiaries] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    employees: [],
    morningWeather: '',
    afternoonWeather: '',
    activities: [],
    materials: [],
    occurrences: []
  });

  const [employee, setEmployee] = useState({ quantity: '', role: '', company: '' });
  const [activity, setActivity] = useState('');
  const [material, setMaterial] = useState('');
  const [occurrence, setOccurrence] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);

  // Carregar dados da obra e diários ao carregar o componente
  useEffect(() => {
    const fetchWorkAndDiaries = async () => {
      try {
        // Buscar dados da obra
        const workResponse = await axios.get(`${API_URL}/works/${workId}`);
        setWork(workResponse.data);

        // Buscar diários relacionados à obra
        const diariesResponse = await axios.get(`${API_URL}/diaries/${workId}`);
        setDiaries(diariesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchWorkAndDiaries();
  }, [workId]);

  // Função para manipular entradas do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funções para adicionar dados temporários ao formulário de diários
  const addEmployee = () => {
    setFormData({
      ...formData,
      employees: [...formData.employees, employee]
    });
    setEmployee({ quantity: '', role: '', company: '' });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, activity]
    });
    setActivity('');
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, material]
    });
    setMaterial('');
  };

  const addOccurrence = () => {
    setFormData({
      ...formData,
      occurrences: [...formData.occurrences, occurrence]
    });
    setOccurrence('');
  };

  // Função para salvar o diário no backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário enviados:", formData);
    try {
      const response = await axios.post(`${API_URL}/diaries/${workId}`, formData);
      setDiaries([...diaries, response.data]);
      setFormData({
        date: '',
        startTime: '',
        endTime: '',
        employees: [],
        morningWeather: '',
        afternoonWeather: '',
        activities: [],
        materials: [],
        occurrences: []
      });
    } catch (error) {
      console.error('Erro ao salvar o diário:', error);
    }
  };

  // Função para visualizar o diário em um modal
  const handleView = (diary) => {
    setSelectedDiary(diary);
    console.log("Selected Diary:", diary); // Log para inspecionar o diário selecionado
    setIsModalOpen(true);
  };

  // Função para deletar o diário no backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/diaries/${id}`);
      setDiaries(diaries.filter((diary) => diary._id !== id));
    } catch (error) {
      console.error('Erro ao deletar o diário:', error);
    }
  };

  // Função para exportar o diário selecionado para PDF com cabeçalho da obra
  const handleExportPDF = () => {
    if (work && selectedDiary) {
      generateDiaryPDF(selectedDiary, work); // Passa os dados do diário e da obra para o PDF
    } else {
      console.error("Dados da obra ou diário não disponíveis para exportação");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>Inclusão de Diário</h2>

      {/* Formulário para adicionar novo diário */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Data:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Horário de Início:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Horário de Término:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Clima da manhã */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Clima da Manhã</label>
          <select
            name="morningWeather"
            value={formData.morningWeather}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Selecione</option>
            <option value="limpo">Limpo</option>
            <option value="nublado">Nublado</option>
            <option value="chuvoso">Chuvoso</option>
            <option value="impraticável">Impraticável</option>
          </select>
        </div>

        {/* Clima da tarde */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Clima da Tarde</label>
          <select
            name="afternoonWeather"
            value={formData.afternoonWeather}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Selecione</option>
            <option value="limpo">Limpo</option>
            <option value="nublado">Nublado</option>
            <option value="chuvoso">Chuvoso</option>
            <option value="impraticável">Impraticável</option>
          </select>
        </div>

        {/* Funcionários */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Funcionários</label>
          <input
            type="number"
            placeholder="Quantidade"
            value={employee.quantity}
            onChange={(e) => setEmployee({ ...employee, quantity: e.target.value })}
            style={styles.input2}
          />
          <input
            type="text"
            placeholder="Função"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
            style={styles.input2}
          />
          <input
            type="text"
            placeholder="Empresa"
            value={employee.company}
            onChange={(e) => setEmployee({ ...employee, company: e.target.value })}
            style={styles.input2}
          />
          <button type="button" onClick={addEmployee} style={styles.button}>
            Adicionar Funcionário
          </button>
          <ul>
            {formData.employees.map((emp, index) => (
              <li key={index}>{`${emp.quantity} ${emp.role} - ${emp.company}`}</li>
            ))}
          </ul>
        </div>

        {/* Atividades Executadas */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Atividades Executadas</label>
          <input
            type="text"
            placeholder="Descrição da atividade"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={styles.input2}
          />
          <button type="button" onClick={addActivity} style={styles.button}>
            Adicionar Atividade
          </button>
          <ul>
            {formData.activities.map((act, index) => (
              <li key={index}>{act}</li>
            ))}
          </ul>
        </div>

        {/* Materiais */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Material Entregue</label>
          <input
            type="text"
            placeholder="Descrição do material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            style={styles.input2}
          />
          <button type="button" onClick={addMaterial} style={styles.button}>
            Adicionar Material
          </button>
          <ul>
            {formData.materials.map((mat, index) => (
              <li key={index}>{mat}</li>
            ))}
          </ul>
        </div>

        {/* Ocorrências */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ocorrências</label>
          <input
            type="text"
            placeholder="Descrição da ocorrência"
            value={occurrence}
            onChange={(e) => setOccurrence(e.target.value)}
            style={styles.input2}
          />
          <button type="button" onClick={addOccurrence} style={styles.button}>
            Adicionar Ocorrência
          </button>
          <ul>
            {formData.occurrences.map((occ, index) => (
              <li key={index}>{occ}</li>
            ))}
          </ul>
        </div>

        <button type="submit" style={styles.saveButton}>Salvar Diário</button>
      </form>

      <h2 style={styles.title}>Lista de diários</h2>

      {/* Lista de diários */}
      <div style={styles.diaryList}>
        {diaries.length > 0 ? (
          diaries.map((diary) => (
            <div key={diary._id} style={styles.diaryItem}>
              <p style={styles.diaryText}><strong>Data:</strong> {new Date(diary.date).toLocaleDateString()}</p>
              <div style={styles.buttonGroup}>
                <button onClick={() => handleView(diary)} style={styles.button}>Visualizar</button>
                <button onClick={() => handleDelete(diary._id)} style={styles.deleteButton}>Deletar</button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noDiariesText}>Nenhum diário registrado ainda.</p>
        )}
      </div>

      {/* Modal para visualização do diário */}
      {isModalOpen && selectedDiary && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Diário de {new Date(selectedDiary.date).toLocaleDateString()}</h3>
            
            {/* Exibindo horários diretamente */}
            <p><strong>Horário de Início:</strong> {selectedDiary.startTime}</p>
            <p><strong>Horário de Término:</strong> {selectedDiary.endTime}</p>

            {/* Funcionários */}
            <p><strong>Funcionários:</strong></p>
            {selectedDiary.employees.map((emp, i) => (
              <p key={i}>{emp.quantity} {emp.role} - {emp.company}</p>
            ))}

            {/* Clima */}
            <p><strong>Clima da Manhã:</strong> {selectedDiary.morningWeather}</p>
            <p><strong>Clima da Tarde:</strong> {selectedDiary.afternoonWeather}</p>

            {/* Atividades Executadas */}
            <p><strong>Atividades Executadas:</strong></p>
            {selectedDiary.activities.map((act, i) => (
              <p key={i}>{act}</p>
            ))}

            {/* Material Entregue */}
            <p><strong>Material Entregue:</strong></p>
            {selectedDiary.materials.map((mat, i) => (
              <p key={i}>{mat}</p>
            ))}

            {/* Ocorrências */}
            <p><strong>Ocorrências:</strong></p>
            {selectedDiary.occurrences.map((occ, i) => (
              <p key={i}>{occ}</p>
            ))}

            <div style={styles.modalButtons}>
              <button onClick={handleExportPDF} style={styles.exportButton}>Exportar para PDF</button>
              <button onClick={() => setIsModalOpen(false)} style={styles.button}>Fechar</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'left',
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  diaryList: {
    margin: '0 auto',
    marginTop: '2rem',
    maxWidth: '664px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '60vh', // Limita a altura da lista para barra de rolagem
    overflowY: 'auto',  // Adiciona barra de rolagem vertical
  },
  diaryItem: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diaryText: {
    fontSize: '16px',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  noDiariesText: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
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
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh', // Limita a altura máxima do modal
    overflowY: 'auto',  // Adiciona a barra de rolagem vertical
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  modalButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  input2: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
    marginBottom: '20px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  exportButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default DiaryControl;
