import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, InputTypeMoney } from '@/components'
import MonthYearPicker from '@/components/common/Forms/MonthYearPicker'
import { optionsLabelCurrencyKeyAndValue } from '@/utils/configCurrency'
import {
  formatToCustomFormat,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import { IGoalsProps, ISaveGoalProps } from '@/services/finance/goals'

// Define the form schema with string type for the input fields
const schemaGoal = z.object({
  meta_value_to_year: z.string({ required_error: 'Campo Obrigatório' }),
  meta_investimentos: z.string({ required_error: 'Campo Obrigatório' }),
  meta_renda_fixa: z.string({ required_error: 'Campo Obrigatório' }),
  meta_reserva: z.string({ required_error: 'Campo Obrigatório' })
})

// Create a TypeScript type for the form values based on the zod schema
type GoalFormValues = z.infer<typeof schemaGoal>

interface GoalsModalProps {
  onClose: () => void
  initialValues?: IGoalsProps
  onSubmit: (data: ISaveGoalProps) => Promise<void>
  currency: string
}

const GoalsModal: React.FC<GoalsModalProps> = ({
  onClose,
  initialValues,
  onSubmit,
  currency
}) => {
  // Converte meta_year object para string "MM/YYYY" para o MonthYearPicker
  const getInitialMonthYear = (): string => {
    if (initialValues?.meta_year) {
      const month = String(initialValues.meta_year.month + 1).padStart(2, '0')
      const year = String(initialValues.meta_year.year)
      return `${month}/${year}`
    }

    // Default para o mês/ano atual
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = String(now.getFullYear())
    return `${month}/${year}`
  }

  const [selectedMonthYear, setSelectedMonthYear] = React.useState<string>(
    getInitialMonthYear()
  )
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<GoalFormValues>({
    defaultValues: {
      meta_value_to_year: formatToCustomFormat(
        initialValues?.meta_value_to_year || 0
      ),
      meta_investimentos: formatToCustomFormat(
        initialValues?.meta_investimentos || 0
      ),
      meta_renda_fixa: formatToCustomFormat(
        initialValues?.meta_renda_fixa || 0
      ),
      meta_reserva: formatToCustomFormat(initialValues?.meta_reserva || 0)
    },
    resolver: zodResolver(schemaGoal)
  })

  const handleMonthYearChange = (monthYearString: string) => {
    setSelectedMonthYear(monthYearString)
  }
  // Função para converter "MM/YYYY" em objeto { year: number, month: number }
  const parseMonthYearString = (monthYearString: string) => {
    const [month, year] = monthYearString.split('/')
    return {
      year: parseInt(year),
      month: parseInt(month) - 1 // JavaScript months are 0-based
    }
  }

  return (
    <form
      onSubmit={handleSubmit((values) => {
        // Convert string values to numbers as required by ISaveGoalProps
        const metaYear = parseMonthYearString(selectedMonthYear)

        onSubmit({
          id: initialValues?.id,
          meta_year: metaYear,
          meta_value_to_year: formatToJavaScriptNumber(
            values.meta_value_to_year
          ),
          meta_investimentos: formatToJavaScriptNumber(
            values.meta_investimentos
          ),
          meta_renda_fixa: formatToJavaScriptNumber(values.meta_renda_fixa),
          meta_reserva: formatToJavaScriptNumber(values.meta_reserva)
        })
      })}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <label className="block text-white">Meta para o período:</label>
          <MonthYearPicker
            value={selectedMonthYear}
            onChange={handleMonthYearChange}
            placeholder="Selecione mês/ano"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputTypeMoney
            control={control}
            name="meta_value_to_year"
            required
            label={`Valor Total da Meta (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 10000.00`}
            errors={errors.meta_value_to_year?.message}
          />
          <InputTypeMoney
            control={control}
            required
            name="meta_investimentos"
            label={`Meta de Investimentos (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 5000.00`}
            errors={errors.meta_investimentos?.message}
          />
          <InputTypeMoney
            control={control}
            required
            name="meta_renda_fixa"
            label={`Meta de Renda Fixa (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 3000.00`}
            errors={errors.meta_renda_fixa?.message}
          />
          <InputTypeMoney
            control={control}
            required
            name="meta_reserva"
            label={`Meta de Reserva (${optionsLabelCurrencyKeyAndValue[currency]})`}
            placeholder={`Ex: ${optionsLabelCurrencyKeyAndValue[currency]} 2000.00`}
            errors={errors.meta_reserva?.message}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-3 mt-6">
        <Button type="button" variant="cancel" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="confirm">
          {initialValues?.id ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}

export default GoalsModal
