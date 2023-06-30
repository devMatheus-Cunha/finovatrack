/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import { useState } from 'react'
import { useUserData } from '@/hooks/globalStates'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import useUpdatedUser from '@/hooks/myProfile/useUpdatedUser'

import { Button, Select } from '@/components'
import { dropdownOptionsCurrencyHybrid } from '@/app/(auth)/signup/utils'
import EditableField from './parts/EditableField'

type FormValues = {
  email?: string
  name?: string
}

type FormValuesCurrencys = {
  primary_currency: string
  secondary_currency: string
}

const schemaName = z.object({
  name: z.string().optional(),
})

const schemaEmail = z.object({
  email: z.string().email('Email inválido'),
})

const schemaTypeAccount = z
  .object({
    primary_currency: z.string().optional(),
    secondary_currency: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.primary_currency !== data.secondary_currency
    },
    {
      message: 'A moeda primária e a secundária não podem ter a mesma seleção',
      path: ['secondary_currency'],
    },
  )

function MyProfile() {
  const { userData } = useUserData()
  const { updatedUserData } = useUpdatedUser()

  const [optionsCurrencyEnabled, setOptionsCurrencyEnabled] = useState(false)

  const {
    register: registerName,
    handleSubmit: onSubmitName,
    reset: resetName,
    formState: { errors: errorsName },
  } = useForm({
    defaultValues: { name: userData.name },
    resolver: zodResolver(schemaName),
  })
  const {
    register: registerEmail,
    handleSubmit: onSubmitEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail },
  } = useForm<{ email: string | undefined }>({
    defaultValues: {
      email: userData.email,
    },
    resolver: zodResolver(schemaEmail),
  })

  const {
    register: registerCurrencys,
    handleSubmit: onSubmitCurrencys,
    reset: resetTypeAccount,
    formState: { errors },
  } = useForm({
    defaultValues: {
      primary_currency: userData.primary_currency,
      secondary_currency: userData.secondary_currency,
    },
    resolver: zodResolver(schemaTypeAccount),
  })

  const handleOptionsCurrencyEnabled = () => {
    setOptionsCurrencyEnabled(false)
    resetTypeAccount()
  }

  const handleSubmit = (fieldName: 'email' | 'name', values: FormValues) => {
    if (values[fieldName] === userData[fieldName]) return
    updatedUserData(values)
  }

  const updatedCurrencys = async (values: FormValuesCurrencys) => {
    if (
      values.primary_currency === userData.primary_currency &&
      values.secondary_currency === userData.secondary_currency
    ) {
      setOptionsCurrencyEnabled(false)
      return
    }
    updatedUserData(values)
    setOptionsCurrencyEnabled(false)
  }

  return (
    <main className="flex w-[100%] justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-6 w-[550px] p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Olá {userData.name}
          </h1>
          <p className="text-gray-300">
            Aqui você pode visualizar e alterar as informações do seu perfil de
            forma simples e fácil.
          </p>
        </div>

        <EditableField
          label="Nome"
          name="name"
          placeholder="Pedro..."
          type="text"
          onCancel={() => resetName()}
          onSubmit={onSubmitName((value) => handleSubmit('name', value))}
          register={registerName as any}
          required
          errors={
            <>
              {errorsName.name && (
                <span className="text-red-500 text-sm">
                  Este campo é obrigatório
                </span>
              )}
            </>
          }
        />
        <EditableField
          label="Email"
          name="email"
          placeholder="teste@gmail.com"
          type="email"
          onCancel={() => resetEmail()}
          onSubmit={onSubmitEmail((value) => handleSubmit('email', value))}
          register={registerEmail as any}
          required
          errors={
            <>
              {errorsEmail.email && (
                <span className="text-red-500 text-sm">
                  Este campo é obrigatório
                </span>
              )}
            </>
          }
        />

        <form className="flex gap-2 flex-col w-[100%]">
          <div className="flex gap-2">
            <div className="w-full">
              <Select
                label={
                  userData.typeAccount === 'oneCurrency'
                    ? 'Moeda Selecionada'
                    : 'Moeda Principal Selecionada'
                }
                disabledSelect={!optionsCurrencyEnabled}
                name="primary_currency"
                className={`border text-sm rounded-lg block p-2.5  w-full placeholder-gray-400 w-[100%] ${
                  !optionsCurrencyEnabled
                    ? 'bg-gray-700 border-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-800 border-gray-700 text-white'
                }`}
                options={dropdownOptionsCurrencyHybrid}
                register={registerCurrencys}
              />
            </div>
            <div className="w-full">
              {userData.typeAccount === 'hybrid' && (
                <Select
                  label="Moeda Secundária Selecionada"
                  name="secondary_currency"
                  disabledSelect={!optionsCurrencyEnabled}
                  className={`border text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 ${
                    !optionsCurrencyEnabled
                      ? 'bg-gray-700 border-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gray-800 border-gray-700 text-white'
                  }`}
                  options={dropdownOptionsCurrencyHybrid}
                  register={registerCurrencys}
                  errors={
                    <>
                      {errors.secondary_currency && (
                        <span className="text-red-500 text-sm">
                          {errors.secondary_currency.message}
                        </span>
                      )}
                    </>
                  }
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {optionsCurrencyEnabled && (
              <>
                <Button
                  type="button"
                  onClick={() => handleOptionsCurrencyEnabled()}
                  variant="cancel"
                  addStyleInTheCurrent="w-[100%]"
                >
                  Cancelar
                </Button>
              </>
            )}
            <Button
              variant={!optionsCurrencyEnabled ? 'default700' : 'confirm'}
              type={!optionsCurrencyEnabled ? 'submit' : 'button'}
              addStyleInTheCurrent="w-[100%]"
              onClick={
                !optionsCurrencyEnabled
                  ? () => setOptionsCurrencyEnabled(true)
                  : onSubmitCurrencys(updatedCurrencys)
              }
            >
              {!optionsCurrencyEnabled ? 'Alterar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default MyProfile
