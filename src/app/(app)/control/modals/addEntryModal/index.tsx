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
    <form onSubmit={handleSubmit((values) => onSubmit(values))}>
      <div className="p-0">
        <InputTypeMoney
          control={control}
          name="value"
          label={`Valor (${optionsLabelCurrencyKeyAndValue[userData.primary_currency]})`}
          placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[userData.primary_currency]} 10.00`}
          errors={errors.value?.message}
        />
      </div>
      <div className="px-0 py-6 flex justify-end gap-3">
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
    </form>
  )
}

export default ContentAddEntryModal
