'use client';

import { ReactNode } from 'react';
import { Header } from './component/Header';
import { FormStepPages } from './Steps';

export default function Page() {

  return (
    <WrapperStep>
      <FormStepPages />
    </WrapperStep>
  );
}


const WrapperStep = ({ children }: { children: ReactNode, contentHeader?: any, contentFooter?: any }) => {
  return (<div className='flex flex-col min-h-screen md:container mx-auto relative'>
    <Header />
    <main className='mt-16'>
      {children}
    </main>
    {/* {!contentFooter && (<footer className="bg-blue-700  absolute bottom-0  w-full h-16  shadow z-50 ">
      <div className='max-w-7xl mx-auto px-4 flex items-center h-full font-bold text-2xl tracking-wide'>
        Resumo do pedido: R$: 2000,00
      </div>
    </footer>)} */}

  </div>)
}

