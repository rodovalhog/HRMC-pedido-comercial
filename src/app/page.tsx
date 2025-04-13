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


const WrapperStep = ({ children, contentHeader }: { children: ReactNode, contentHeader?: any, contentFooter?: any }) => {
  return (<div className='flex flex-col min-h-screen md:container mx-auto relative'>
    {!contentHeader && (<header className="bg-blue-700  w-full h-16  shadow ">
      <div className='max-w-7xl mx-auto px-4 flex items-center h-full font-bold text-2xl tracking-wide flex justify-center'>
        HRMC
      </div>
    </header>)}
    <main >
      {children}
    </main>
    {/* {!contentFooter && (<footer className="bg-blue-700  absolute bottom-0  w-full h-16  shadow z-50 h-[100px]">
      <div className='max-w-7xl mx-auto px-4 flex items-center h-full font-bold text-2xl tracking-wide'>
        Resumo do pedido: R$: 2000,00
      </div>
    </footer>)} */}

  </div>)
}

