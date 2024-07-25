import React from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, InputTypeMoney, NumberInput } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import { formatToCustomFormat } from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import { SimpleGrid } from '@chakra-ui/react'

const schemaContributions = z.object({
  investments: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  reserve: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  monthlyContributions: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  receivables: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  deduction: z.string({
    required_error: 'Campo Obrigatorio'
  }),
  periodContributions: z.string({
    required_error: 'Campo Obrigatorio'
  })
})

interface ModalProps {
  onClose: () => void
  initialValues?: IFinancialPlanningProps
  onSubmit: any
  currency: string
}

const ModalContent: React.FC<ModalProps> = ({
  onClose,
  initialValues,
  onSubmit,
  currency
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm<IFinancialPlanningProps>({
    defaultValues: {
      id: initialValues?.id,
      year: initialValues?.year,
      periodContributions: initialValues?.periodContributions,
      investments: formatToCustomFormat(Number(initialValues?.investments)),
      receivables: formatToCustomFormat(Number(initialValues?.receivables)),
      reserve: initialValues?.totoalReserveLastYear
        ? formatToCustomFormat(Number(initialValues?.totoalReserveLastYear))
        : formatToCustomFormat(Number(initialValues?.reserve)),
      monthlyContributions: formatToCustomFormat(
        Number(initialValues?.monthlyContributions)
      ),
      deduction: formatToCustomFormat(Number(initialValues?.deduction))
    },
    resolver: zodResolver(schemaContributions)
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit({
          ...values,
          year: initialValues?.year,
          id: initialValues?.id
        })
      })}
    >
      <div className="rounded-lg shadow bg-gray-800">
        <div className="p-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold text-white">
            Atualizar Valores
          </h3>
        </div>
        <div className="flex flex-col flex-wrap gap-6 p-4">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <InputTypeMoney
              control={control}
              name="investments"
              required
              label={`Investimentos (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={
                errors.investments && (
                  <span className="text-red-500 text-sm ">
                    {errors.investments.message}
                  </span>
                )
              }
            />
            <InputTypeMoney
              control={control}
              required
              labelHint="Se o campo estiver desabilitado ele está considerando o total do ano anterior na reserva."
              // disabled={initialValues?.totoalReserveLastYear ? true : false}
              name="reserve"
              label={`Reserva (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={
                errors.reserve && (
                  <span className="text-red-500 text-sm ">
                    {errors.reserve.message}
                  </span>
                )
              }
            />
            <InputTypeMoney
              control={control}
              required
              name="monthlyContributions"
              label={`Aporte Mensal (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={
                errors.monthlyContributions && (
                  <span className="text-red-500 text-sm ">
                    {errors.monthlyContributions.message}
                  </span>
                )
              }
            />
            <NumberInput
              label="Período do Aporte"
              name="periodContributions"
              placeholder="12"
              type="number"
              register={register}
              required
              errors={
                <>
                  {errors.periodContributions && (
                    <span className="text-red-500 text-sm ">
                      Este campo é obrigatório
                    </span>
                  )}
                </>
              }
            />
            <InputTypeMoney
              control={control}
              required
              name="receivables"
              label={`A receber (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={
                errors.receivables && (
                  <span className="text-red-500 text-sm ">
                    {errors.receivables.message}
                  </span>
                )
              }
            />
            <InputTypeMoney
              control={control}
              required
              name="deduction"
              label={`Dedução (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={
                errors.deduction && (
                  <span className="text-red-500 text-sm ">
                    {errors.deduction.message}
                  </span>
                )
              }
            />
          </SimpleGrid>
        </div>

        <div className="flex justify-between md:justify-end items-center px-4 py-6  border-t border-gray-600">
          <div className="flex gap-3">
            <Button onClick={() => onClose()} type="button" variant="cancel">
              Cancelar
            </Button>
            <Button type="submit" variant="confirm">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalContent
