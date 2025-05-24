'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigingProps } from '@/services/auth/siging'
import { useSignUp } from '../../../hooks/entrys/useDeletedEntry/auth'
import { Input, InputPassword, Link, Select, Button } from '@/components'
import {
  dropdownOptionsCurrency,
  dropdownOptionsCurrencyHybrid,
  schema
} from './utils'

export default function Signup() {
  const { isLoading, createAccountUser } = useSignUp()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SigingProps>({
    resolver: zodResolver(schema)
  })

  return (
    <form
      onSubmit={handleSubmit((values: SigingProps) =>
        createAccountUser(values)
      )}
    >
      <div className="flex flex-col gap-6 w-full bg-[#2D3748] py-5 px-5 rounded-lg">
        <div className="flex gap-6">
          <Input
            label="Nome"
            name="name"
            placeholder="Pedro..."
            type="text"
            required
            register={register}
            errors={errors?.name?.message}
          />
          <Input
            label="Email"
            name="email"
            placeholder="teste@gmail.com"
            type="email"
            required
            register={register}
            errors={errors?.email?.message}
          />
        </div>
        <div className="flex gap-6">
          <InputPassword
            label="Password"
            name="password"
            required
            placeholder="**********"
            register={register}
            errors={errors?.password?.message}
          />
          <InputPassword
            label="Confirmar Password"
            name="confirmPassword"
            required
            placeholder="**********"
            register={register}
            errors={errors?.confirmPassword?.message}
          />
        </div>

        <Select
          label="Selecione moeda da conta"
          name="typeAccount"
          register={register}
          isRequired
          options={dropdownOptionsCurrency}
          placeholder="Selecione uma moeda"
          errors={errors.typeAccount?.message}
          isDisabled={watch().typeAccount === 'hybrid'}
        />

        {watch().typeAccount === 'hybrid' && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-6">
              <Select
                label="Selecione moeda primária *"
                name="secondary_currency"
                register={register}
                isRequired
                options={dropdownOptionsCurrencyHybrid}
                placeholder="Selecione uma moeda"
                errors={errors.primary_currency?.message}
              />
              <Select
                label="Selecione moeda secundária"
                name="secondary_currency"
                register={register}
                options={dropdownOptionsCurrencyHybrid}
                placeholder="Selecione uma moeda"
                errors={errors.secondary_currency?.message}
              />
            </div>
            <div className="p-4 text-sm bg-yellow-300 bg-opacity-75 text-gray-900 rounded-lg">
              <strong>
                Exemplo: BRL (Moeda Primária) / EUR (Moeda Secundária)
              </strong>
              <br />
              As entradas serão feitas utilizando a moeda principal escolhida.
              Você poderá adicionar gastos tanto em BRL quanto em EUR e
              visualizar o total de gastos separadamente em cada uma dessas
              moedas. Além disso, o valor total de gastos em EUR será
              automaticamente convertido para a moeda principal, utilizando a
              taxa de câmbio do dia. Você também poderá visualizar o valor total
              de gastos completo em BRL, somando os gastos em EUR e BRL.
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-10">
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Criando"
            type="submit"
          >
            Criar
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
