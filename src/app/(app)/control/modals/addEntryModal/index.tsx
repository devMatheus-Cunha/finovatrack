'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { UserData } from '@/hooks/auth/useAuth/types'
import { Button, InputTypeMoney } from '@/components'
import { ITypeModal } from '../../types'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

type FormData = {
  value: string
}

interface IContentModal {
  onSubmit: (value: FormData) => void
  handleOpenModal: (type?: ITypeModal, data?: ExpenseData) => void
  isLoadingAddExpense?: boolean
  userData: UserData
}

const schema = z.object({
  value: z.string().nonempty()
})

function ContentAddEntryModal({
  onSubmit,
  handleOpenModal,
  isLoadingAddExpense,
  userData
}: IContentModal) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: async (data) => {
      try {
        schema.parse(data)
        return { values: data, errors: {} }
      } catch (error: any) {
        if (error instanceof ZodError) {
          return { values: {}, errors: error.formErrors.fieldErrors }
        }
        return { values: {}, errors: { [error.path[0]]: error.message } }
      }
    }
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <div className="rounded-lg bg-gray-800 shadowbg-gray-800">
            <ModalHeader>
              <h3 className="text-xl font-semibold text-white">
                Adicione uma Entrada
              </h3>
            </ModalHeader>

            <ModalBody>
              <InputTypeMoney
                control={control}
                name="value"
                label={`Valor (${
                  optionsLabelCurrencyKeyAndValue[userData.primary_currency]
                })`}
                placeholder={`Ex: ${
                  optionsLabelCurrencyKeyAndValue[userData.primary_currency]
                } 10.00`}
                errors={
                  <>
                    {errors.value && (
                      <span className="text-red-500 text-sm ">
                        Este campo é obrigatório
                      </span>
                    )}
                  </>
                }
              />
            </ModalBody>

            <ModalFooter display="flex" alignItems="center" gap={3}>
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
            </ModalFooter>
          </div>
        </form>
      </ModalContent>
    </>
  )
}

export default ContentAddEntryModal
