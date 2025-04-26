'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { Observation } from '../Observation';

type Props = {
  name?: string;
};

export function UploadImageLogo({ name = 'imageLogoClient' }: Props) {
  const { setValue, register, watch } = useFormContext();
  const base64Image = watch(name); // observa o valor do campo

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setValue(name, base64, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>

      <div className="flex flex-col items-center gap-4 p-4 border rounded-md bg-white text-black">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded-md"
        />
        <input type="hidden" {...register(name)} />

        {base64Image && (
          <div className="flex flex-col items-center">
            <Image
              src={base64Image}
              alt="Preview"
              width={200}
              height={200}
              unoptimized
              className="rounded-md shadow-md"
            />
          </div>
        )}

      </div>
      <Observation name='observacoesLogo' />,

    </>
  );
}
