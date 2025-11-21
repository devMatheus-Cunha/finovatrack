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
  downPayment: z.string().optional(),
  homePurchases: z.string().optional(),
  otherDeductions: z.string().optional(),
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
      downPayment: formatToCustomFormat(Number(initialValues?.downPayment)),
      homePurchases: formatToCustomFormat(Number(initialValues?.homePurchases)),
      otherDeductions: formatToCustomFormat(
        Number(initialValues?.otherDeductions)
      )
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
      <div className="flex flex-col gap-6">
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
            name="downPayment"
            label={`Entrada do imóvel (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
            errors={errors?.downPayment?.message}
          />
          <InputTypeMoney
            control={control}
            name="homePurchases"
            label={`Compras para a casa (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
            errors={errors?.homePurchases?.message}
          />
          <InputTypeMoney
            control={control}
            name="otherDeductions"
            label={`Outras deduções (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10.00`}
            errors={errors?.otherDeductions?.message}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-3 mt-4">
        <Button type="button" variant="cancel" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="confirm">
          Salvar
        </Button>
      </div>
    </form>
  )
}

export default ContentModalFinanceYear
