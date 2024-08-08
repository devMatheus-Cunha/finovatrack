'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input, InputPassword, Link, Logo } from '@/components'
import { useLogin } from '@/hooks/auth'
import { LoginProps } from '@/services/auth/login'
import { Box, Button, Flex } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .email({
      message: 'E-mail invalido'
    }),
  password: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(6, 'Minimo de 6 caracteres')
})

export default function Login() {
  const { loginWithEmail, isLoading } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginProps>({
    resolver: zodResolver(schema)
  })

  return (
    <Flex
      height="100vh"
      justify="center"
      align="center"
      direction="column"
      w="100%"
      gap={6}
    >
      <Logo fontSize="2xl" />
      <Box width={{ base: '95%', lg: '55%', xl: '36%' }}>
        <form
          onSubmit={handleSubmit((values: LoginProps) =>
            loginWithEmail(values)
          )}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={6}
            width="100%"
            bg="gray.700"
            py={7}
            px={5}
            rounded="lg"
          >
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
              alignItems="center"
              gap={3}
            >
              <InputPassword
                label="Password"
                name="password"
                placeholder="**********"
                register={register}
                required
                errors={errors?.password?.message}
              />
              <Flex alignSelf="flex-end">
                <Link textDecor="underline" href="/forgetPassword">
                  Esqueceu a senha?
                </Link>
              </Flex>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={10}
            >
              <Button
                isLoading={isLoading}
                loadingText="Entrando"
                type="submit"
                color="gray.600"
                textColor="white"
                w="full"
              >
                Entrar
              </Button>
              <Box display="flex" gap={7}>
                <Link href="/" textDecor="underline">
                  Home
                </Link>
                <Link href="/signup" textDecor="underline">
                  Criar Conta
                </Link>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Flex>
  )
}
