import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputProps as InputPropsChakra
} from '@chakra-ui/react'

export interface InputProps<T extends FieldValues> extends InputPropsChakra {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: string
  disabled?: boolean
}

export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  disabled,
  ...rest
}: InputProps<T>) {
  const { ref, ...field } = register(name)

  return (
    <FormControl isInvalid={!!errors}>
      <FormLabel htmlFor={name} mb="2" color="white" fontSize="sm">
        {required ? `${label} *` : label}
      </FormLabel>
      <ChakraInput
        id={name as string}
        ref={ref}
        disabled={disabled}
        variant={disabled ? 'filled' : 'outline'}
        placeholder={disabled ? 'Disabled' : undefined}
        borderColor="rgba(255, 255, 255, 0.24)"
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
