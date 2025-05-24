'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input, InputPassword, Link, Button } from '@/components'
import { useLogin } from '@/hooks/entrys/useDeletedEntry/auth'
import { LoginProps } from '@/services/auth/login'
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
    <form
      onSubmit={handleSubmit((values: LoginProps) => loginWithEmail(values))}
    >
      <div className="flex flex-col gap-6 w-full bg-[#2D3748] py-7 px-5 rounded-lg">
        <Input
          label="Email"
          name="email"
          placeholder="exemplo@gmail.com"
          type="email"
          register={register}
          required
          errors={errors.email?.message}
        />
        <div className="flex flex-col items-center gap-3">
          <InputPassword
            label="Password"
            name="password"
            placeholder="**********"
            register={register}
            required
            errors={errors?.password?.message}
          />
          <div className="self-end">
            <Link textDecor="underline" href="/forgetPassword">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Entrando"
            type="submit"
          >
            Entrar
          </Button>
          <div className="flex gap-7">
            <Link href="/signup" textDecor="underline">
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
