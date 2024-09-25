'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserData } from '@/hooks/auth/useAuth/types'
import { Input, InputTypeMoney, Select } from '@/components'
import { validateTextToModal } from '../../utils'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { formatToCustomFormat } from '@/utils/formatNumber'
import {
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  HStack,
  Icon,
  Show,
  Flex
} from '@chakra-ui/react'
import {
  IHandleControlModalExpenseFunction,
  ITypeModalExpense
} from '../../hooks/useControlModal'
import { DeleteIcon } from '@chakra-ui/icons'
import { categoryOptions, paymentsOptions } from './utilts'

interface IContentModal {
  onSubmit: (data: ExpenseData) => Promise<void>
  handleOpenModal: IHandleControlModalExpenseFunction
  isLoadingAddExpense: boolean
  initialData: ExpenseData | undefined
  typeModal: ITypeModalExpense
  userData: UserData
  onDelete: () => void
}

function ContentActionsTableModal({
  onSubmit,
  handleOpenModal,
  initialData,
  typeModal,
  userData,
  onDelete
}: IContentModal) {
  const schema = z.object({
    description: z.string({
      required_error: 'Campo obrigatorio'
    }),
    typeMoney:
      userData.typeAccount === 'hybrid'
        ? z.string({
            required_error: 'Campo obrigatorio'
          })
        : z.string().optional(),
    value: z
      .string({
        required_error: 'Campo obrigatorio'
      })
      .min(0.01, 'O valor deve ser maior que zero'),
    category: z.string().min(1, 'A categoria é obrigatória'),
    payment: z.string().min(1, 'A forma de pagamento é obrigatória')
  })
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

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({ ...data, id: initialData?.id ?? '' })
          )}
        >
          <ModalHeader borderBottom="1px" borderColor="gray.600">
            <Heading as="h3" size="md" fontWeight="semibold" color="white">
              {validateTextToModal[typeModal || '']?.title}
            </Heading>
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDir="column"
            flexWrap="wrap"
            gap={6}
            p={4}
          >
            <Input
              label="Descrição"
              name="description"
              placeholder="Ex: Compra carro"
              type="text"
              register={register}
              required
              errors={errors.description?.message}
            />

            <Flex gap={4} wrap="wrap">
              <Select
                label="Selecione a categoria"
                name="category"
                isRequired
                options={categoryOptions}
                register={register}
                errors={errors.category?.message}
              />
              <Select
                label="Status de Pagamento"
                name="payment"
                isRequired
                options={paymentsOptions}
                register={register}
                errors={errors.payment?.message}
              />
            </Flex>

            <Flex gap={4} wrap="wrap">
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
                errors={errors.value?.message}
              />
            </Flex>
          </ModalBody>

          <ModalFooter
            display="flex"
            alignItems="center"
            gap={3}
            justifyContent="right"
            borderTop="1px"
            borderColor="gray.600"
          >
            {typeModal === 'edit' && (
              <Show below="lg">
                <Button
                  onClick={onDelete}
                  variant="ghost"
                  colorScheme="red"
                  leftIcon={<Icon as={DeleteIcon} />}
                >
                  Deletar
                </Button>
              </Show>
            )}
            <HStack spacing={3}>
              <Button
                onClick={() => handleActionsModal('cancel')}
                type="button"
              >
                Cancelar
              </Button>
              <Button type="submit" colorScheme="green">
                {typeModal === 'add' ? 'Adicionar' : 'Editar'}
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  )
}

export default ContentActionsTableModal
