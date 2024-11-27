'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useForgetPassword } from '@/hooks/entrys/useDeletedEntry/auth'
import { LogoutProps } from '@/services/auth/forgetPassword'
import { Input, Link } from '../../../components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, VStack, Text, useColorModeValue, Button } from '@chakra-ui/react'

const schema = z.object({
  email: z.string().email('Formato de')
})

export default function ForgetPassword() {
  const { onForgetPassword, isLoading } = useForgetPassword()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LogoutProps>({
    resolver: zodResolver(schema)
  })

  const textColor = useColorModeValue('gray.800', 'white')
  const secondaryTextColor = useColorModeValue('slate.300', 'gray.400')

  return (
    <form
      onSubmit={handleSubmit((values: LogoutProps) => onForgetPassword(values))}
    >
      <Box
        display="flex"
        flexDir="column"
        gap={6}
        w="100%"
        bg="gray.700"
        py={7}
        px={5}
        borderRadius="lg"
      >
        <VStack spacing={3} textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Esqueceu sua senha?
          </Text>
          <Text color={secondaryTextColor}>
            Não se preocupe! Insira o seu e-mail de cadastro e enviaremos
            instruções para você.
          </Text>
        </VStack>
        <Input
          label="Email"
          name="email"
          placeholder="exemplo@gmail.com"
          type="email"
          register={register}
          required
          errors={errors.email?.message}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          <Button
            isLoading={isLoading}
            loadingText="Enviando"
            type="submit"
            color="gray.600"
            textColor="white"
            w="full"
          >
            Criar
          </Button>
          <Box display="flex" gap={7}>
            <Link href="/" textDecor="underline">
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </form>
  )
}
