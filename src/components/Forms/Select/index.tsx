'use client'

import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react'
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

interface SelectFieldProps<T extends FieldValues> extends ChakraSelectProps {
  label: string
  name: Path<T>
  rules?: RegisterOptions<T>
  options: OptionsType
  register: UseFormRegister<T>
  errors?: any
  className?: string
  disabledSelect?: boolean
  placeholder?: string
}

export default function Select<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  rules,
  disabledSelect,
  placeholder,
  ...props
}: SelectFieldProps<T>) {
  return (
    <FormControl isInvalid={!!errors} w="100%">
      <FormLabel
        htmlFor={name as string}
        fontSize="sm"
        fontWeight="medium"
        color="white"
      >
        {props.isRequired ? `${label} *` : label}
      </FormLabel>
      <ChakraSelect
        id={name as string}
        placeholder={placeholder}
        isDisabled={disabledSelect}
        {...props}
        color="white"
        bg="gray.700"
        borderColor="gray.600"
        _hover={{ borderColor: 'blue.500' }}
        _focus={{ borderColor: 'blue.500' }}
        _disabled={{
          bg: 'gray.700',
          borderColor: 'gray.600',
          color: 'gray.300',
          cursor: 'not-allowed'
        }}
        {...register(name, rules)}
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
      </ChakraSelect>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  )
}
