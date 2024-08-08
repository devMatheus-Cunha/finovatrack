'use client'

import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import {
  Input as ChakraPasswordInput,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  InputProps as InputPropsChakra
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface PasswordInputProps<T extends FieldValues> extends InputPropsChakra {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  errors?: string
}

export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  required,
  errors,
  ...rest
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const { ref, ...field } = register(name)

  const handleToggleVisibility = () => setShowPassword(!showPassword)

  return (
    <FormControl isInvalid={!!errors}>
      <FormLabel htmlFor={name} mb="2" color="white" fontSize="sm">
        {required ? `${label} *` : label}
      </FormLabel>
      <InputGroup size="md">
        <ChakraPasswordInput
          id={name as string}
          pr="4.5rem"
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          _placeholder={{ color: 'gray.400' }}
          {...field}
          {...rest}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            h="1.75rem"
            size="sm"
            bg="transparent"
            onClick={handleToggleVisibility}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            _hover={{
              background: 'transparent'
            }}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  )
}
