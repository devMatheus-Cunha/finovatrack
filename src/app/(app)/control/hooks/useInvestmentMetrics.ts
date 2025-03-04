import { ExpenseData } from '@/services/expenses/getExpenses'

export const useInvestmentMetrics = (
  transactions: ExpenseData[],
  totalEntrys: number
) => {
  const totalInvestments = transactions.reduce((acc, transaction) => {
    return transaction.category === 'Investimentos'
      ? acc + transaction.value_primary_currency
      : acc
  }, 0)

  const investmentPercentage = ((totalInvestments / totalEntrys) * 100).toFixed(
    2
  )

  return {
    investments: {
      totalInvestments,
      investmentPercentageFormat: `${investmentPercentage}%`,
      investmentPercentage: Number(investmentPercentage)
    }
  }
}
