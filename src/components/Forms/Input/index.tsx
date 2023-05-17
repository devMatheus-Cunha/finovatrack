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
  label, name, register, rules, errors, ...rest
}: InputProps<T>) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2 text-sm font-medium dark:text-white">
        {rules?.required ? `${label} *` : label}
      </label>
      <input
        id={name as string}
        {...register(name, rules)}
        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
