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
import { Trash } from '@phosphor-icons/react'
import { formatToCustomFormat } from '@/utils/formatNumber'

interface IContentModal {
  onSubmit: (data: ExpenseData) => Promise<void>
  handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
  isLoadingAddExpense: boolean
  initialData: ExpenseData | undefined
  type: ITypeModal
  userData: UserData
  onDelete: () => void
}

function ContentActionsTableModal({
  onSubmit,
  handleOpenModal,
  initialData,
  type,
  userData,
  onDelete
}: IContentModal) {
  const schema = z.object({
    description: z.string().nonempty(),
    typeMoney:
      userData.typeAccount === 'hybrid'
        ? z.string().nonempty()
        : z.string().optional(),
    value: z.string().nonempty(),
    category: z.string().nonempty(),
    payment: z.string().nonempty()
  })
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<ExpenseData>({
    defaultValues:
      type !== 'addExpense'
        ? {
            ...initialData,
            value:
              userData.typeAccount === 'oneCurrency'
                ? formatToCustomFormat(initialData?.value_primary_currency)
                : initialData?.typeMoney === userData.primary_currency
                  ? formatToCustomFormat(initialData?.value_primary_currency)
                  : formatToCustomFormat(initialData?.value_secondary_currency)
          }
        : undefined,
    resolver: zodResolver(schema)
  })

  const handleActionsModal = (type: 'cancel' | 'delete') => {
    if (type === 'cancel') handleOpenModal()
    handleOpenModal()
    handleOpenModal('delete', initialData)
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, id: initialData?.id ?? '' })
      )}
    >
      <div className="rounded-lg shadow bg-gray-800">
        <div className="p-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold text-white">
            {validateTextToModal[type || '']?.title}
          </h3>
        </div>

        <div className="flex flex-col flex-wrap gap-6 p-4">
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

          <div className="flex gap-4 flex-wrap">
            <Select
              label="Selecione a categoria"
              name="category"
              required
              options={[
                {
                  label: 'Ex: Alimentação',
                  value: '',
                  disabled: true,
                  selected: true
                },
                { label: 'Alimentação', value: 'Alimentação' },
                { label: 'Contas', value: 'Contas' },
                { label: 'Economias', value: 'Economias' },
                { label: 'Educação', value: 'Educação' },
                { label: 'Entretenimento', value: 'Entretenimento' },
                { label: 'Lazer', value: 'Lazer' },
                { label: 'Moradia', value: 'Moradia' },
                { label: 'Roupas', value: 'Roupas' },
                { label: 'Saúde', value: 'Saúde' },
                { label: 'Seguro', value: 'Seguro' },
                { label: 'Transporte', value: 'Transporte' },
                { label: 'Viagens', value: 'Viagens' }
              ]}
              register={register}
              errors={
                <>
                  {errors.category && (
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
              required
              options={[
                {
                  label: `Ex: A Pagar`,
                  value: '',
                  disabled: true,
                  selected: true
                },
                { label: 'A Pagar', value: 'A Pagar' },
                { label: 'Pago', value: 'Pago' }
              ]}
              register={register}
              errors={
                <>
                  {errors.payment && (
                    <span className="text-red-500 text-sm">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            {userData.typeAccount === 'hybrid' && (
              <Select
                label="Selecione Moeda"
                name="typeMoney"
                required
                options={[
                  {
                    label: `Ex: ${userData.primary_currency}`,
                    value: '',
                    disabled: true,
                    selected: true
                  },
                  {
                    label: userData.primary_currency,
                    value: userData.primary_currency
                  },
                  {
                    label: userData.secondary_currency,
                    value: userData.secondary_currency
                  }
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
              required
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

        <div className="flex justify-between md:justify-end items-center px-4 py-6  border-t border-gray-600">
          <Button
            onClick={() => onDelete()}
            type="button"
            className="md:hidden flex justify-center items-center gap-1 text-red-500 p-0"
          >
            Deletar
            <Trash color="#ef4444" />
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={() => handleActionsModal('cancel')}
              type="button"
              variant="cancel"
            >
              Cancelar
            </Button>
            <Button variant="confirm" type="submit">
              {type === 'addExpense' ? 'Adicionar' : 'Editar'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ContentActionsTableModal
