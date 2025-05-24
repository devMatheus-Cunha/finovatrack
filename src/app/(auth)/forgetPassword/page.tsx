'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useForgetPassword } from '@/hooks/entrys/useDeletedEntry/auth'
import { LogoutProps } from '@/services/auth/forgetPassword'
import { Input, Link, Button } from '../../../components'
import { zodResolver } from '@hookform/resolvers/zod'

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

  return (
    <form
      onSubmit={handleSubmit((values: LogoutProps) => onForgetPassword(values))}
    >
      <div className="flex flex-col gap-6 w-full bg-[#2D3748] py-7 px-5 rounded-lg">
        <div className="flex flex-col space-y-3 text-center">
          <h2 className="text-2xl font-bold text-white">Esqueceu sua senha?</h2>
          <p className="text-gray-400">
            Não se preocupe! Insira o seu e-mail de cadastro e enviaremos
            instruções para você.
          </p>
        </div>

        <Input
          label="Email"
          name="email"
          placeholder="exemplo@gmail.com"
          type="email"
          register={register}
          required
          errors={errors.email?.message}
        />

        <div className="flex flex-col justify-center items-center gap-10">
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Enviando"
            type="submit"
          >
            Enviar
          </Button>
          <div className="flex gap-7">
            <Link href="/login" textDecor="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
