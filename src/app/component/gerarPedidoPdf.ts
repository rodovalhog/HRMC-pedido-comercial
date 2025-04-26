import jsPDF from "jspdf";

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
export const gerarPDF = (dados: any) => {
  const {
    cnpj,
    razaoSocial,
    inscricaoEstadual,
    municipio,
    email,
    telefone,
    uf,
    endereco,
    paymentTypes,
    cardType,
    avistaType: pagamentoAvista,
    boletoCondition: condicaoBoleto,
    installments: parcelaCartaoCredito,
    observations,
    imageLogoClient,
    observacoesLogo,
    produtos,
    assinaturaRepresentante,
    assinaturaCliente,
  } = dados







  const doc = new jsPDF();
  let y = 20;

  // Cabeçalho
  doc.setFontSize(16);
  doc.text("Pedido de Compra", 20, y);
  y += 10;

  // Dados do cliente
  const infoCliente = [
    ["Razão Social", razaoSocial],
    ["CNPJ", cnpj],
    ["Inscrição Estadual", inscricaoEstadual],
    ["Telefone", telefone],
    ["Email", email],
    ["Endereço", endereco],
    ["Município", municipio],
    ["Estado", uf],
  ];


  infoCliente.forEach(([label, value]) => {
    doc.setFontSize(12);
    doc.text(`${label}: ${value}`, 20, y);
    y += 7;
  });


  y += 7;
  doc.text("Condições de Pagamento:", 20, y);
  if (pagamentoAvista) {
    y += 7;
    doc.text(`Pagamento à vista: no ${pagamentoAvista}`, 20, y);
  }

  if (parcelaCartaoCredito && cardType == 'credito') {
    y += 7;
    doc.text(`Pagamento cartão de credito em : ${parcelaCartaoCredito}x`, 20, y);
  } else {
    y += 7;

    doc.text(`Pagamento cartão de ${cardType}`, 20, y);

  }

  if (condicaoBoleto) {
    y += 7;

    const cheque = paymentTypes.some((item: string) => item === "Cheque")
    const boleto = paymentTypes.some((item: string) => item === "Boleto")
    if (cheque) {
      y += 7;
      doc.text(`Pagamento no cheque: ${condicaoBoleto.replaceAll('_', ', ')}`, 20, y);
    }
    if (boleto) {
      y += 7;
      doc.text(`Pagamento no boleto: ${condicaoBoleto.replaceAll('_', ', ')}`, 20, y);
    }
  }
  if (observations) {
    y += 7;
    doc.text(`Observação: ${observations}`, 20, y);
  }

  y += 7;
  doc.text("Logo Cliente:", 20, y);
  y += 7;
  doc.addImage(imageLogoClient, "PNG", 20, y, 60, 30);

  y += 40;
  doc.text(`Observações: ${observacoesLogo}`, 20, y);


  y += 10
  doc.text("Produtos:", 20, y);
  let valorTotalDeTodosPedido = 0
  let quantidadeTotalDeTodosPedido = 0
  produtos.forEach((produto: any) => {
    const quantidades = produto?.quantidades || {};

    const valorUnitario = Number(produto?.valor || 0);
    const total = Object.values(quantidades || {}).reduce((sum: number, q: any) => sum + Number(q || 0), 0);

    const valorTotal = total * valorUnitario;

    doc.setFontSize(13);
    y += 6;

    doc.text(`Modelo: ${produto.modelo} ${produto.tipo} cor: ${produto.cor} valor: ${produto.valor}`, 20, y);
    y += 6;

    doc.text("Grade:", 20, y);
    Object.entries(produto?.quantidades).forEach(([tamanho, qtd]: any) => {
      if (!Number.isNaN(qtd)) {
        y += 6;
        doc.text(`Nº : ${tamanho} Qnt: ${qtd}`, 20, y);
      }
      if (Number(y) >= 270) {
        doc.addPage();
        y = 20
      }

    })
    y += 6;
    doc.text(` Quantidades : ${total}  Valor total: ${valorTotal}`, 20, y);
    quantidadeTotalDeTodosPedido += total
    valorTotalDeTodosPedido += valorTotal

    y += 6;

  })
  doc.setFontSize(14);
  doc.text(`Total de pares ${quantidadeTotalDeTodosPedido}`, 20, y);
  y += 6;

  doc.text(`Total total da compra ${valorTotalDeTodosPedido}`, 20, y);
  doc.setFontSize(12);
  if (y >= Number(270)) {

    doc.addPage();
    y = 20
  }
  y += 20;
  if (assinaturaRepresentante || assinaturaCliente) {
    doc.text(`Assinatura representate`, 20, y);
    doc.text(`Assinatura Cliente `, 100, y);

    y += 4;
    doc.addImage(assinaturaRepresentante, "PNG", 20, y, 60, 30);
    doc.addImage(assinaturaCliente, "PNG", 100, y, 60, 30);

  }
  if (Number(y) >= 270) {
    doc.addPage();
    y = 20
  }


  doc.save("pedido.pdf");
};
