'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputTypeMoney, Button } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { ITypeModalExpense } from '../../hooks/useControlModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserData } from '@/hooks/globalStates'

type FormData = {
  value: string
}

interface IContentModal {
  onSubmit: (value: FormData) => void
  handleOpenModal: (type?: ITypeModalExpense, data?: ExpenseData) => void
  isLoadingAddExpense?: boolean
}

const schema = z.object({
  value: z.string({
    required_error: 'Campo obrigatório'
  })
})

function ContentAddEntryModal({
  onSubmit,
  handleOpenModal,
  isLoadingAddExpense
}: IContentModal) {
  const { userData } = useUserData()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-xl mx-auto flex flex-col gap-6">
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <div className="rounded-md">
          <div className="p-4 border-b border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              Adicione uma Entrada
            </h3>
          </div>
          <div className="p-4">
            <InputTypeMoney
              control={control}
              name="value"
              label={`Valor (${optionsLabelCurrencyKeyAndValue[userData.primary_currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[userData.primary_currency]} 10.00`}
              errors={errors.value?.message}
            />
          </div>
          <div className="px-4 py-6 border-t border-gray-600 flex justify-end gap-3">
            <Button
              onClick={() => handleOpenModal()}
              type="button"
              variant="cancel"
            >
              Cancelar
            </Button>
            <Button
              isLoading={isLoadingAddExpense}
              loadingText="Salvando..."
              type="submit"
              variant="confirm"
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContentAddEntryModal
