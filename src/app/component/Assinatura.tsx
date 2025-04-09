// 'use client';
// import SignatureCanvas from "react-signature-canvas";

// import React, { useRef } from "react";

// const AssinaturaDigital = ({
//   title,
//   setValue,
//   name,
//   register
// }: {
//   title: string;
//   setValue: any
//   name: string;
//   register: any
// }) => {
//   const sigRef = useRef<SignatureCanvas>(null);

//   const limparAssinatura = () => {

//     console.log("sigRef", sigRef)
//     sigRef.current?.clear();
//     setValue(name, "");
//   };

//   const capturarAssinatura = () => {
//     console.log("sigRef", sigRef)
//     if (sigRef.current && !sigRef.current.isEmpty()) {
//       const imagemBase64 = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
//       setValue(name, imagemBase64);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <h2>{title}</h2>
//       <SignatureCanvas
//         {...register}
//         ref={sigRef}
//         penColor="black"
//         onEnd={capturarAssinatura}
//         canvasProps={{ className: "border rounded-lg w-full md:w-[500px] h-[150px]" }}
//       />
//       <div className="flex gap-4 mt-2">
//         <button type="button" onClick={limparAssinatura}>Limpar</button>
//       </div>
//     </div>
//   );
// };

// export default AssinaturaDigital;


'use client';

import SignatureCanvas from "react-signature-canvas";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

type AssinaturaDigitalProps = {
  title: string;
  name: string;
};

const AssinaturaDigital = ({ title, name }: AssinaturaDigitalProps) => {
  const { setValue, register, watch } = useFormContext();
  const sigRef = useRef<SignatureCanvas>(null);

  const limparAssinatura = () => {
    sigRef.current?.clear();
    setValue(name, "");
  };

  const capturarAssinatura = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const imagemBase64 = sigRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setValue(name, imagemBase64, { shouldValidate: true });
    }
  };

  const imagemSalva = watch(name);

  return (
    <div className="flex flex-col items-center gap-2 w-full text-black">
      <h2 className="font-bold text-lg">{title}</h2>

      <input type="hidden" {...register(name)} />

      {!imagemSalva && <SignatureCanvas
        ref={sigRef}
        penColor="black"
        onEnd={capturarAssinatura}
        canvasProps={{
          className: "border rounded-lg w-full md:w-[500px] h-[60vh] ",
        }}
      />
      }
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={limparAssinatura}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Limpar
        </button>
      </div>

      {imagemSalva && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700">Preview:</h3>
          <Image
            src={imagemSalva}
            alt="Assinatura"
            width={300}
            height={200} // ajuste conforme necessário
            className="border mt-1 max-w-[300px] rounded shadow w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default AssinaturaDigital;
