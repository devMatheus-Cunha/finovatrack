'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, InputTypeMoney, Select, Button } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { formatToCustomFormat } from '@/utils/formatNumber'

import { Trash } from '@phosphor-icons/react'
import { categoryOptions, paymentsOptions } from './utilts'
import { useUserData } from '@/hooks/globalStates'
import {
  IHandleControlModalExpenseFunction,
  ITypeModalExpense
} from '@/app/(app)/control/hooks/useControlModal'

const schema = z.object({
  description: z.string({ required_error: 'Campo obrigatorio' }),
  typeMoney: z.string().optional(),
  value: z
    .string({ required_error: 'Campo obrigatorio' })
    .min(0.01, 'O valor deve ser maior que zero'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  subcategory: z.string().optional(),
  payment: z.string().min(1, 'A forma de pagamento é obrigatória')
})

interface IExpenseModalContent {
  onSubmit: SubmitHandler<ExpenseData>
  handleOpenModal: IHandleControlModalExpenseFunction
  isLoadingAddExpense: boolean
  initialData: ExpenseData | undefined
  typeModal: ITypeModalExpense
  onDelete: () => void
}

const ExpenseModalContent = ({
  onSubmit,
  handleOpenModal,
  initialData,
  typeModal,
  onDelete
}: IExpenseModalContent) => {
  const { userData } = useUserData()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<ExpenseData>({
    defaultValues:
      typeModal !== 'add'
        ? {
            ...initialData,
            subcategory: initialData?.subcategory?.value as any,
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
    if (type === 'cancel') handleOpenModal('cancel')
  }

  const onFormSubmit = (data: any) => {
    const selectedCategory = categoryOptions.find(
      (cat) => cat.value === data.category
    )
    let subcategoryData = undefined

    if (selectedCategory?.subcategories?.length && data.subcategory) {
      const subcat = selectedCategory.subcategories.find(
        (sub) => sub.value === data.subcategory
      )
      if (subcat) {
        subcategoryData = {
          value: subcat.value,
          label: subcat.label,
          category: subcat.category
        }
      }
    }

    onSubmit({
      ...data,
      id: initialData?.id ?? '',
      subcategory: subcategoryData
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col flex-wrap gap-6 p-0">
        <Input
          label="Descrição"
          name="description"
          placeholder="Ex: Compra carro"
          type="text"
          register={register}
          required
          errors={errors.description?.message}
        />
        <div className="flex gap-4 flex-wrap">
          <Select
            label="Selecione a categoria"
            name="category"
            isRequired
            options={categoryOptions}
            register={register}
            errors={errors.category?.message}
          />
          {categoryOptions.find((cat) => cat.value === watch('category'))
            ?.subcategories && (
            <Select
              label="Subcategoria (Opcional)"
              name="subcategory"
              isRequired={false}
              disabled={false}
              options={[
                ...(categoryOptions.find(
                  (cat) => cat.value === watch('category')
                )?.subcategories || [])
              ]}
              register={register}
              errors={errors.subcategory?.message}
            />
          )}
          <Select
            label="Status de Pagamento"
            name="payment"
            isRequired
            options={paymentsOptions}
            register={register}
            errors={errors.payment?.message}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {userData.typeAccount === 'hybrid' && (
            <Select
              label="Selecione Moeda"
              name="typeMoney"
              isRequired
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
              errors={errors.typeMoney?.message}
            />
          )}
          <InputTypeMoney
            control={control}
            name="value"
            required
            label={`Valor (${optionsLabelCurrencyKeyAndValue[watch()?.typeMoney || userData.primary_currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[watch()?.typeMoney || userData.primary_currency]} 10.00`}
            errors={errors.value?.message}
          />
        </div>
      </div>
      <div className="px-0 py-6 flex justify-end gap-3">
        {typeModal === 'edit' && (
          <Button
            type="button"
            onClick={onDelete}
            variant="ghost"
            className="text-red-500 hover:text-red-700"
            leftIcon={<Trash size={20} />}
          >
            Deletar
          </Button>
        )}
        <Button
          onClick={() => handleActionsModal('cancel')}
          type="button"
          variant="cancel"
        >
          Cancelar
        </Button>
        <Button type="submit" variant="confirm">
          {typeModal === 'add' ? 'Adicionar' : 'Editar'}
        </Button>
      </div>
    </form>
  )
}

export default ExpenseModalContent
