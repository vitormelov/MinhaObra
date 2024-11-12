// src/utils/pdfStyles.js
import jsPDF from 'jspdf';
import logoImg from '../assets/logo.png'; // Caminho da logo (certifique-se que a logo existe nessa pasta)

export const generateDiaryPDF = (diary, work) => {
  const doc = new jsPDF();
  
  // Estilo do título e cabeçalho
  doc.setFontSize(18);
  doc.setTextColor(40);
  
  // Adicionando o logo no canto superior direito
  doc.addImage(logoImg, 'PNG', 160, 10, 30, 30); // Ajuste a posição e o tamanho conforme necessário
  
  // Cabeçalho com informações da obra à esquerda
  doc.text('Diário de Obra', 10, 10);
  doc.setFontSize(12);
  doc.setTextColor(80);
  doc.text(`Nome da Obra: ${work.name}`, 10, 25);
  doc.text(`Endereço: ${work.address}`, 10, 35);
  doc.text(`Data de Início: ${new Date(work.startDate).toLocaleDateString()}`, 10, 45);
  doc.text(`Duração: ${work.duration} dias`, 10, 55);
  doc.text(`Data de Término: ${new Date(work.endDate).toLocaleDateString()}`, 10, 65);

  // Separador entre cabeçalho e conteúdo do diário
  doc.setDrawColor(200, 200, 200);
  doc.line(10, 75, 200, 75); // Linha horizontal

  // Título do Diário de Obra
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text(`Data do Diário: ${new Date(diary.date).toLocaleDateString()}`, 10, 85);

  // Horários de início e término
  doc.setFontSize(12);
  doc.text(`Horário de Início: ${diary.startTime || 'Não especificado'}`, 10, 95);
  doc.text(`Horário de Término: ${diary.endTime || 'Não especificado'}`, 10, 105);

  // Funcionários
  let yOffset = 115;
  doc.setFontSize(14);
  doc.text('Funcionários:', 10, yOffset);
  doc.setFontSize(12);
  diary.employees.forEach((emp, i) => {
    doc.text(`${i + 1}. ${emp.quantity} ${emp.role} - ${emp.company}`, 10, yOffset + 10);
    yOffset += 10;
  });

  // Clima da manhã e da tarde
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Clima:', 10, yOffset);
  doc.setFontSize(12);
  doc.text(`Manhã: ${diary.morningWeather || 'Não especificado'}`, 10, yOffset + 10);
  doc.text(`Tarde: ${diary.afternoonWeather || 'Não especificado'}`, 10, yOffset + 20);

  // Atividades
  yOffset += 30;
  doc.setFontSize(14);
  doc.text('Atividades Executadas:', 10, yOffset);
  doc.setFontSize(12);
  diary.activities.forEach((act, i) => {
    doc.text(`${i + 1}. ${act}`, 10, yOffset + 10);
    yOffset += 10;
  });

  // Materiais entregues
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Material Entregue:', 10, yOffset);
  doc.setFontSize(12);
  diary.materials.forEach((mat, i) => {
    doc.text(`${i + 1}. ${mat}`, 10, yOffset + 10);
    yOffset += 10;
  });

  // Ocorrências
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Ocorrências:', 10, yOffset);
  doc.setFontSize(12);
  diary.occurrences.forEach((occ, i) => {
    doc.text(`${i + 1}. ${occ}`, 10, yOffset + 10);
    yOffset += 10;
  });

  // Salvar o PDF
  doc.save(`Diário_${new Date(diary.date).toLocaleDateString()}.pdf`);
};
