/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { EyeSlash, Eye } from '@phosphor-icons/react';
import {
  FieldValues, Path, RegisterOptions, UseFormRegister,
} from 'react-hook-form';

interface PasswordInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  errors?: ReactNode;
}

export default function InputPassword<T extends FieldValues>({
  label, name, register, rules, errors, ...rest
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[100%]">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {rules?.required ? `${label} *` : label}
      </label>
      <div className="relative">
        <input
          id={name as string}
          type={showPassword ? 'text' : 'password'}
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register(name, rules)}
          {...rest}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeSlash size={20} color="#eee2e2" />
          ) : (
            <Eye size={20} color="#eee2e2" />
          )}
        </button>
      </div>
      {
        errors && (
          <>
            {errors}
          </>
        )
      }
    </div>
  );
}
