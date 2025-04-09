import Input from "@/app/component/Input";
import { useFormContext } from "react-hook-form";

export function CadastroCliente() {
  const {
    register,
  } = useFormContext();




  const fields = [
    { name: 'cnpj', label: 'CNPJ:', width: 'w-full' },
    { name: 'razaoSocial', label: 'Razão Social:', width: 'w-full' },
    { name: 'inscricaoEstadual', label: 'Inscrição Estadual:', width: 'w-full' },
    { name: 'endereco', label: 'Endereço:', width: 'w-full' },
    { name: 'municipio', label: 'Município:', width: 'w-[70%]' },
    { name: 'uf', label: 'UF:', width: 'w-[30%]' },
    { name: 'email', label: 'Email:', width: 'w-full' },
    { name: 'telefone', label: 'Telefone:', width: 'w-full' },
  ];

  return (
    <div
      className="flex flex-col"
    >
      <div className='flex flex-wrap '>

        {fields.map(field => {
          return (
            <div key={field.name} className={field.width}>
              <Input label={field.label} {...register(field.name)} />
            </div>
          )
        })}
      </div>
    </div>
  );
}