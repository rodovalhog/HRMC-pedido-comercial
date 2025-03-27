'use client'
import { useEffect, useState } from "react";

type Numeracao = {
  numero: number;
  quantidade: number;
};

export type Produto = {
  modelo: string;
  cor: string;
  numeracao: Numeracao[];
  precoUnitario: number | string;
  quantidade: number;
  valorTotal: number;
};
export default function TabelasDeProdutos({ getValues }: any) {
  const [tabelas, setTabelas] = useState([0]); // inicia com uma tabela

  const adicionarTabela = () => {
    setTabelas([...tabelas, tabelas.length]);
  };



  const [product, setProduct] = useState<Produto[]>([{
    modelo: "",
    cor: "",
    numeracao: [],
    precoUnitario: "",
    quantidade: 0,
    valorTotal: 0,
  }])

  useEffect(() => {
    getValues('products', product)
  }, [product, getValues])

  type ItemNumeracao = { numero: number; quantidade: number };

  const atualizarNumeracao = (
    lista: ItemNumeracao[],
    novoItem: ItemNumeracao
  ): ItemNumeracao[] => {
    const { numero, quantidade } = novoItem;

    // Se quantidade for 0, vazio ou inválida, remove o item
    if (!quantidade || quantidade <= 0) {
      return lista.filter(item => item.numero !== numero);
    }

    const index = lista.findIndex(item => item.numero === numero);

    if (index === -1) {
      // Não existe ainda, adiciona
      return [...lista, novoItem];
    } else {
      // Existe e precisa atualizar se a quantidade for diferente
      if (lista[index].quantidade !== quantidade) {
        const novaLista = [...lista];
        novaLista[index] = { ...novaLista[index], quantidade };
        return novaLista;
      }
      // Se for igual, não muda nada
      return lista;
    }
  };


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<typeof product>>,
    index: number
  ) => {
    const { name, value, id } = event.target;

    setValue((prevState: Produto[]) => {
      const updated: Produto[] = [...prevState];
      let numeracao: Numeracao[] = updated[index]?.numeracao ?? [];
      const precoUnitario = name === 'precoUnitario' ? value : updated[index]?.precoUnitario
      if (name === "numeracao") {
        numeracao = atualizarNumeracao(numeracao, { numero: Number(id), quantidade: Number(value) });
      }

      const quantidade = numeracao.reduce((total, item) => total + item.quantidade, 0);
      const valorTotal = quantidade * Number(precoUnitario)


      updated[index] = {
        ...updated[index],
        [name]: value,
        numeracao,
        precoUnitario,
        quantidade,
        valorTotal
      };



      return updated;
    });
  };
  console.log("product", product)

  return (
    <div className="text-black">
      {tabelas.map((_, index) => (
        <div className="mt-6" key={`${index}-grade-numeracao`} >
          <div key={`${index}-numeros-maiores`} className="overflow-x-auto mb-3">
            <h2 className="text-sm font-semibold mb-1">Tabela de Produtos #{index + 1}</h2>
            <table className="border text-center text-xs whitespace-nowrap">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 h-[30px] break-words whitespace-normal">Modelo</th>
                  <th className="border px-2 h-[30px] break-words whitespace-normal">Cor</th>
                  <th className="border px-2 h-[30px] break-words whitespace-normal">Pr. Unit.</th>
                  {[...Array(12).keys()].map((i) => (
                    <th key={i + 34} className="border px-1 h-[30px] break-words whitespace-normal w-[50px]">
                      {i + 34}
                    </th>
                  ))}
                  <th className="border px-2 h-[30px] break-words whitespace-normal">Quant.</th>
                  <th className="border px-2 h-[30px] break-words whitespace-normal">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border h-[30px] break-words whitespace-normal">
                    <input
                      type="text"
                      name="modelo"
                      className="w-full min-w-[80px] h-full p-0 m-0 text-center"
                      value={product[index]?.modelo ?? ""}
                      onChange={(e) => handleChange(e, setProduct, index)}
                    />
                  </td>
                  <td className="border h-[30px] break-words whitespace-normal">
                    <input
                      type="text"
                      name="cor"
                      className="w-full min-w-[80px] h-full p-0 m-0 text-center"
                      value={product[index]?.cor ?? ""}
                      onChange={(e) => handleChange(e, setProduct, index)}
                    />
                  </td>
                  <td className="border h-[30px] break-words whitespace-normal">
                    <input
                      type="number"
                      name="precoUnitario"
                      className="w-full min-w-[60px] h-full p-0 m-0 text-center"
                      value={product[index]?.precoUnitario ?? ""}
                      onChange={(e) => handleChange(e, setProduct, index)}
                    />
                  </td>
                  {[...Array(12)].map((_, i) => (
                    <td key={i} className="border h-[30px] break-words whitespace-normal">
                      <input
                        type="number"
                        name={`numeracao`}
                        id={String(i + 34)}
                        className="w-full min-w-[50px] h-full p-0 m-0 text-center"
                        onChange={(e) => handleChange(e, setProduct, index)}
                      />
                    </td>
                  ))}
                  <td className="border h-[30px] break-words whitespace-normal">
                    <input
                      type="number"
                      name="quantidade"
                      className="w-full min-w-[60px] h-full p-0 m-0 text-center"
                      value={product[index]?.quantidade ?? ""}
                      onChange={() => null}
                    />
                  </td>
                  <td className="border h-[30px] break-words whitespace-normal">
                    <input
                      type="text"
                      name="valorTotal"
                      className="w-full min-w-[80px] h-full p-0 m-0 text-center"
                      value={String(product[index]?.valorTotal) ?? ""}
                      onChange={() => null}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>

      ))}

      <div className="mt-4">
        <button
          type="button"
          onClick={adicionarTabela}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          + Adicionar Grade Aduto
        </button>
        <button
          type="button"
          onClick={adicionarTabela}
          className="bg-yellow-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          + Adicionar Grade Infantil
        </button>
      </div>
    </div>
  );
}
