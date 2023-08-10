/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

'use client'

import React, { ReactNode } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

type InputTypeMoneyProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  placeholder: string
  label: string
  errors?: ReactNode
}

function InputTypeMoney<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  errors,
}: InputTypeMoneyProps<T>) {
  return (
    <div className="w-[100%]">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium  text-white"
      >
        {`${label} *`}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <NumericFormat
            placeholder={placeholder}
            allowLeadingZeros
            displayType="input"
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            allowNegative={false}
            decimalScale={2}
            {...field}
          />
        )}
      />
      {errors && <>{errors}</>}
    </div>
  )
}

export default InputTypeMoney
