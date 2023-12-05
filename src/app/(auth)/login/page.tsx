'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { Button, Input, InputPassword } from '@/components'
import { useLogin } from '@/hooks/auth'
import { LoginProps } from '@/service/auth/login'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default function Login() {
  const router = useRouter()
  const { loginWithEmail, isLoading } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginProps>({
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
      onSubmit={handleSubmit((values: LoginProps) => loginWithEmail(values))}
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
        <div className="flex justify-center items-center flex-col gap-3">
          <InputPassword
            label="Password"
            name="password"
            placeholder="**********"
            register={register}
            required
            errors={
              <>
                {errors.password && (
                  <span className="text-red-500 text-sm ">
                    Este campo é obrigatório
                  </span>
                )}
              </>
            }
          />
          <div className="self-end">
            <Button
              type="button"
              variant="link"
              routeLink="/forgetPassword"
              onClick={() => router.push('/forgetPassword')}
            >
              Esqueceu a senha?
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center">
          <Button type="submit" variant="default700">
            <div className="flex gap-2 justify-center items-center">
              {isLoading ? 'Login...' : 'Login'}
            </div>
          </Button>
          <div className="flex gap-7">
            <Link
              href="/"
              className="text-white focus:outline-none font-medium rounded-lg text-sm bg-gray-800 underline"
            >
              Home
            </Link>
            <Button variant="link" routeLink="/signup">
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
