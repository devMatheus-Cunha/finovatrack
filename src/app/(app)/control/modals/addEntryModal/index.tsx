'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserData } from '@/hooks/auth/useAuth/types'
import { InputTypeMoney } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ExpenseData } from '@/services/expenses/getExpenses'
import {
  Box,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button
} from '@chakra-ui/react'
import { ITypeModalExpense } from '../../hooks/useControlModal'
import { zodResolver } from '@hookform/resolvers/zod'

type FormData = {
  value: string
}

interface IContentModal {
  onSubmit: (value: FormData) => void
  handleOpenModal: (type?: ITypeModalExpense, data?: ExpenseData) => void
  isLoadingAddExpense?: boolean
  userData: UserData
}

const schema = z.object({
  value: z.string({
    required_error: 'Campo obrigatório'
  })
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
    resolver: zodResolver(schema)
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <Box bg="gray.700" borderRadius="md">
            <ModalHeader p={4} borderBottom="1px" borderColor="gray.600">
              <h3 className="text-xl font-semibold text-white">
                Adicione uma Entrada
              </h3>
            </ModalHeader>

            <ModalBody p={4}>
              <InputTypeMoney
                control={control}
                name="value"
                label={`Valor (${
                  optionsLabelCurrencyKeyAndValue[userData.primary_currency]
                })`}
                placeholder={`Ex: ${
                  optionsLabelCurrencyKeyAndValue[userData.primary_currency]
                } 10.00`}
                errors={errors.value?.message}
              />
            </ModalBody>

            <ModalFooter
              px={4}
              py={6}
              borderTop="1px"
              borderColor="gray.600"
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Button onClick={() => handleOpenModal()} type="button">
                Cancelar
              </Button>
              <Button
                isLoading={isLoadingAddExpense}
                loadingText="Salvando..."
                colorScheme="green"
                type="submit"
              >
                Salvar
              </Button>
            </ModalFooter>
          </Box>
        </form>
      </ModalContent>
    </>
  )
}

export default ContentAddEntryModal
