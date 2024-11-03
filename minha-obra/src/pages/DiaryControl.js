// src/pages/DiaryControl.js
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const DiaryControl = () => {
  // Estado inicial do formulário do diário de obra
  const [diaries, setDiaries] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    employees: [],
    morningWeather: '',
    afternoonWeather: '',
    activities: [],
    materials: []
  });

  // Estado temporário para funcionários, atividades e materiais
  const [employee, setEmployee] = useState({ quantity: '', role: '', company: '' });
  const [activity, setActivity] = useState('');
  const [material, setMaterial] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);

  // Função para manipular entradas do formulário principal
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funções para adicionar funcionários, atividades e materiais ao diário
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

  // Função para adicionar ou atualizar o diário
  const handleSubmit = (e) => {
    e.preventDefault();
    setDiaries([...diaries, formData]);
    setFormData({
      date: '',
      employees: [],
      morningWeather: '',
      afternoonWeather: '',
      activities: [],
      materials: []
    });
  };

  // Função para abrir o modal e exibir o diário selecionado
  const handleView = (index) => {
    setSelectedDiary(diaries[index]);
    setIsModalOpen(true);
  };

    // Define a função handleDelete
    const handleDelete = (index) => {
        const updatedDiaries = diaries.filter((_, i) => i !== index);
        setDiaries(updatedDiaries);
        };

  // Função para exportar o diário selecionado para PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Diário de Obra - ${selectedDiary.date}`, 10, 10);
    doc.text('Funcionários:', 10, 20);
    selectedDiary.employees.forEach((emp, i) => {
      doc.text(`${i + 1}. ${emp.quantity} ${emp.role} - ${emp.company}`, 10, 30 + i * 10);
    });
    doc.text(`Clima da manhã: ${selectedDiary.morningWeather}`, 10, 50);
    doc.text(`Clima da tarde: ${selectedDiary.afternoonWeather}`, 10, 60);
    doc.text('Atividades Executadas:', 10, 70);
    selectedDiary.activities.forEach((act, i) => {
      doc.text(`${i + 1}. ${act}`, 10, 80 + i * 10);
    });
    doc.text('Material Entregue:', 10, 100);
    selectedDiary.materials.forEach((mat, i) => {
      doc.text(`${i + 1}. ${mat}`, 10, 110 + i * 10);
    });
    doc.save(`Diário_${selectedDiary.date}.pdf`);
  };

  return (
    <div>
      <h2>Diário de Obra</h2>

      {/* Formulário para adicionar novo diário */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Data:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Seção para adicionar funcionários */}
        <div>
          <label>Funcionários</label>
          <input
            type="number"
            placeholder="Quantidade"
            value={employee.quantity}
            onChange={(e) => setEmployee({ ...employee, quantity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Função"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
          />
          <input
            type="text"
            placeholder="Empresa"
            value={employee.company}
            onChange={(e) => setEmployee({ ...employee, company: e.target.value })}
          />
          <button type="button" onClick={addEmployee}>Adicionar Funcionário</button>
        </div>

        {/* Seção para Clima */}
        <div>
          <label>Clima da Manhã</label>
          <select name="morningWeather" value={formData.morningWeather} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="limpo">Limpo</option>
            <option value="nublado">Nublado</option>
            <option value="chuvoso">Chuvoso</option>
            <option value="impraticável">Impraticável</option>
          </select>
        </div>
        <div>
          <label>Clima da Tarde</label>
          <select name="afternoonWeather" value={formData.afternoonWeather} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="limpo">Limpo</option>
            <option value="nublado">Nublado</option>
            <option value="chuvoso">Chuvoso</option>
            <option value="impraticável">Impraticável</option>
          </select>
        </div>

        {/* Seção para Atividades Executadas */}
        <div>
          <label>Atividades Executadas</label>
          <input
            type="text"
            placeholder="Descrição da atividade"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <button type="button" onClick={addActivity}>Adicionar Atividade</button>
        </div>

        {/* Seção para Material Entregue */}
        <div>
          <label>Material Entregue</label>
          <input
            type="text"
            placeholder="Descrição do material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <button type="button" onClick={addMaterial}>Adicionar Material</button>
        </div>

        <button type="submit">Salvar Diário</button>
      </form>

      {/* Lista de diários */}
      <div style={styles.diaryList}>
        {diaries.length > 0 ? (
          diaries.map((diary, index) => (
            <div key={index} style={styles.diaryItem}>
              <p><strong>Data:</strong> {diary.date}</p>
              <button onClick={() => handleView(index)}>Visualizar</button>
              <button onClick={() => handleDelete(index)}>Deletar</button>
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
            <button onClick={handleExportPDF}>Exportar para PDF</button>
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos para o layout
const styles = {
  form: { /* Estilos para o formulário */ },
  diaryList: { /* Estilos para lista de diários */ },
  diaryItem: { /* Estilos para cada item de diário */ },
  modalOverlay: { /* Estilos para o fundo do modal */ },
  modalContent: { /* Estilos para o conteúdo do modal */ },
};

export default DiaryControl;
