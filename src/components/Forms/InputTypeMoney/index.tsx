'use client'

import { Box, Tooltip } from '@chakra-ui/react'
import { Info } from '@phosphor-icons/react'
import React, { ReactNode } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

type InputTypeMoneyProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  placeholder: string
  label: string
  errors?: ReactNode
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
    <div className="w-[100%]">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium  text-white"
      >
        <Box display="flex" gap={0.5}>
          {required ? `${label} *` : label}
          {!!labelHint && (
            <Tooltip label={labelHint} fontSize="sm" hasArrow placement="top">
              <Info size={16} color="orange" />
            </Tooltip>
          )}
        </Box>
      </label>
      <Controller
        control={control}
        name={name}
        disabled={disabled}
        render={({ field }) => (
          <NumericFormat
            disabled={disabled}
            placeholder={placeholder}
            allowLeadingZeros
            displayType="input"
            type="text"
            className={
              disabled
                ? 'border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300 cursor-not-allowed'
                : 'border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-400 text-white'
            }
            allowNegative={false}
            decimalScale={2}
            decimalSeparator=","
            {...field}
            defaultValue={defaultValue}
          />
        )}
      />
      {errors && <>{errors}</>}
    </div>
  )
}

export default InputTypeMoney
