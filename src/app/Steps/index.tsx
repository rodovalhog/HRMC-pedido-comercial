
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { gerarPDF } from '../component/gerarPedidoPdf';
import { AssinaturaClient } from './AssinaturaClient';
import { AssinaturaRepresentante } from './AssinaturaRepresentante';
import { PaymentForm } from './CondicaoPagamento';
import { GradeNumeracao } from './GridNumber';
import { CadastroCliente } from './RegisterClient';
import ResumoPedido from './Resumo';
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
    6: <AssinaturaRepresentante />,
    7: <ResumoPedido />
  }

  const lastStep = currentStep === 7
  const labelLastStep = lastStep ? "Gerar Pedido" : "Continuar"
  const dados = methods.watch()
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4 flex flex-col justify-between ">
        {steps[currentStep] ?? <p className='text-red-600'>Não tem mais etapa</p>}

        <div className="bg-white p-4 shadow-md z-10 absolute bottom-0 left-0 w-full">
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
                lastStep ? gerarPDF(dados) : nextStep()
              }}
              className={`flex-1 text-white p-3 rounded-md font-bold ${lastStep ? 'bg-blue-400' : 'bg-green-500'}`}>
              <p className='flex  justify-center'>{labelLastStep}
                <ArrowRight />
              </p>
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

