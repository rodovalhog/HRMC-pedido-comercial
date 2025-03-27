// pages/pedido.tsx

import React from "react";
import FormularioCliente from "./component/form";

export default function Pedido() {
  const date = new Date()
  return (
    <div className="max-w-7xl mx-auto p-6 font-sans text-sm  w-[340px] md:w-full">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">PEDIDO : {date.toLocaleDateString()}</h1>

      {/* Informações do cliente */}
      <FormularioCliente />



    </div>
  );
}
