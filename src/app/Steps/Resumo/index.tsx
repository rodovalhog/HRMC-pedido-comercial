'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';




const ResumoPedido = () => {
  const {
    watch,
  } = useFormContext<any>()
  const dados = watch()
  console.log("dados", dados)
  const produtos = dados?.produtos;
  if (!produtos) return null



  return (
    <div className=" mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 text-gray-500">
      <h1 className="text-2xl font-bold mb-4">Resumo do Pedido</h1>

      <div className="grid grid-cols-1 gap-4 mb-6">
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
          {produtos?.map((produto: any, index: any) => {
            const quantidades = produto?.quantidades || {};

            const valorUnitario = Number(produto?.valor || 0);
            const total = Object.values(quantidades || {}).reduce((sum: number, q: any) => sum + Number(q || 0), 0);

            const valorTotal = total * valorUnitario;
            return (<div key={index} className='border-b border-gray-500 py-2'>
              <p><strong>Modelo:</strong> {produto.modelo}</p>
              <p><strong>Cor:</strong> {produto.cor}</p>
              <p><strong>Tipo:</strong> {produto.tipo}</p>
              <p><strong>Valor Unitário:</strong> R$ {produto.valor.toFixed(2)}</p>
              <p><strong>Total de Pares:</strong> {total}</p>
              <p><strong>Total:</strong> R$ {valorTotal.toFixed(2)}</p>

              <div className="mb-4">
                <h2 className="text-lg font-semibold">Grade de Tamanhos</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  {Object.entries(produto?.quantidades).map(([tamanho, qtd]: any, index: number) => {
                    if (Number.isNaN(qtd)) return
                    return (
                      <div key={index} className="border p-2 rounded shadow text-center w-16">
                        <p className="font-semibold text-sm"> {tamanho}</p>
                        <div>{qtd}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>)
          })}
        </div>
      </div>



      <div className="mb-4">
        <h2 className="text-lg font-semibold">Pagamento</h2>
        <p><strong>Tipo de Pagamento:</strong> {dados?.paymentTypes?.join(', ')}</p>
        <p><strong>Forma:</strong> {dados?.avistaType}</p>
        <p><strong>Observações:</strong> {dados?.observations}</p>
        <hr />
        {dados.imageLogoClient && (<p ><strong>Logo Cliente:</strong>
          <Image
            src={dados.imageLogoClient}
            alt="logo do cliente"
            width={300}
            height={200} // ajuste conforme necessário
            className="border mt-1 max-w-[100px] rounded shadow w-full h-auto"
          /></p>)}
        <p><strong>Observações Logo:</strong> {dados?.observacoesLogo}</p>
      </div>

    </div>
  );
};

export default ResumoPedido;
