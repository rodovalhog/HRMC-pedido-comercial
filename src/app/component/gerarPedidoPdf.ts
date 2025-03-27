


// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const gerarPDF = (dados: any) => {
//   console.log("doc", JSON.stringify(dados))
//   const doc = new jsPDF();
//   let y = 20;

//   doc.setFontSize(16);
//   doc.text("Pedido de Compra", 20, y);
//   y += 10;


//   // Informações gerais (exceto numeração e campos vazios)
//   Object.entries(dados).forEach(([chave, valor]: any) => {
//     if (
//       valor !== "" &&
//       !chave.startsWith("numeracao") // pula os campos de numeração
//     ) {
//       doc.setFontSize(12);
//       doc.text(`${chave}: ${valor}`, 20, y);
//       y += 8;

//       if (y > 270) {
//         doc.addPage();
//         y = 20;
//       }
//     }
//   });

//   // Filtrar e formatar as numerações
//   const numeracoes = Object.entries(dados)
//     .filter(([key, value]: any) => key.startsWith("numeracao") && value !== "")
//     .map(([key, value]) => {
//       const tamanho = key.split("-")[1]; // pega o número (ex: 34)
//       return { tamanho, quantidade: value };
//     });

//   // Se tiver numerações, criar a tabela
//   if (numeracoes.length > 0) {
//     y += 10;
//     doc.setFontSize(14);
//     doc.text("Tabela de Numeração", 20, y);
//     y += 5;

//     autoTable(doc, {
//       startY: y,
//       head: [["Tamanho", "Quantidade"]],
//       // body: numeracoes.map((n) => [n.tamanho, n.quantidade]) as UserOptions[]
//     });
//   }

//   doc.save("pedido.pdf");
// };


// const x = {
//   estado: 'MS',
//   sr: 'Guilherme Rodovalho ltda',
//   endereco: 'av. gertulio vargas 2377 ap 331',
//   municipio: 'Uberlandia',
//   cnpj: '08857672689',
//   email: 'rodovalhog@gmail.com',
//   inscricaoEstadual: 'mg1655396',
//   telefone: '34991619467',
//   observacaoGeral: 'Não tenho observaçao hj',
//   products: [
//     {
//       modelo: 'Botina',
//       cor: 'preta',
//       numeracao: [
//         { numero: 34, quantidade: 1 },
//         { numero: 35, quantidade: 1 },
//         { numero: 36, quantidade: 1 },
//         { numero: 40, quantidade: 10 },
//       ],
//       precoUnitario: '180',
//       quantidade: 13,
//       valorTotal: 2340,
//     },
//     {
//       modelo: 'bota',
//       numeracao: [
//         { numero: 34, quantidade: 3 },
//         { numero: 38, quantidade: 4 },
//         { numero: 40, quantidade: 15 },
//         { numero: 44, quantidade: 12 },
//       ],
//       precoUnitario: '100',
//       quantidade: 34,
//       valorTotal: 3400,
//       cor: 'marron',
//     },
//   ],
// };

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
  sr: string;
  endereco: string;
  municipio: string;
  cnpj: string;
  email: string;
  inscricaoEstadual: string;
  telefone: string;
  observacaoGeral: string;
  products: Produto[];
};

export const gerarPDF = (dados: Pedido) => {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(16);
  doc.text("Pedido de Compra", 20, y);
  y += 10;

  const infoGeral = [
    ["Estado", dados.estado],
    ["Sr", dados.sr],
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

  // Tabela de produtos
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

    // Verifica se precisa de nova página
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("pedido.pdf");
};
