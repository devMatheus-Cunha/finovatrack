import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputTypeMoney, NumberInput } from '@/components'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  currentAndPreviousYearValidity,
  formatToCustomFormat
} from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import { Button } from '@/components/common'

const schemaContributions = z.object({
  investments: z.string({ required_error: 'Campo Obrigatorio' }),
  reserve: z.string({ required_error: 'Campo Obrigatorio' }),
  monthlyContributions: z.string({ required_error: 'Campo Obrigatorio' }),
  receivables: z.string({ required_error: 'Campo Obrigatorio' }),
  deduction: z.string({ required_error: 'Campo Obrigatorio' }),
  periodContributions: z.string({ required_error: 'Campo Obrigatorio' })
})

interface ModalProps {
  onClose: () => void
  initialValues?: IFinancialPlanningProps
  onSubmit: any
  currency: string
}

const ContentModalFinanceYear: React.FC<ModalProps> = ({
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
      reserve: currentAndPreviousYearValidity(initialValues?.year)
        ? formatToCustomFormat(Number(initialValues?.reserve))
        : formatToCustomFormat(Number(initialValues?.totoalReserveLastYear)),
      monthlyContributions: formatToCustomFormat(
        Number(initialValues?.monthlyContributions)
      ),
      deduction: formatToCustomFormat(Number(initialValues?.deduction))
    },
    resolver: zodResolver(schemaContributions)
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <form
        onSubmit={handleSubmit((values) => {
          onSubmit({
            ...values,
            year: initialValues?.year,
            id: initialValues?.id
          })
        })}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl"
      >
        <div className="border-b border-gray-600 px-6 pt-6 pb-2">
          <h3 className="text-2xl font-semibold text-white">
            Atualizar Valores
          </h3>
        </div>
        <div className="flex flex-col gap-6 px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputTypeMoney
              control={control}
              name="investments"
              required
              label={`Investimentos (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={errors.investments?.message}
            />
            <InputTypeMoney
              control={control}
              required
              labelHint="Se o campo estiver desabilitado ele está considerando o total do ano anterior na reserva."
              name="reserve"
              label={`Reserva (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={errors?.reserve?.message}
            />
            <InputTypeMoney
              control={control}
              required
              name="monthlyContributions"
              label={`Aporte Mensal (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={errors?.monthlyContributions?.message}
            />
            <NumberInput
              label="Período do Aporte"
              name="periodContributions"
              placeholder="12"
              type="number"
              register={register}
              required
              errors={errors?.periodContributions?.message}
            />
            <InputTypeMoney
              control={control}
              required
              name="receivables"
              label={`Aporte Extra (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={errors?.receivables?.message}
            />
            <InputTypeMoney
              control={control}
              required
              name="deduction"
              label={`Dedução (${optionsLabelCurrencyKeyAndValue[currency]})`}
              placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
              errors={errors?.deduction?.message}
            />
          </div>
        </div>
        <div className="border-t border-gray-600 px-6 py-6 flex flex-col md:flex-row justify-center md:justify-end items-center gap-3">
          <Button type="button" variant="cancel" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContentModalFinanceYear
