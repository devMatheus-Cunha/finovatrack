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

export type OptionsType = {
  label: string
  value: string
  selected?: boolean
  disabled?: boolean
}[]

interface SelectFieldProps<T extends FieldValues> {
  label: string
  name: Path<T>
  rules?: RegisterOptions<T>
  options: OptionsType
  register: UseFormRegister<T>
  errors?: ReactNode
  className?: string
  disabledSelect?: boolean
}

export default function Select<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  rules,
  className,
  disabledSelect,
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
        disabled={disabledSelect}
        className={
          className ||
          'border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
        }
      >
        {options.map(({ value, disabled, label, selected }) => (
          <option
            key={value}
            value={value}
            disabled={disabled}
            selected={selected}
          >
            {label}
          </option>
        ))}
      </select>
      {errors && <>{errors}</>}
    </div>
  )
}
