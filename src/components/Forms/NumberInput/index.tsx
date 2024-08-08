import React, { ReactNode } from 'react'
import {
  Input,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface NumberInputProps<T extends FieldValues> extends InputProps {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: ReactNode
  disabled?: boolean
}

export default function NumberInput<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  disabled,
  ...rest
}: NumberInputProps<T>) {
  const { ref, ...field } = register(name)

  return (
    <FormControl isInvalid={!!errors} w="100%">
      <FormLabel htmlFor={name} mb="2" color="white" fontSize="sm">
        {required ? `${label} *` : label}
      </FormLabel>
      <Input
        id={name as string}
        type="number" // Definindo o tipo do input como "number"
        ref={ref}
        disabled={disabled}
        variant={disabled ? 'filled' : 'outline'}
        placeholder={disabled ? 'Disabled' : undefined}
        _disabled={{
          bg: 'gray.700',
          borderColor: 'gray.600',
          color: 'gray.300',
          cursor: 'not-allowed'
        }}
        _placeholder={{ color: 'gray.400' }}
        {...field}
        {...rest}
      />
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  )
}
