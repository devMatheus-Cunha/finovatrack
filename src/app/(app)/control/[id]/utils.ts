/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

'use client'

import { ExpenseData } from '@/hooks/expenses/useFetchExpensesData'
import { useMemo } from 'react'

type InfoCard = {
  titleEntrys: string
  titleExpenses: string
  titleExpensesEurToReal: string
  totalFree: string
  labelValueMoney: string
  placeholderValueAddExpense: string
}

enum TypeAccount {
  hybrid = 'hybrid',
  real = 'real',
  euro = 'euro',
}

type AuthData = {
  typeAccount?: TypeAccount | ''
}

type ValidTextForTypeAccount = {
  [key in TypeAccount]: InfoCard
}

export const authData: AuthData = {
  typeAccount: TypeAccount.hybrid,
}

export const validaTextForTypeAccount: ValidTextForTypeAccount = {
  hybrid: {
    titleEntrys: 'Total Entradas',
    titleExpenses: 'Total Gastos',
    totalFree: 'Total Investimento',
    labelValueMoney: 'Valor (R$):',
    placeholderValueAddExpense: 'Ex: R$ 10',
    titleExpensesEurToReal: 'Total Gastos Euro',
  },
  real: {
    titleEntrys: 'Total Entradas',
    titleExpenses: 'Total Gastos',
    totalFree: 'Total Livre ',
    labelValueMoney: 'Valor (R$):',
    placeholderValueAddExpense: 'Ex: R$ 10',
    titleExpensesEurToReal: '',
  },
  euro: {
    titleEntrys: 'Total Entradas',
    titleExpenses: 'Total Gastos',
    totalFree: 'Total Livre',
    labelValueMoney: 'Valor (€):',
    placeholderValueAddExpense: 'Ex: € 10',
    titleExpensesEurToReal: '',
  },
}

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

export const optionsCurrency: any = {
  USD: 'Valor Dólar USD',
  CAD: 'Valor Dólar CAD',
  EUR: 'Valor Euro',
  CHF: 'Valor Franco Suíço',
  GBP: 'Valor Libra',
  BRL: 'Valor Real',
}

export const labelCurrency: any = {
  USD: '$',
  CAD: 'CA$',
  EUR: '€',
  CHF: 'CHF',
  GBP: '£',
  BRL: 'R$',
}

export const columsHeadProps = (
  primaryCurrency: string,
  secondaryCurrency: string,
) => [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: optionsCurrency[primaryCurrency],
    field: 'primary_currency',
  },
  {
    header: optionsCurrency[secondaryCurrency],
    field: 'secondary_currency',
  },
  {
    header: 'Moeda',
    field: 'typeMoney',
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

export const columsHeadPropsEuro = [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: 'Valor Euro',
    field: 'euro_value',
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
export const columsHeadPropsReal = [
  {
    header: 'Descrição',
    field: 'description',
  },
  {
    header: 'Valor Real',
    field: 'real_value',
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

export const validateColumsHeadProps: any = {
  euro: columsHeadPropsEuro,
  real: columsHeadPropsReal,
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
