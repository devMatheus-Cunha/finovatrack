/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

'use client'

import { UserData } from '@/hooks/auth/useAuth/types'
import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData'
import { IAddExpenseData } from '@/service/expenses/addExpense'
import { optionsCurrencyKeyAndValue } from '@/utils/configCurrency'
import { formatNumberToSubmit } from '@/utils/formatNumber'
import { useMemo } from 'react'

export const validateTextToModal: any = {
  addExpense: {
    title: 'Adicionar Gasto',
    description: 'Add a new Expense',
  },
  edit: {
    title: 'Editar Gasto',
    description: 'edit data',
  },
  delete: {
    title: 'Deletar Gasto',
    description: 'delete data',
  },
}

export const formattedValuesSubmitExpense = (
  data: IAddExpenseData,
  userData: UserData,
) => {
  const formattedValues = {
    ...data,
    value_primary_currency:
      userData.typeAccount === 'oneCurrency' ||
      data.typeMoney === userData.primary_currency
        ? formatNumberToSubmit(data.value)
        : 0,
    value_secondary_currency:
      userData.typeAccount !== 'oneCurrency' &&
      data.typeMoney === userData.secondary_currency
        ? formatNumberToSubmit(data.value)
        : 0,
  }
  return formattedValues
}

export const columsHeadProps = (
  primaryCurrency: string,
  secondaryCurrency: string,
  typeAccount: string,
) => {
  const columns = [
    {
      header: 'Descrição',
      field: 'description',
    },
    {
      header: optionsCurrencyKeyAndValue[primaryCurrency],
      field: 'primary_currency',
    },
    {
      header: 'Tipo',
      field: 'type',
    },
    {
      header: 'Ação',
      field: 'actions',
    },
  ]

  if (typeAccount === 'hybrid') {
    columns.splice(2, 0, {
      header: optionsCurrencyKeyAndValue[secondaryCurrency],
      field: 'secondary_currency',
    })
    columns.splice(3, 0, {
      header: 'Moeda',
      field: 'typeMoney',
    })
  }

  return columns
}

export const validateColumsHeadProps: any = {
  hybrid: columsHeadProps,
  oneCurrency: columsHeadProps,
}

export const initialDataSelectedData: ExpenseData = {
  id: '',
  type: '',
  description: '',
  value: '',
  value_primary_currency: 0,
  value_secondary_currency: 0,
  typeMoney: '',
}

export const useCalculationSumValues = (expensesData: ExpenseData[]) => {
  const calculationSumValues = useMemo(() => {
    if (expensesData.length <= 0) return []

    const calculation = expensesData.reduce(
      (acumulador, objetoAtual) => {
        acumulador.value_primary_currency =
          (acumulador.value_primary_currency ?? 0) +
          Number(objetoAtual.value_primary_currency)
        acumulador.value_secondary_currency =
          (acumulador.value_secondary_currency ?? 0) +
          Number(objetoAtual.value_secondary_currency)
        return acumulador
      },
      {
        id: '',
        type: '',
        description: 'Totais',
        value: '',
        value_primary_currency: 0,
        value_secondary_currency: 0,
        typeMoney: '',
      },
    )
    return [...expensesData, calculation]
  }, [expensesData])

  return {
    calculationSumValues,
  }
}

export const useGetTotalsFree = (calculationSumValues: ExpenseData[]) => {
  const getTotals: ExpenseData = useMemo(() => {
    const result = calculationSumValues.find(
      (item) => item.description === 'Totais',
    )

    if (result) return result

    return initialDataSelectedData
  }, [calculationSumValues])

  return {
    getTotals,
  }
}

export const optionsFilter = [
  { label: 'Limpar', value: '' },
  { label: 'Essencial', value: 'Essencial' },
  { label: 'Não essencial', value: 'Não essencial' },
  { label: 'Gasto Livre', value: 'Gasto Livre' },
]

function FixErroBuild() {
  return null
}

export default FixErroBuild
