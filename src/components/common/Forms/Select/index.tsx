'use client'

import React from 'react'
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister
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
  errors?: any
  className?: string
  isDisabled?: boolean
  placeholder?: string
  isRequired?: boolean
  labelHint?: string
  [key: string]: any
}

export default function Select<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  rules,
  isDisabled,
  placeholder,
  isRequired,
  className,
  labelHint,
  ...props
}: SelectFieldProps<T>) {
  return (
    <div className="w-full">
      <label
        htmlFor={name as string}
        className="mb-2 text-sm font-medium text-white gap-1 items-center"
      >
        {isRequired ? `${label} *` : label}
        {labelHint && (
          <span className="text-orange-400 cursor-pointer" title={labelHint}>
            <svg
              className="w-4 h-4 inline"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
        )}
      </label>
      <div className="relative">
        <select
          id={name as string}
          {...register(name, rules)}
          disabled={isDisabled}
          className={`w-full px-3 curs py-2 border rounded-md focus:outline-none transition-colors duration-150 appearance-none bg-gray-700 border-[#4A5568] hover:bg-gray-700/50 text-white focus:ring-1 ${className || ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map(({ value, disabled, label, selected }) => (
            <option
              key={value}
              value={value}
              disabled={disabled}
              selected={selected}
              className={disabled ? 'text-gray-400' : ''}
            >
              {label}
            </option>
          ))}
        </select>
        <span
          className={`pointer-events-none absolute inset-y-0 right-3 flex items-center ${isDisabled ? 'text-gray-500' : 'text-gray-400'}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      {errors && <div className="mt-1 text-sm text-red-500">{errors}</div>}
    </div>
  )
}
