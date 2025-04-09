import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...rest }: InputProps) {
  return (
    <div className='mx-2 my-1  bg-gray-50 border border-gray-300 rounded-2xl'>
      <label className='ml-2 text-sm text-gray-400 '>
        {label}
      </label>
      <input
        {...rest}
        className="w-full pl-2 outline-none text-gray-700 ml-2 pb-1"
      />
    </div>

  );
}
