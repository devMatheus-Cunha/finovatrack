import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { IReportData } from './getReport'

export interface IReportToYearData {
  totalFree: number
  totalEntrys: number
  totalExpenses: number
  totalExpenseEurToReal: number
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
    totalFree: 0,
    totalEntrys: 0,
    totalExpenses: 0,
    totalExpenseEurToReal: 0
  }

  
  const sum = docsArray.reduce<IReportToYearData>(
    (accumulator, currentValue) => {
      return {
        totalFree: accumulator.totalFree + parseAndSum(currentValue.totalFree),
        totalEntrys:
          accumulator.totalEntrys + parseAndSum(currentValue.totalEntrys),
        totalExpenses:
          accumulator.totalExpenses + parseAndSum(currentValue.totalExpenses),
        totalExpenseEurToReal:
          accumulator.totalExpenseEurToReal +
          parseAndSum(currentValue.totalExpenseEurToReal)
      }
    },
    initialValue
  )

  return sum
}
