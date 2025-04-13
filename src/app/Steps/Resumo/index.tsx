'use client';

import { useFormContext } from 'react-hook-form';




const ResumoPedido = () => {
  const {
    watch,
  } = useFormContext<any>()
  const dados = watch()
  const produto = dados?.produtos[0];
  const totalPares: any = Object.values(produto.quantidades).reduce((a: any, b: any) => a + b, 0);
  const total = totalPares * produto.valor;

  return (
    <div className=" mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 text-gray-500">
      <h1 className="text-2xl font-bold mb-4">Resumo do Pedido</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Dados do Cliente</h2>
          <p><strong>Razão Social:</strong> {dados?.razaoSocial}</p>
          <p><strong>CNPJ:</strong> {dados?.cnpj}</p>
          <p><strong>Inscrição Estadual:</strong> {dados?.inscricaoEstadual}</p>
          <p><strong>Endereço:</strong> {dados?.endereco}</p>
          <p><strong>Cidade:</strong> {dados?.municipio} - {dados?.uf}</p>
          <p><strong>Email:</strong> {dados?.email}</p>
          <p><strong>Telefone:</strong> {dados?.telefone}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Informações do Pedido</h2>
          <p><strong>Modelo:</strong> {produto.modelo}</p>
          <p><strong>Cor:</strong> {produto.cor}</p>
          <p><strong>Tipo:</strong> {produto.tipo}</p>
          <p><strong>Valor Unitário:</strong> R$ {produto.valor.toFixed(2)}</p>
          <p><strong>Total de Pares:</strong> {totalPares}</p>
          <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Grade de Tamanhos</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          {Object.entries(produto.quantidades).map(([tamanho, qtd]: any) => {

            if (Number.isNaN(qtd)) return
            return (
              <div key={tamanho} className="border p-2 rounded shadow text-center w-16">
                <p className="font-semibold text-sm"> {tamanho}</p>
                <div>{qtd}</div>
              </div>
            )

          })}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Pagamento</h2>
        <p><strong>Tipo de Pagamento:</strong> {dados?.paymentTypes?.join(', ')}</p>
        <p><strong>Forma:</strong> {dados?.avistaType}</p>
        <p><strong>Observações:</strong> {dados?.observations}</p>
      </div>
    </div>
  );
};

export default ResumoPedido;
