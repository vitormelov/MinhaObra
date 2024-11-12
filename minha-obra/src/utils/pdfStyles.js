// src/utils/pdfStyles.js
import jsPDF from 'jspdf';

export const generateDiaryPDF = (diary) => {
  const doc = new jsPDF();

  // Estilo de Cabeçalho
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(`Diário de Obra - ${diary.date}`, 10, 10);

  // Estilo de Seção de Detalhes Gerais
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Horário de Início: ${diary.startTime}`, 10, 20);
  doc.text(`Horário de Término: ${diary.endTime}`, 10, 30);

  // Estilo para a seção de Funcionários
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text('Funcionários:', 10, 40);
  doc.setFontSize(12);
  diary.employees.forEach((emp, i) => {
    doc.text(`${i + 1}. ${emp.quantity} ${emp.role} - ${emp.company}`, 10, 50 + i * 10);
  });

  // Estilo para Clima
  doc.setFontSize(14);
  doc.text('Clima:', 10, 60 + diary.employees.length * 10);
  doc.setFontSize(12);
  doc.text(`Manhã: ${diary.morningWeather}`, 10, 70 + diary.employees.length * 10);
  doc.text(`Tarde: ${diary.afternoonWeather}`, 10, 80 + diary.employees.length * 10);

  // Estilo para Atividades
  const activityYPos = 90 + diary.employees.length * 10;
  doc.setFontSize(14);
  doc.text('Atividades Executadas:', 10, activityYPos);
  doc.setFontSize(12);
  diary.activities.forEach((act, i) => {
    doc.text(`${i + 1}. ${act}`, 10, activityYPos + 10 + i * 10);
  });

  // Estilo para Materiais
  const materialYPos = activityYPos + 20 + diary.activities.length * 10;
  doc.setFontSize(14);
  doc.text('Material Entregue:', 10, materialYPos);
  doc.setFontSize(12);
  diary.materials.forEach((mat, i) => {
    doc.text(`${i + 1}. ${mat}`, 10, materialYPos + 10 + i * 10);
  });

  // Estilo para Ocorrências
  const occurrencesYPos = materialYPos + 20 + diary.materials.length * 10;
  doc.setFontSize(14);
  doc.text('Ocorrências:', 10, occurrencesYPos);
  doc.setFontSize(12);
  diary.occurrences.forEach((occ, i) => {
    doc.text(`${i + 1}. ${occ}`, 10, occurrencesYPos + 10 + i * 10);
  });

  // Salva o PDF
  doc.save(`Diário_${diary.date}.pdf`);
};
