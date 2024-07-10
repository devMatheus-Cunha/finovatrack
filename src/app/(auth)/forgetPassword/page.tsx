'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { useForgetPassword } from '@/hooks/auth'
import { LogoutProps } from '@/services/auth/forgetPassword'
import { Button, Input } from '../../../components'

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
    resolver: async (data) => {
      try {
        schema.parse(data)
        return { values: data, errors: {} }
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors }
        }
        return { values: {}, errors: { [error.path[0]]: error.message } }
      }
    }
  })

  return (
    <form
      onSubmit={handleSubmit((values: LogoutProps) => onForgetPassword(values))}
    >
      <div
        className="
          flex
          flex-col
          gap-6
          w-[100%]
          bg-gray-800
          py-7
          px-5
          rounded-lg
        "
      >
        <div className="flex flex-col gap-3 text-center">
          <p className="text-2xl  font-bold">Esqueceu sua senha?</p>
          <p className="text-slate-300">
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
          errors={
            <>
              {errors.email && (
                <span className="text-red-500 text-sm ">
                  Este campo é obrigatório
                </span>
              )}
            </>
          }
        />

        <div className="flex flex-col gap-10 justify-center items-center">
          <Button type="submit" variant="default700">
            <div className="flex gap-2 justify-center items-center">
              {isLoading ? 'Enviar...' : 'Enviar'}
            </div>
          </Button>
          <Button variant="link" routeLink="/login">
            Voltar
          </Button>
        </div>
      </div>
    </form>
  )
}
