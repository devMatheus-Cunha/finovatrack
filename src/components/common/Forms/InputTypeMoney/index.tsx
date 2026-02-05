'use client'

import React from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface InputTypeMoneyProps<T extends FieldValues>
  extends NumericFormatProps {
  control: Control<T>
  name: Path<T>
  placeholder?: string
  label: string
  errors?: string
  required?: boolean
  disabled?: boolean
  labelHint?: string
  defaultValue?: any
}

function InputTypeMoney<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  errors,
  required,
  disabled,
  labelHint,
  defaultValue
}: InputTypeMoneyProps<T>) {
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
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <NumericFormat
            {...field}
            disabled={disabled}
            placeholder={placeholder}
            allowLeadingZeros
            displayType="input"
            type="text"
            className={`w-full px-3 py-2 bg-transparent border rounded-md border-[#4A5568] text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 placeholder-gray-400 appearance-none ${
              disabled
                ? 'bg-gray-700 border-gray-600/50  text-gray-300 cursor-not-allowed'
                : 'hover:border-blue-500'
            }`}
            allowNegative={false}
            decimalScale={2}
            decimalSeparator=","
          />
        )}
      />
      {errors && <div className="mt-1 text-sm text-red-500">{errors}</div>}
    </div>
  )
}

export default InputTypeMoney
