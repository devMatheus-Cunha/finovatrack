import React, { InputHTMLAttributes, ReactNode } from 'react'

import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface INumberInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: ReactNode
}

export default function NumberInput<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  disabled,
  ...rest
}: INumberInputProps<T>) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-white"
      >
        {required ? `${label} *` : label}
      </label>
      <input
        id={name as string}
        disabled={disabled}
        className={
          disabled
            ? 'border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300 cursor-not-allowed'
            : 'border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-400 text-white'
        }
        {...register(name)}
        {...rest}
      />
      {errors && <>{errors}</>}
    </div>
  )
}
