'use client'
// components/AssinaturaDigital.tsx
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const AssinaturaDigital = ({ title }: { title: string }) => {
  const sigRef = useRef<SignatureCanvas>(null);

  const limparAssinatura = () => {
    sigRef.current?.clear();
  };

  const salvarAssinatura = () => {
    const imagemBase64 = sigRef.current?.getTrimmedCanvas().toDataURL("image/png");
    console.log(imagemBase64);
    // Você pode salvar no backend ou enviar para API
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h2>{title}</h2>
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{ className: "border rounded-lg w-full md:w-[500px] h-[150px]" }}
      />
      <div className="flex gap-4 mt-2">
        <button onClick={limparAssinatura}>Limpar</button>
        <button onClick={salvarAssinatura}>Salvar</button>
      </div>
    </div>
  );
};

export default AssinaturaDigital;
