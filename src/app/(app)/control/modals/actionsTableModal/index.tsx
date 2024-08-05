'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserData } from '@/hooks/auth/useAuth/types'
import { Button, Input, InputTypeMoney, Select } from '@/components'
import { validateTextToModal } from '../../utils'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { ExpenseData } from '@/services/expenses/getExpenses'
import { Trash } from '@phosphor-icons/react'
import { formatToCustomFormat } from '@/utils/formatNumber'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import {
  IHandleControlModalExpenseFunction,
  ITypeModalExpense
} from '../../hooks/useControlModal'

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
          <ModalHeader>
            <h3 className="text-xl font-semibold text-white">
              {validateTextToModal[typeModal || '']?.title}
            </h3>
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
          </ModalBody>

          <ModalFooter
            display="flex"
            alignItems="center"
            gap={3}
            justifyContent="right"
          >
            {typeModal === 'edit' && (
              <Button
                onClick={() => onDelete()}
                type="button"
                className="md:hidden flex justify-center items-center gap-1 text-red-500 p-0 bg-transparent"
              >
                Deletar
                <Trash color="#ef4444" />
              </Button>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => handleActionsModal('cancel')}
                type="button"
                variant="cancel"
              >
                Cancelar
              </Button>
              <Button variant="confirm" type="submit">
                {typeModal === 'add' ? 'Adicionar' : 'Editar'}
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  )
}

export default ContentActionsTableModal
