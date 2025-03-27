'use client';
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const AssinaturaDigital = ({
  title,
  setValue,
  name
}: {
  title: string;
  setValue: any
  name: string;
}) => {
  const sigRef = useRef<SignatureCanvas>(null);

  const limparAssinatura = () => {
    sigRef.current?.clear();
    setValue(name, "");
  };

  const capturarAssinatura = () => {
    const imagemBase64 = sigRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (imagemBase64) {
      setValue(name, imagemBase64);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h2>{title}</h2>
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        onEnd={capturarAssinatura}
        canvasProps={{ className: "border rounded-lg w-full md:w-[500px] h-[150px]" }}
      />
      <div className="flex gap-4 mt-2">
        <button type="button" onClick={limparAssinatura}>Limpar</button>
      </div>
    </div>
  );
};

export default AssinaturaDigital;
