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
            <table className="min-w-full border text-center text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border  h-[30px]">Modelo</th>
                  <th className="border  h-[30px]">Cor</th>
                  <th className="border  h-[30px]">Pr. Unit.</th>

                  {[...Array(12).keys()].map((i) => (
                    <th key={i + 34} className="border px-1">
                      {i + 34}
                    </th>
                  ))}
                  <th className="border  h-[30px]">Quant.</th>
                  <th className="border  h-[30px]">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td className="border  h-[30px]">
                    <input type="text" name="modelo" className="w-full h-full p-0 m-0 text-center"
                      value={product[index]?.modelo ?? ""}
                      onChange={(e) => handleChange(e, setProduct, index)}
                    />
                  </td>
                  <td className="border  h-[30px]">
                    <input type="text" name="cor" className="w-full h-full p-0 m-0 text-center"
                      value={product[index]?.cor ?? ""}

                      onChange={(e) => handleChange(e, setProduct, index)}
                    />
                  </td>
                  <td className="border  h-[30px]">
                    <input type="text" name="precoUnitario" className="w-full h-full p-0 m-0 text-center"
                      onChange={(e) => handleChange(e, setProduct, index)}
                      value={product[index]?.precoUnitario ?? ""}

                    />
                  </td>
                  {[...Array(12)].map((_, i) => (
                    <td key={i} className="border h-[30px]">
                      <input type="text" name={`numeracao`} id={String(i + 34)} className="w-full h-full p-0 m-0 text-center"
                        // value={product[index]?.numeracao[i]?.quantidade}

                        onChange={(e) => handleChange(e, setProduct, index)}
                      />
                    </td>
                  ))}
                  <td className="border  h-[30px]">
                    <input type="text" name="quantidade" className="w-full h-full p-0 m-0 text-center"
                      value={product[index]?.quantidade ?? ""}
                      onChange={() => null}
                    />
                  </td>

                  <td className="border  h-[30px]">
                    <input type="text" name="valorTotal" className="w-full h-full p-0 m-0 text-center"
                      onChange={() => null}
                      value={String(product[index]?.valorTotal) ?? ""}

                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-1 text-black" key={`${index + 10}-numeros-menores`} >
            <table className="min-w-full border text-center text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border  h-[30px]">Modelo</th>
                  <th className="border  h-[30px]">Cor</th>
                  {[...Array(16).keys()].map(i => (
                    <th key={i + 20} className="border px-1">{i + 20}</th>
                  ))}
                  <th className="border  h-[30px]">Quant.</th>

                  <th className="border  h-[30px]">Pr. Unit.</th>
                  <th className="border  h-[30px]">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {/* Linha de exemplo */}
                <tr>
                  <td className="border  h-[30px]"><input type="text" className="w-full h-full p-0 m-0 text-center" /></td>
                  <td className="border  h-[30px]"><input type="text" className="w-full h-full p-0 m-0 text-center" /></td>
                  {[...Array(16)].map((_, i) => (
                    <td key={i} className="border h-[30px]"><input type="text" className="w-full h-full p-0 m-0 text-center" /></td>
                  ))}
                  <td className="border  h-[30px]"><input type="text" className="w-full h-full p-0 m-0 text-center" /></td>

                  <td className="border  h-[30px]"><input type="text" className="w-full h-full p-0 m-0 text-center" /></td>
                  <td className="border  h-[30px]"><input type="text" className="w-full h-full p-0 m-0 text-center" /></td>
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
      </div>
    </div>
  );
}
