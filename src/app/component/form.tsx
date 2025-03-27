'use client'


'use client'
import { useForm } from "react-hook-form";
import { gerarPDF, Pedido } from "./gerarPedidoPdf";
import TabelasDeProdutos, { Produto } from "./TableasDeProdutos";
import dynamic from 'next/dynamic';

const AssinaturaDigital = dynamic(() => import("./Assinatura"), {
  ssr: false,
});

const estadosBrasil = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

type FormularioCliente = {
  estado: string;
  sr: string;
  endereco: string;
  municipio: string;
  cnpj: string;
  email: string;
  inscricaoEstadual: string;
  telefone: string;
  products: Produto[],
  observacaoGeral: ""
  assinaturaComprador: "",
  assinaturaRepresentante: ""

};

export default function FormularioCliente() {
  const { register, handleSubmit, setValue, watch } = useForm<Pedido>();
  const x = watch()
  console.log("x >>>", x)

  const onSubmit = (data: Pedido) => {
    console.log("Dados do cliente:", data);
    console.log("x", x)
    gerarPDF(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        <div>
          <label className="block">Estado:</label>
          <select {...register("estado")} className="w-full border p-1">
            <option value="">Selecione um estado</option>
            {estadosBrasil.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Razão Social.:</label>
          <input type="text" {...register("sr")} className="w-full border p-1" />
        </div>
        <div>
          <label className="block">End.:</label>
          <input type="text" {...register("endereco")} className="w-full border p-1" />
        </div>
        <div>
          <label className="block">Município:</label>
          <input type="text" {...register("municipio")} className="w-full border p-1" />
        </div>
        <div>
          <label className="block">CNPJ:</label>
          <input type="text" {...register("cnpj")} className="w-full border p-1" />
        </div>
        <div>
          <label className="block">Email:</label>
          <input type="email" {...register("email")} className="w-full border p-1" />
        </div>
        <div>
          <label className="block">Insc. Est.:</label>
          <input type="text" {...register("inscricaoEstadual")} className="w-full border p-1" />
        </div>
        <div>
          <label className="block">Tel.:</label>
          <input type="text" {...register("telefone")} className="w-full border p-1" />
        </div>
      </div>

      <div className="mb-6 text-black mt-6">
        <span className="font-semibold mr-4">Condições:</span>
        <label className="mr-4"><input type="checkbox" className="mr-1" />À vista</label>
        <label className="mr-4"><input type="checkbox" className="mr-1" />Cheque</label>
        <label className="mr-4"><input type="checkbox" className="mr-1" />Boleto</label>
        <label><input type="checkbox" className="mr-1" />Cartão</label>
      </div>


      <TabelasDeProdutos getValues={setValue} />

      {/* Campo de Observação Geral */}
      <div className="mb-4 mt-6">
        <label htmlFor="observacao-geral" className="block text-sm font-medium mb-1">
          Observações gerais:
        </label>
        <textarea
          id="observacao-geral"
          rows={4}
          className="w-full border rounded p-2 text-sm resize-y"
          placeholder="Digite aqui qualquer observação geral sobre este pedido..."
          {...register("observacaoGeral")}
          {...register}
        />
      </div>


      <div className="flex flex-col md:flex-row justify-between mt-8 text-sm text-black pt-10">
        <div className="p-4">
          <AssinaturaDigital title="ASSINATURA COMPRADOR" setValue={setValue} name="assinaturaComprador" />
        </div>

        <div className="p-4">
          <AssinaturaDigital title="ASSINATURA REPRESENTANTTE" setValue={setValue} name="assinaturaRepresentante" />
        </div>
      </div>
      já esta em prodx
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 w-full text-white font-semibold py-2 px-6 rounded mt-8"
      >
        Criar pedido
      </button>
    </form>
  );
}
