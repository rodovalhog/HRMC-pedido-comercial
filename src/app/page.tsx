'use client';

import { ReactNode } from 'react';
import { FormStepPages } from './Steps';

export default function Page() {

  return (
    <WrapperStep>
      <FormStepPages />
    </WrapperStep>
  );
}


const WrapperStep = ({ children, contentHeader, contentFooter }: { children: ReactNode, contentHeader?: any, contentFooter?: any }) => {
  return (<div className='flex flex-col min-h-screen md:container mx-auto'>
    {!contentHeader && (<header className="bg-blue-700  fixed top-0 left-0 w-full h-16  shadow z-50 h-[100px]">
      <div className='max-w-7xl mx-auto px-4 flex items-center h-full font-bold text-2xl tracking-wide'>
        CNPJ: 00.394.460/0058-79
        Razão Social: Varejista LTDA
      </div>
    </header>)}
    <main className="py-[100px]">
      {children}
    </main>
    {!contentFooter && (<footer className="bg-blue-700  fixed bottom-0 left-0 w-full h-16  shadow z-50 h-[100px]">
      <div className='max-w-7xl mx-auto px-4 flex items-center h-full font-bold text-2xl tracking-wide'>
        Resumo do pedido: R$: 2000,00
      </div>
    </footer>)}

  </div>)
}