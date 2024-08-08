'use client'

import {
  Tooltip,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface InputTypeMoneyProps<T extends FieldValues>
  extends NumericFormatProps {
  control: Control<T>
  name: Path<T>
  placeholder: string
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
    <FormControl isInvalid={!!errors} w="100%">
      <FormLabel
        htmlFor={name}
        mb="2"
        color="white"
        fontSize="sm"
        display="flex"
        gap={0.5}
      >
        {required ? `${label} *` : label}
        {labelHint && (
          <Tooltip label={labelHint} fontSize="sm" hasArrow placement="top">
            <InfoOutlineIcon color="orange" />
          </Tooltip>
        )}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue} // Passando defaultValue para o Controller
        render={({ field }) => (
          <NumericFormat
            {...field}
            disabled={disabled}
            placeholder={placeholder}
            allowLeadingZeros
            displayType="input"
            type="text"
            customInput={Input} // Usando o Input do Chakra UI
            variant={disabled ? 'filled' : 'outline'}
            _disabled={{
              bg: 'gray.700',
              borderColor: 'gray.600',
              color: 'gray.300',
              cursor: 'not-allowed'
            }}
            _placeholder={{ color: 'gray.400' }}
            allowNegative={false}
            decimalScale={2}
            decimalSeparator=","
          />
        )}
      />
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  )
}

export default InputTypeMoney
