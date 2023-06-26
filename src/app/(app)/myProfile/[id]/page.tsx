/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import { dropdownOptionsCurrency } from '@/app/(auth)/signup/utils'
import { Button, Input } from '@/components'
import { useUserData } from '@/hooks/globalStates'
import useUpdatedUser from '@/hooks/myProfile/useUpdatedUser'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'

type FormValues = {
  email?: string
  name?: string
  primary_currency?: string
}

const schemaName = z.object({
  name: z.string().optional(),
})

const schemaEmail = z.object({
  email: z.string().email('Email inválido'),
  typeAccount: z.string().optional(),
})

function MyProfile() {
  const { userData } = useUserData()
  const { updatedUserData, isLoading } = useUpdatedUser()

  const [inputsEnabled, setInputsEnabled] = useState<{
    [key: string]: boolean
  }>({
    emailDisabled: false,
    nameDisabled: false,
  })

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
      primary_currency: userData.primary_currency,
      secondary_currency: userData.secondary_currency,
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

  const toggleInputEnabled = (type: 'email' | 'name') => {
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

  const handleSubmit = (fieldName: 'email' | 'name', values: FormValues) => {
    if (values[fieldName] === userData[fieldName]) {
      toggleInputEnabled(fieldName)
      return
    }
    updatedUserData(values)
    toggleInputEnabled(fieldName)
  }

  return (
    <main className="flex flex-col w-[100%] p-6 justify-center items-center h-[100vh]">
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
        <form>
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
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
                  variant={
                    !inputsEnabled.nameDisabled ? 'default700' : 'confirm'
                  }
                  type="button"
                  onClick={
                    !inputsEnabled.nameDisabled
                      ? () => toggleInputEnabled('name')
                      : onSubmitName((value) => handleSubmit('name', value))
                  }
                >
                  {isLoading
                    ? 'Salvando...'
                    : !inputsEnabled.nameDisabled
                    ? 'Alterar'
                    : 'Salvar'}
                </Button>
              </div>
            </div>
          </div>
        </form>

        <form>
          <div className="flex gap-2">
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
                variant={
                  !inputsEnabled.emailDisabled ? 'default700' : 'confirm'
                }
                type="button"
                onClick={
                  !inputsEnabled.emailDisabled
                    ? () => toggleInputEnabled('email')
                    : onSubmitEmail((value) => handleSubmit('email', value))
                }
              >
                {isLoading
                  ? 'Salvando...'
                  : !inputsEnabled.emailDisabled
                  ? 'Alterar'
                  : 'Salvar'}
              </Button>
            </div>
          </div>
        </form>

        <div className="flex gap-6">
          <div className="w-full">
            <label
              htmlFor="primary_currency"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {userData.typeAccount === 'oneCurrency'
                ? 'Moeda Selecionada'
                : 'Moeda Principal Selecionada'}
            </label>
            <select
              id="primary_currency"
              {...registerEmail}
              disabled
              name="primary_currency"
              defaultValue={userData.primary_currency}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300 cursor-not-allowed"
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
                ),
              )}
            </select>
          </div>
          {userData.typeAccount === 'hybrid' && (
            <div className="w-full">
              <label
                htmlFor="secondary_currency"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Moeda Secundária Selecionada
              </label>
              <select
                id="secondary_currency"
                {...registerEmail}
                disabled
                name="secondary_currency"
                defaultValue={userData.secondary_currency}
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300 cursor-not-allowed"
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
                  ),
                )}
              </select>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default MyProfile
