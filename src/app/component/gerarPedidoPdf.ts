


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const gerarPDF = (dados: any) => {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(16);
  doc.text("Pedido de Compra", 20, y);
  y += 10;


  // Informações gerais (exceto numeração e campos vazios)
  Object.entries(dados).forEach(([chave, valor]: any) => {
    if (
      valor !== "" &&
      !chave.startsWith("numeracao") // pula os campos de numeração
    ) {
      doc.setFontSize(12);
      doc.text(`${chave}: ${valor}`, 20, y);
      y += 8;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
  });

  // Filtrar e formatar as numerações
  const numeracoes = Object.entries(dados)
    .filter(([key, value]: any) => key.startsWith("numeracao") && value !== "")
    .map(([key, value]) => {
      const tamanho = key.split("-")[1]; // pega o número (ex: 34)
      return { tamanho, quantidade: value };
    });

  // Se tiver numerações, criar a tabela
  if (numeracoes.length > 0) {
    y += 10;
    doc.setFontSize(14);
    doc.text("Tabela de Numeração", 20, y);
    y += 5;

    autoTable(doc, {
      startY: y,
      head: [["Tamanho", "Quantidade"]],
      // body: numeracoes.map((n) => [n.tamanho, n.quantidade]) as UserOptions[]
    });
  }

  doc.save("pedido.pdf");
};


