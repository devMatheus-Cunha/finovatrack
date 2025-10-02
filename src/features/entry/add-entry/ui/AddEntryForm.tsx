'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { InputTypeMoney, Button } from '@/components'
import { useUserData } from '@/hooks/globalStates'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'

interface AddEntryFormProps {
  onSubmit: () => void
  onCancel: () => void
  isLoading?: boolean
}

export const AddEntryForm = ({
  onSubmit,
  onCancel,
  isLoading
}: AddEntryFormProps) => {
  const { userData } = useUserData()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <form onSubmit={onSubmit}>
      <div className="p-0">
        <InputTypeMoney
          control={control}
          name="value"
          label={`Valor (${optionsLabelCurrencyKeyAndValue[userData.primary_currency]})`}
          placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[userData.primary_currency]} 10.00`}
          errors={
            typeof errors.value?.message === 'string'
              ? errors.value.message
              : undefined
          }
        />
      </div>
      <div className="px-0 py-6 flex justify-end gap-3">
        <Button onClick={onCancel} type="button" variant="cancel">
          Cancelar
        </Button>
        <Button
          isLoading={isLoading}
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
