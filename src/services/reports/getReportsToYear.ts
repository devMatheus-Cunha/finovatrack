import { collection, getDocs, query, where } from '@firebase/firestore'
import { db } from '../firebase'
import { IReportData } from './getReport'

export interface IReportToYearData {
  totalInvestments: number
  totalFree: number
  totalEntrys: number
  totalExpenses: number
  totalExpenseEurToReal: number
  mediaExpenses: number
  mediaExpenseToCategory: Record<string, number>
  mediaExpenseToSubcategory: Record<string, Record<string, number>>
}

function parseAndSum(values: string | number): number {
  if (typeof values === 'string') {
    return values.split(',').reduce((sum, value) => {
      const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''))
      return !isNaN(numericValue) ? sum + numericValue : sum
    }, 0)
  } else if (typeof values === 'number') {
    return values
  }
  return 0
}

export async function getReportsToYear(
  idUser: string,
  year: string
): Promise<IReportToYearData> {
  const reportsRef = collection(db, 'users', idUser, 'reports')
  const reportsQuery = query(reportsRef, where('year', '==', year))

  const querySnapshot = await getDocs(reportsQuery)

  const docsArray: IReportData[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as IReportData
    return { id: doc.id, ...data }
  })

  const initialValue: IReportToYearData = {
    totalInvestments: 0,
    totalFree: 0,
    totalEntrys: 0,
    totalExpenses: 0,
    totalExpenseEurToReal: 0,
    mediaExpenses: 0,
    mediaExpenseToCategory: {},
    mediaExpenseToSubcategory: {}
  }

  const now = new Date()
  const currentMonth = now.getMonth() + 1 // Janeiro = 0
  const totalExpenses = docsArray.reduce(
    (acc, curr) => acc + parseAndSum(curr.totalExpenses),
    0
  )

  const totalExpensesForAverage = totalExpenses - 1000
  const categoryTotals: Record<string, number> = {}
  const subcategoryTotals: Record<string, Record<string, number>> = {}

  docsArray.forEach((report) => {
    if (Array.isArray(report.data)) {
      report.data.forEach((expense: any) => {
        if (expense.category === 'Investimentos') return
        const valor = Number(expense.value_primary_currency)

        categoryTotals[expense.category] =
          (categoryTotals[expense.category] || 0) + valor

        // <-- AQUI ESTÁ A LINHA ALTERADA -->
        // Garante que só calculamos a subcategoria se ela for um objeto válido com a propriedade 'value'.
        if (expense.subcategory && expense.subcategory.value) {
          if (!subcategoryTotals[expense.category]) {
            subcategoryTotals[expense.category] = {}
          }
          const subcatValue = expense.subcategory.value
          subcategoryTotals[expense.category][subcatValue] =
            (subcategoryTotals[expense.category][subcatValue] || 0) + valor
        }
      })
    }
  })

  // Calculate averages
  const mediaExpenses =
    currentMonth > 0 ? totalExpensesForAverage / currentMonth : 0
  const mediaExpenseToCategory: Record<string, number> = {}
  const mediaExpenseToSubcategory: Record<string, Record<string, number>> = {}

  // Category averages
  Object.keys(categoryTotals).forEach((cat) => {
    mediaExpenseToCategory[cat] = categoryTotals[cat] / currentMonth
  })

  // Subcategory averages
  Object.keys(subcategoryTotals).forEach((cat) => {
    mediaExpenseToSubcategory[cat] = {}
    Object.keys(subcategoryTotals[cat]).forEach((subcat) => {
      mediaExpenseToSubcategory[cat][subcat] =
        subcategoryTotals[cat][subcat] / currentMonth
    })
  })

  const sum = docsArray.reduce<IReportToYearData>(
    (accumulator, currentValue) => {
      return {
        totalInvestments:
          accumulator.totalInvestments +
          (currentValue.investments?.totalInvestments || 0),
        totalFree: accumulator.totalFree + parseAndSum(currentValue.totalFree),
        totalEntrys:
          accumulator.totalEntrys + parseAndSum(currentValue.totalEntrys),
        totalExpenses:
          accumulator.totalExpenses + parseAndSum(currentValue.totalExpenses),
        totalExpenseEurToReal:
          accumulator.totalExpenseEurToReal +
          parseAndSum(currentValue.totalExpenseEurToReal),
        mediaExpenses,
        mediaExpenseToCategory,
        mediaExpenseToSubcategory
      }
    },
    initialValue
  )

  return {
    ...sum,
    mediaExpenses,
    mediaExpenseToCategory,
    mediaExpenseToSubcategory
  }
}
