/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

'use client'

import { ReactNode } from 'react'
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

interface SelectFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  rules?: RegisterOptions<T>
  options: {
    label: string
    value: string
  }[]
  register: UseFormRegister<T>
  errors?: ReactNode
}

export default function Select<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  rules,
}: SelectFieldProps<T>) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium  text-white"
      >
        {rules?.required ? `${label} *` : label}
      </label>
      <select
        id={name as string}
        {...register(name, rules)}
        className="bg-gray-50 border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected>
          Escolha opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && <>{errors}</>}
    </div>
  )
}
