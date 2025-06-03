'use client'

import React, { ReactNode } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface NumberInputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: ReactNode | string
  disabled?: boolean
  placeholder?: string
  labelHint?: string
  className?: string
  [key: string]: any
}

export default function NumberInput<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  disabled,
  placeholder,
  labelHint,
  className,
  ...rest
}: NumberInputProps<T>) {
  const { ref, ...field } = register(name)

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2 text-sm font-medium text-white block flex gap-1 items-center"
      >
        {required ? `${label} *` : label}
        {labelHint && (
          <span className="text-orange-400 cursor-pointer" title={labelHint}>
            {/* Info icon SVG inline */}
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
      <input
        id={name as string}
        type="number"
        ref={ref}
        disabled={disabled}
        placeholder={disabled ? 'Disabled' : placeholder}
        className={`w-full px-3 py-2 bg-transparent border rounded-md border-[#4A5568] text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors duration-150 appearance-none ${
          disabled
            ? 'bg-gray-700 border-gray-600/50  text-gray-300 cursor-not-allowed'
            : 'hover:border-blue-500'
        } ${className || ''}`}
        {...field}
        {...rest}
      />
      {errors && <div className="mt-1 text-sm text-red-500">{errors}</div>}
    </div>
  )
}
