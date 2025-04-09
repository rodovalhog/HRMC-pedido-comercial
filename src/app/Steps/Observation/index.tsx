'use client'
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
}


export const Observation: React.FC<TextAreaProps> = ({
  name,
  label = 'Observações',
  placeholder = 'Digite aqui...',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col mb-4 text-black mt-8">
      <label htmlFor={name} className="text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className={`border rounded-xl p-3 min-h-[120px] resize-none focus:outline-none focus:ring-2 ${errors[name]
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-400 focus:ring-blue-500'
          }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

