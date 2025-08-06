import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ExpenseData, getExpenses } from '@/services/expenses/getExpenses'
import { useUserId } from '@/hooks/globalStates'

export type Filter =
  | 'Essencial'
  | 'Não essencial'
  | 'Gasto Livre'
  | 'Clear'
  | ''

export const initialDataSelectedData: ExpenseData = {
  id: '',
  category: '',
  description: '',
  value: '',
  subcategory: undefined,
  value_primary_currency: 0,
  value_secondary_currency: 0,
  typeMoney: '',
  payment: ''
}

export const useFetchExpensesData = () => {
  const { userId } = useUserId() as any
  const [filter, setFilter] = useState<Filter>('')

  const {
    data,
    isLoading: isLoadingExpensesData,
    status: statusExpensesData,
    refetch: refetchExpensesData
  } = useQuery({
    queryKey: ['expenses_data', filter, userId],
    queryFn: async () => await getExpenses(userId, filter),
    enabled: !!userId,
    placeholderData: (previous) => previous
  })

  const expensesData = useMemo(() => data || [], [data])

  const calculationSumValues = useMemo(() => {
    if (expensesData.length <= 0) return []

    const calculation = expensesData.reduce(
      (acumulador, objetoAtual) => {
        if (objetoAtual.category !== 'Investimentos e Finanças') {
          acumulador.value_primary_currency =
            (acumulador.value_primary_currency ?? 0) +
            Number(objetoAtual.value_primary_currency)
          acumulador.value_secondary_currency =
            (acumulador.value_secondary_currency ?? 0) +
            Number(objetoAtual.value_secondary_currency)
        }
        return acumulador
      },
      {
        id: '',
        category: '',
        description: 'Totais',
        value: '',
        value_primary_currency: 0,
        value_secondary_currency: 0,
        typeMoney: '',
        payment: ''
      }
    )
    return [...expensesData, calculation]
  }, [expensesData])

  const getTotals: ExpenseData = useMemo(() => {
    const result = calculationSumValues.find(
      (item) => item.description === 'Totais'
    )

    if (result) return result

    return initialDataSelectedData
  }, [calculationSumValues])

  return {
    expensesData: expensesData,
    calculationSumValues: calculationSumValues || [],
    getTotals: getTotals || [],
    isLoadingExpensesData,
    statusExpensesData,
    refetchExpensesData,
    setFilter,
    filter
  }
}

export default useFetchExpensesData
