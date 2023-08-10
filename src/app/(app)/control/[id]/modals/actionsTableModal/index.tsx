/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { UserData } from '@/hooks/auth/useAuth/types'
import { Button, Input, InputTypeMoney, Select } from '@/components'
import { ITypeModal } from '../../types'
import { validateTextToModal } from '../../utils'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExpenseData } from '@/service/expenses/getExpenses'

interface IContentModal {
  onSubmit: (data: ExpenseData) => Promise<void>
  handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
  isLoadingAddExpense: boolean
  initialData: ExpenseData | undefined
  type: ITypeModal
  userData: UserData
}

function ContentActionsTableModal({
  onSubmit,
  handleOpenModal,
  isLoadingAddExpense,
  initialData,
  type,
  userData,
}: IContentModal) {
  const schema = z.object({
    description: z.string().nonempty(),
    typeMoney:
      userData.typeAccount === 'hybrid'
        ? z.string().nonempty()
        : z.string().optional(),
    value: z.string().nonempty(),
    type: z.string().nonempty(),
    payment: z.string().nonempty(),
  })
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ExpenseData>({
    defaultValues:
      type !== 'addExpense'
        ? {
            ...initialData,
            value:
              userData.typeAccount === 'oneCurrency'
                ? String(initialData?.value_primary_currency)
                : initialData?.typeMoney === userData.primary_currency
                ? String(initialData?.value_primary_currency)
                : String(initialData?.value_secondary_currency),
          }
        : undefined,
    resolver: zodResolver(schema),
  })

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, id: initialData?.id ?? '' }),
      )}
    >
      <div className="rounded-lg shadow bg-gray-800">
        <div className="p-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold text-white">
            {validateTextToModal[type || '']?.title}
          </h3>
        </div>

        <div className="flex flex-col  gap-6 p-4">
          <Input
            label="Descrição"
            name="description"
            placeholder="Ex: Compra carro"
            type="text"
            register={register}
            required
            errors={
              <>
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </>
            }
          />

          <div className="flex gap-4">
            <Select
              label="Selecione o tipo"
              name="type"
              options={[
                {
                  label: `Ex: Essencial`,
                  value: '',
                  disabled: true,
                  selected: true,
                },
                { label: 'Essencial', value: 'Essencial' },
                { label: 'Não essencial', value: 'Não essencial' },
                { label: 'Gasto Livre', value: 'Gasto Livre' },
              ]}
              register={register}
              errors={
                <>
                  {errors.type && (
                    <span className="text-red-500 text-sm">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
            <Select
              label="Status de Pagamento"
              name="payment"
              options={[
                {
                  label: `Ex: A Pagar`,
                  value: '',
                  disabled: true,
                  selected: true,
                },
                { label: 'A Pagar', value: 'A Pagar' },
                { label: 'Pago', value: 'Pago' },
              ]}
              register={register}
              errors={
                <>
                  {errors.type && (
                    <span className="text-red-500 text-sm">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
          </div>

          <div className="flex gap-4 ">
            {userData.typeAccount === 'hybrid' && (
              <Select
                label="Selecione Moeda"
                name="typeMoney"
                options={[
                  {
                    label: `Ex: ${userData.primary_currency}`,
                    value: '',
                    disabled: true,
                    selected: true,
                  },
                  {
                    label: userData.primary_currency,
                    value: userData.primary_currency,
                  },
                  {
                    label: userData.secondary_currency,
                    value: userData.secondary_currency,
                  },
                ]}
                register={register}
                errors={
                  <>
                    {errors.typeMoney && (
                      <span className="text-red-500 text-sm">
                        Este campo é obrigatório
                      </span>
                    )}
                  </>
                }
              />
            )}
            <InputTypeMoney
              control={control}
              name="value"
              label={`Valor (${
                optionsLabelCurrencyKeyAndValue[
                  watch()?.typeMoney || userData.primary_currency
                ]
              })`}
              placeholder={`Ex: ${
                optionsLabelCurrencyKeyAndValue[
                  watch()?.typeMoney || userData.primary_currency
                ]
              } 10.00`}
              errors={
                <>
                  {errors.value && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório e deve ser um valor numérico
                      válido
                    </span>
                  )}
                </>
              }
            />
          </div>
        </div>

        <div className="flex justify-end px-4 py-6 gap-3 border-t border-gray-600">
          <Button
            onClick={() => handleOpenModal()}
            type="button"
            variant="cancel"
          >
            Cancelar
          </Button>
          <Button variant="confirm" type="submit">
            {!isLoadingAddExpense ? 'Salvar' : 'Salvando...'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ContentActionsTableModal
