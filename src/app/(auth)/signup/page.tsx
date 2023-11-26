/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigingProps } from '@/service/auth/siging'
import Link from 'next/link'
import { useSignUp } from '../../../hooks/auth'
import { Button, Input, InputPassword } from '../../../components'
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
      <div
        className="
          flex
          flex-col
          gap-6
          w-[100%]
          bg-gray-800
          py-5
          px-5
          rounded-lg
        "
      >
        <div className="flex gap-6">
          <Input
            label="Nome"
            name="name"
            placeholder="Pedro..."
            type="text"
            required
            register={register}
            errors={
              <>
                {errors.name && (
                  <span className="text-red-500 text-sm ">
                    {errors.name.message}
                  </span>
                )}
              </>
            }
          />
          <Input
            label="Email"
            name="email"
            placeholder="teste@gmail.com"
            type="email"
            required
            register={register}
            errors={
              <>
                {errors.email && (
                  <span className="text-red-500 text-sm ">
                    {errors.email.message}
                  </span>
                )}
              </>
            }
          />
        </div>
        <div className="flex gap-6">
          <InputPassword
            label="Password"
            name="password"
            required
            placeholder="**********"
            register={register}
            errors={
              <>
                {errors.password && (
                  <span className="text-red-500 text-sm ">
                    {errors.password.message}
                  </span>
                )}
              </>
            }
          />
          <InputPassword
            label="Confirmar Password"
            name="confirmPassword"
            required
            placeholder="**********"
            register={register}
            errors={
              <>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm ">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </>
            }
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="typeAccount"
            className="block mb-2 text-sm font-medium text-white"
          >
            Selecione moeda da conta *
          </label>
          <select
            id="typeAccount"
            {...register('typeAccount')}
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-400 text-white"
          >
            {dropdownOptionsCurrency.map(
              ({ value, disabled, label, selected }) => (
                <option
                  key={value}
                  value={value}
                  disabled={disabled}
                  selected={selected}
                >
                  {label}
                </option>
              )
            )}
          </select>
          {errors.typeAccount && (
            <span className="text-red-500 text-sm">
              {errors.typeAccount.message}
            </span>
          )}
        </div>
        {watch().typeAccount === 'hybrid' && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-6">
              <div className="w-full">
                <label
                  htmlFor="primary_currency"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Selecione moeda primária *
                </label>
                <select
                  id="primary_currency"
                  {...register('primary_currency')}
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-400 text-white"
                >
                  {dropdownOptionsCurrencyHybrid.map(
                    ({ value, disabled, label, selected }) => (
                      <option
                        key={value}
                        value={value}
                        disabled={disabled}
                        selected={selected}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>
                {errors.primary_currency && (
                  <span className="text-red-500 text-sm ">
                    {errors.primary_currency.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="secondary_currency"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Selecione moeda secundária *
                </label>
                <select
                  id="secondary_currency"
                  {...register('secondary_currency')}
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-400 text-white"
                >
                  {dropdownOptionsCurrencyHybrid.map(
                    ({ value, disabled, label, selected }) => (
                      <option
                        key={value}
                        value={value}
                        disabled={disabled}
                        selected={selected}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>
                {errors.secondary_currency && (
                  <span className="text-red-500 text-sm ">
                    {errors.secondary_currency.message}
                  </span>
                )}
              </div>
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

        <div className="flex flex-col gap-7 justify-center items-center">
          <Button type="submit" variant="default700">
            <div className="flex gap-2 justify-center items-center">
              {isLoading ? 'Criando...' : 'Criar'}
            </div>
          </Button>
          <div className="flex gap-7">
            <Link
              href="/"
              className="text-white bg-gray-800 focus:outline-none font-medium rounded-lg text-sm bg-gray-800 underline"
            >
              Home
            </Link>
            <Button variant="link" routeLink="/login">
              Login
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
