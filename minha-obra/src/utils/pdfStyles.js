// src/utils/pdfStyles.js
import jsPDF from 'jspdf';
import logoImg from '../assets/logo.png';

export const generateDiaryPDF = (diary, work) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const titleText = 'Diário de Obra';
  const titleX = (pageWidth - doc.getTextWidth(titleText)) / 2;
  let yOffset = 10;

  // Função auxiliar para verificar se é necessário criar uma nova página
  const checkAddPage = (increment) => {
    if (yOffset + increment > pageHeight - 20) { // Reserva espaço para o rodapé
      doc.addPage();
      yOffset = 10; // Reinicia a posição no topo da nova página
    }
  };

  // Cabeçalho com logo e título
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(titleText, titleX, yOffset);
  doc.addImage(logoImg, 'PNG', 160, yOffset, 30, 30);
  yOffset += 25;

  // Informações da obra
  doc.setFontSize(12);
  doc.setTextColor(80);
  doc.text(`Nome da Obra: ${work.name}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Endereço: ${work.address}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Data de Início: ${new Date(work.startDate).toLocaleDateString()}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Duração: ${work.duration} dias`, 10, yOffset);
  yOffset += 10;
  doc.text(`Data de Término: ${new Date(work.endDate).toLocaleDateString()}`, 10, yOffset);
  yOffset += 10;
  doc.line(10, yOffset, 200, yOffset); // Linha separadora
  yOffset += 10;

  // Dados do Diário de Obra
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text(`Data do Diário: ${new Date(diary.date).toLocaleDateString()}`, 10, yOffset);
  yOffset += 10;

  // Horários
  doc.setFontSize(12);
  doc.text(`Horário de Início: ${diary.startTime || 'Não especificado'}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Horário de Término: ${diary.endTime || 'Não especificado'}`, 10, yOffset);
  yOffset += 10;

  // Funcionários
  doc.setFontSize(14);
  doc.text('Funcionários:', 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  diary.employees.forEach((emp, i) => {
    checkAddPage(10);
    doc.text(`${i + 1}. ${emp.quantity} ${emp.role} - ${emp.company}`, 10, yOffset);
    yOffset += 10;
  });

  // Clima
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Clima:', 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  doc.text(`Manhã: ${diary.morningWeather || 'Não especificado'}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Tarde: ${diary.afternoonWeather || 'Não especificado'}`, 10, yOffset);
  yOffset += 10;

  // Atividades
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Atividades Executadas:', 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  diary.activities.forEach((act, i) => {
    checkAddPage(10);
    doc.text(`${i + 1}. ${act}`, 10, yOffset);
    yOffset += 10;
  });

  // Materiais
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Material Entregue:', 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  diary.materials.forEach((mat, i) => {
    checkAddPage(10);
    doc.text(`${i + 1}. ${mat}`, 10, yOffset);
    yOffset += 10;
  });

  // Ocorrências
  yOffset += 10;
  doc.setFontSize(14);
  doc.text('Ocorrências:', 10, yOffset);
  yOffset += 10;
  doc.setFontSize(12);
  diary.occurrences.forEach((occ, i) => {
    checkAddPage(10);
    doc.text(`${i + 1}. ${occ}`, 10, yOffset);
    yOffset += 10;
  });

  // Campos de assinatura
  const signatureYPosition = yOffset + 30;
  const signatureWidth = 80;
  const textYPosition = signatureYPosition + 15;
  
  // Campo de Assinatura do Responsável pelo Diário
  checkAddPage(40); // Verifica se há espaço antes de adicionar as assinaturas
  doc.line(20, signatureYPosition, 20 + signatureWidth, signatureYPosition);
  doc.text("Assinatura do Responsável pelo Diário", 20, textYPosition);

  // Campo de Assinatura do Engenheiro Responsável
  doc.line(120, signatureYPosition, 120 + signatureWidth, signatureYPosition);
  doc.text("Assinatura do Engenheiro Responsável", 120, textYPosition);

  // Salvar o PDF
  doc.save(`Diário_${new Date(diary.date).toLocaleDateString()}.pdf`);
};
