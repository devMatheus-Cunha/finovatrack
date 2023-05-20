/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

'use client';

import {
  FieldValues, Path, RegisterOptions, UseFormRegister,
} from 'react-hook-form';
import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  errors?: ReactNode;
}

export default function Input<T extends FieldValues>({
  label, name, register, rules, errors, disabled, ...rest
}: InputProps<T>) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">
        {rules?.required ? `${label} *` : label}
      </label>
      <input
        id={name as string}
        disabled={disabled}
        {...register(name, rules)}
        className={disabled
          ? 'border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300 cursor-not-allowed'
          : 'border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-400 text-white'}
        {...rest}
      />
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
