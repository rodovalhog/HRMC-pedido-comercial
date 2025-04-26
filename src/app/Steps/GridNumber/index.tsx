

'use client';

import { Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const tamanhos = {
  infantil: [28, 29, 30, 31, 30, 33],
  adulto: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
};

export function GradeNumeracao() {
  const {
    register,
    control,
    watch,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'produtos',
  });

  const produtos = watch('produtos') || [];

  const addGrade = (tipo: 'infantil' | 'adulto') => {
    append({
      tipo,
      modelo: '',
      cor: '',
      valor: '',
      quantidades: {},
    });
  };

  return (
    <div className=" p-2 bg-white mb-12">
      <h1 className="text-xl font-bold mb-4 text-black">Adicione a Grade de Numeração</h1>

      {fields.map((grade: any, index) => {
        const quantidades = produtos?.[index]?.quantidades || {};
        const total = Object.values(quantidades || {}).reduce((sum: number, q: any) => sum + Number(q || 0), 0);
        const valorUnitario = Number(produtos?.[index]?.valor || 0);
        const valorTotal = total * valorUnitario;

        return (
          <div
            key={grade.id}
            className="mb-8 border rounded-lg p-4 relative shadow-sm"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-gray-500 font-bold"
            >
              <Trash2 />
            </button>

            <h2 className="font-semibold mb-2 capitalize text-blue-800">
              Grade {index + 1} - {grade?.tipo}
            </h2>

            <input
              type="hidden"
              {...register(`produtos.${index}.tipo`)}
              value={grade.tipo}
            />

            <div className="flex flex-wrap gap-2 mb-4 text-black">
              <div className='flex flex-col w-[30%] '>
                Modelo:
                <input
                  type="text"
                  placeholder="Modelo:"
                  className="flex-1 border p-3 rounded-md w-full"
                  {...register(`produtos.${index}.modelo`)}
                />
              </div>
              <div className='flex flex-col w-[30%]'>
                Cor:
                <input
                  type="text"
                  placeholder="Cor:"
                  className="flex-1 border p-3 rounded-md w-full"
                  {...register(`produtos.${index}.cor`)}
                />
              </div>
              <div className='flex flex-col w-[30%]'>
                Preço:
                <input
                  type="number"
                  placeholder="Valor"
                  className="w-[100px] border p-3 rounded-md text-right w-full"
                  {...register(`produtos.${index}.valor`, { valueAsNumber: true })}
                />
              </div>

            </div>

            <div className="grid grid-cols-4 gap-2 mb-4 text-black">
              {tamanhos[grade.tipo as 'infantil' | 'adulto'].map((num, key) => (
                <div key={key} className="flex flex-col items-center">
                  <div className="bg-blue-500 flex w-full justify-center border rounded-md mb-1">
                    <label className="text-sm font-medium mb-1 text-white">
                      {num}
                    </label>
                  </div>
                  <input
                    type="number"
                    min={0}
                    defaultValue={quantidades?.[num] || ''}
                    {...register(`produtos.${index}.quantidades.${num}`, {
                      valueAsNumber: true,
                    })}
                    className="w-full border rounded-md p-2 text-center"
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-600 text-white text-lg font-semibold p-3 flex justify-between rounded-md">
              <span>Qtn: {total}</span>
              <span>R$ {valorTotal.toFixed(2)}</span>
            </div>
          </div>
        );
      })}

      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => addGrade('infantil')}
          className="flex-1 p-3 rounded-md text-white font-bold bg-cyan-600"
        >
          Infantil +
        </button>
        <button
          type="button"
          onClick={() => addGrade('adulto')}
          className="flex-1 p-3 rounded-md text-white font-bold bg-blue-700"
        >
          Adulto +
        </button>
      </div>
    </div>
  );
}
