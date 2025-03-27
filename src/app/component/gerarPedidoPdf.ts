import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Numeracao = {
  numero: number;
  quantidade: number;
};

type Produto = {
  modelo: string;
  cor: string;
  numeracao: Numeracao[];
  precoUnitario: string;
  quantidade: number;
  valorTotal: number;
};

export type Pedido = {
  estado: string;
  razaoSocial: string;
  endereco: string;
  municipio: string;
  cnpj: string;
  email: string;
  inscricaoEstadual: string;
  telefone: string;
  observacaoGeral: string;
  products: Produto[];
  assinaturaRepresentante: any
  assinaturaComprador: any
};
export const gerarPDF = (dados: Pedido) => {
  const doc = new jsPDF();
  let y = 20;

  // Cabeçalho
  doc.setFontSize(16);
  doc.text("Pedido de Compra", 20, y);
  y += 10;

  // Dados do cliente
  const infoGeral = [
    ["Estado", dados.estado],
    ["Razão Social", dados.razaoSocial],
    ["Endereço", dados.endereco],
    ["Município", dados.municipio],
    ["CNPJ", dados.cnpj],
    ["Email", dados.email],
    ["Inscrição Estadual", dados.inscricaoEstadual],
    ["Telefone", dados.telefone],
  ];

  infoGeral.forEach(([label, value]) => {
    doc.setFontSize(12);
    doc.text(`${label}: ${value}`, 20, y);
    y += 7;
  });

  // Observações
  if (dados.observacaoGeral) {
    y += 5;
    doc.setFontSize(12);
    doc.text("Observações:", 20, y);
    y += 6;
    doc.setFontSize(11);
    doc.text(dados.observacaoGeral, 20, y);
    y += 10;
  }

  // Produtos
  dados.products.forEach((produto, idx) => {
    doc.setFontSize(13);
    doc.text(`Produto ${idx + 1}: ${produto.modelo}`, 20, y);
    y += 6;
    doc.setFontSize(11);
    doc.text(`Cor: ${produto.cor}`, 20, y);
    doc.text(`Preço Unitário: R$ ${produto.precoUnitario}`, 80, y);
    doc.text(`Quantidade: ${produto.quantidade}`, 140, y);
    y += 6;
    doc.text(`Valor Total: R$ ${produto.valorTotal}`, 20, y);
    y += 8;

    autoTable(doc, {
      startY: y,
      head: [["Numeração", "Quantidade"]],
      body: produto.numeracao.map((n) => [n.numero.toString(), n.quantidade.toString()]),
      margin: { left: 20, right: 20 },
      styles: { fontSize: 10 },
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  });

  // Assinaturas lado a lado
  if (dados.assinaturaRepresentante || dados.assinaturaComprador) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.text("Assinatura do Representante", 20, y);
    doc.text("Assinatura do Comprador", 120, y);
    y += 5;

    if (dados.assinaturaRepresentante) {
      doc.addImage(dados.assinaturaRepresentante, "PNG", 20, y, 60, 30);
    }

    if (dados.assinaturaComprador) {
      doc.addImage(dados.assinaturaComprador, "PNG", 120, y, 60, 30);
    }

    y += 40;
  }

  doc.save("pedido.pdf");
};
