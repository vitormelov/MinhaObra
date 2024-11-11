// src/pages/DiaryControl.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

const API_URL = 'http://localhost:5000/api/diaries';

const DiaryControl = () => {
  const { workId } = useParams(); // Captura o ID da obra pela URL
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

  // Carregar diários específicos da obra ao carregar o componente
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(`${API_URL}/${workId}`);
        setDiaries(response.data);
      } catch (error) {
        console.error('Erro ao buscar diários:', error);
      }
    };
    fetchDiaries();
  }, [workId]);

  // Manipulador para as entradas do formulário principal
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
    try {
      const response = await axios.post(`${API_URL}/${workId}`, formData);
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
    setIsModalOpen(true);
  };

  // Função para deletar o diário no backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setDiaries(diaries.filter((diary) => diary._id !== id));
    } catch (error) {
      console.error('Erro ao deletar o diário:', error);
    }
  };

  // Função para exportar o diário selecionado para PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Diário de Obra - ${selectedDiary.date}`, 10, 10);
    doc.text(`Horário de Início: ${selectedDiary.startTime}`, 10, 20);
    doc.text(`Horário de Término: ${selectedDiary.endTime}`, 10, 30);
    doc.text('Funcionários:', 10, 40);
    selectedDiary.employees.forEach((emp, i) => {
      doc.text(`${i + 1}. ${emp.quantity} ${emp.role} - ${emp.company}`, 10, 50 + i * 10);
    });
    doc.text(`Clima da Manhã: ${selectedDiary.morningWeather}`, 10, 70);
    doc.text(`Clima da Tarde: ${selectedDiary.afternoonWeather}`, 10, 80);
    doc.text('Atividades Executadas:', 10, 90);
    selectedDiary.activities.forEach((act, i) => {
      doc.text(`${i + 1}. ${act}`, 10, 100 + i * 10);
    });
    doc.text('Material Entregue:', 10, 110);
    selectedDiary.materials.forEach((mat, i) => {
      doc.text(`${i + 1}. ${mat}`, 10, 120 + i * 10);
    });
    doc.text('Ocorrências:', 10, 130);
    selectedDiary.occurrences.forEach((occ, i) => {
      doc.text(`${i + 1}. ${occ}`, 10, 140 + i * 10);
    });
    doc.save(`Diário_${selectedDiary.date}.pdf`);
  };

  return (
    <div>
      <h2>Diário de Obra</h2>

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

        {/* Horário de início e término da obra */}
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

        {/* Seção para adicionar funcionários */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Funcionários</label>
          <input
            type="number"
            placeholder="Quantidade"
            value={employee.quantity}
            onChange={(e) => setEmployee({ ...employee, quantity: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Função"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Empresa"
            value={employee.company}
            onChange={(e) => setEmployee({ ...employee, company: e.target.value })}
            style={styles.input}
          />
          <button type="button" onClick={addEmployee} style={styles.button}>
            Adicionar Funcionário
          </button>
        </div>

        {/* Seção para Clima */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Clima da Manhã</label>
          <select name="morningWeather" value={formData.morningWeather} onChange={handleChange} required style={styles.input}>
            <option value="">Selecione</option>
            <option value="limpo">Limpo</option>
            <option value="nublado">Nublado</option>
            <option value="chuvoso">Chuvoso</option>
            <option value="impraticável">Impraticável</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Clima da Tarde</label>
          <select name="afternoonWeather" value={formData.afternoonWeather} onChange={handleChange} required style={styles.input}>
            <option value="">Selecione</option>
            <option value="limpo">Limpo</option>
            <option value="nublado">Nublado</option>
            <option value="chuvoso">Chuvoso</option>
            <option value="impraticável">Impraticável</option>
          </select>
        </div>

        {/* Seção para Atividades Executadas */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Atividades Executadas</label>
          <input
            type="text"
            placeholder="Descrição da atividade"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={addActivity} style={styles.button}>
            Adicionar Atividade
          </button>
        </div>

        {/* Seção para Material Entregue */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Material Entregue</label>
          <input
            type="text"
            placeholder="Descrição do material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={addMaterial} style={styles.button}>
            Adicionar Material
          </button>
        </div>

        {/* Seção para Ocorrências */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ocorrências</label>
          <input
            type="text"
            placeholder="Descrição da ocorrência"
            value={occurrence}
            onChange={(e) => setOccurrence(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={addOccurrence} style={styles.button}>
            Adicionar Ocorrência
          </button>
        </div>

        <button type="submit" style={styles.button}>Salvar Diário</button>
      </form>

      {/* Lista de diários */}
      <div style={styles.diaryList}>
        {diaries.length > 0 ? (
          diaries.map((diary) => (
            <div key={diary._id} style={styles.diaryItem}>
              <p><strong>Data:</strong> {new Date(diary.date).toLocaleDateString()}</p>
              <button onClick={() => handleView(diary)} style={styles.button}>Visualizar</button>
              <button onClick={() => handleDelete(diary._id)} style={styles.deleteButton}>Deletar</button>
            </div>
          ))
        ) : (
          <p>Nenhum diário registrado ainda.</p>
        )}
      </div>

      {/* Modal para visualização do diário */}
      {isModalOpen && selectedDiary && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Diário de {selectedDiary.date}</h3>
            <p><strong>Horário de Início:</strong> {selectedDiary.startTime}</p>
            <p><strong>Horário de Término:</strong> {selectedDiary.endTime}</p>
            <p><strong>Funcionários:</strong></p>
            {selectedDiary.employees.map((emp, i) => (
              <p key={i}>{emp.quantity} {emp.role} - {emp.company}</p>
            ))}
            <p><strong>Clima da Manhã:</strong> {selectedDiary.morningWeather}</p>
            <p><strong>Clima da Tarde:</strong> {selectedDiary.afternoonWeather}</p>
            <p><strong>Atividades Executadas:</strong></p>
            {selectedDiary.activities.map((act, i) => (
              <p key={i}>{act}</p>
            ))}
            <p><strong>Material Entregue:</strong></p>
            {selectedDiary.materials.map((mat, i) => (
              <p key={i}>{mat}</p>
            ))}
            <p><strong>Ocorrências:</strong></p>
            {selectedDiary.occurrences.map((occ, i) => (
              <p key={i}>{occ}</p>
            ))}
            <button onClick={handleExportPDF} style={styles.exportButton}>Exportar para PDF</button>
            <button onClick={() => setIsModalOpen(false)} style={styles.button}>Fechar</button>
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
  diaryList: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
  button: {
    padding: '0.75rem 1rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  exportButton: {
    marginTop: '1rem',
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
