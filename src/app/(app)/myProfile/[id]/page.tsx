/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import { dropdownOptionsCurrencyHybrid } from '@/app/(auth)/signup/utils'
import { Button, Input, Select } from '@/components'
import { useUserData } from '@/hooks/globalStates'
import useUpdatedUser from '@/hooks/myProfile/useUpdatedUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'

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

  const [inputsEnabled, setInputsEnabled] = useState<{
    [key: string]: boolean
  }>({
    emailDisabled: false,
    nameDisabled: false,
  })

  const [optionsCurrencyEnabled, setOptionsCurrencyEnabled] = useState(false)

  const {
    register: registerName,
    handleSubmit: onSubmitName,
    reset: resetName,
    formState: { errors: errorsName },
  } = useForm({
    defaultValues: { name: userData.name },
    resolver: async (data) => {
      try {
        schemaName.parse(data)
        return { values: data, errors: {} }
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors }
        }
        return { values: {}, errors: { [error.path[0]]: error.message } }
      }
    },
  })
  const {
    register: registerEmail,
    handleSubmit: onSubmitEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    defaultValues: {
      email: userData.email,
    },
    resolver: async (data) => {
      try {
        schemaEmail.parse(data)
        return { values: data, errors: {} }
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors }
        }
        return { values: {}, errors: { [error.path[0]]: error.message } }
      }
    },
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

  const toggleInputEnabled = (type: 'email' | 'name' | 'typeAccount') => {
    setInputsEnabled((prevState: Record<string, boolean>) => ({
      ...prevState,
      [`${type}Disabled`]: !prevState[`${type}Disabled`],
    }))
  }

  const handleCancel = (type: 'email' | 'name') => {
    if (type === 'email') {
      resetEmail()
      toggleInputEnabled(type)
      return
    }
    resetName()
    toggleInputEnabled(type)
  }

  const handleOptionsCurrencyEnabled = () => {
    setOptionsCurrencyEnabled(false)
    resetTypeAccount()
  }

  const handleSubmit = (fieldName: 'email' | 'name', values: FormValues) => {
    if (values[fieldName] === userData[fieldName]) {
      toggleInputEnabled(fieldName)
      return
    }
    updatedUserData(values)
    toggleInputEnabled(fieldName)
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
        <form className="flex gap-2">
          <Input
            label="Nome"
            name="name"
            placeholder="Pedro..."
            type="text"
            disabled={!inputsEnabled.nameDisabled}
            register={registerName}
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
          <div className="flex gap-2 self-end">
            {inputsEnabled.nameDisabled && (
              <>
                <Button
                  type="button"
                  onClick={() => handleCancel('name')}
                  variant="cancel"
                >
                  Cancelar
                </Button>
              </>
            )}
            <Button
              variant={!inputsEnabled.nameDisabled ? 'default700' : 'confirm'}
              type="button"
              onClick={
                !inputsEnabled.nameDisabled
                  ? () => toggleInputEnabled('name')
                  : onSubmitName((value) => handleSubmit('name', value))
              }
            >
              {!inputsEnabled.nameDisabled ? 'Alterar' : 'Salvar'}
            </Button>
          </div>
        </form>

        <form className="flex gap-2">
          <Input
            label="Email"
            name="email"
            placeholder="teste@gmail.com"
            type="email"
            disabled={!inputsEnabled.emailDisabled}
            register={registerEmail}
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
          <div className="flex gap-2 self-end">
            {inputsEnabled.emailDisabled && (
              <>
                <Button
                  type="button"
                  onClick={() => handleCancel('email')}
                  variant="cancel"
                >
                  Cancelar
                </Button>
              </>
            )}
            <Button
              variant={!inputsEnabled.emailDisabled ? 'default700' : 'confirm'}
              type="button"
              onClick={
                !inputsEnabled.emailDisabled
                  ? () => toggleInputEnabled('email')
                  : onSubmitEmail((value) => handleSubmit('email', value))
              }
            >
              {!inputsEnabled.emailDisabled ? 'Alterar' : 'Salvar'}
            </Button>
          </div>
        </form>

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
