import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AssinaturaClient } from './AssinaturaClient';
import { AssinaturaRepresentante } from './AssinaturaRepresentante';
import { PaymentForm } from './CondicaoPagamento';
import { GradeNumeracao } from './GridNumber';
import { CadastroCliente } from './RegisterClient';
import { UploadImageLogo } from './UploadImageLogo';


type FormValues = {
  observacoes: string;
};

export const FormStepPages = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const methods = useForm<FormValues>({
    defaultValues: {
      observacoes: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Dados enviados:', data);
  };
  const nextStep = () => {
    setCurrentStep(step => {
      // if (step == 4) return 3

      return (step + 1)
    })
  }

  const backStep = () => {
    setCurrentStep(step => {
      if (step == 1) return 1
      return (step - 1)
    })
  }

  const steps: Record<number, ReactNode> = {
    1: <CadastroCliente />,
    2: <GradeNumeracao />,
    3: <PaymentForm />,
    4: <UploadImageLogo />,
    5: <AssinaturaClient />,
    6: <AssinaturaRepresentante />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4 flex flex-col justify-between ">
        {steps[currentStep] ?? <p className='text-red-600'>Não tem mais etapa</p>}

        <div className="fixed bottom-[110px] left-0 right-0 bg-white p-4 shadow-md z-10">
          <div className="flex gap-4">
            {currentStep !== 1 && <button

              type="button"
              onClick={() => {
                backStep()
              }}
              className="flex-1 bg-yellow-500 text-white p-3 rounded-md font-bold">
              <p className='flex gap-4 justify-center'>
                <ArrowLeft />
                Voltar

              </p>
            </button>}
            <button
              type="button"
              onClick={() => {
                nextStep()
              }}
              className="flex-1 bg-green-500 text-white p-3 rounded-md font-bold">
              <p className='flex gap-4  justify-center'>Continuar
                <ArrowRight />


              </p>
            </button>
          </div>
        </div>

        {/* <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          Continuar
        </button> */}
      </form>
    </FormProvider>
  );
};

