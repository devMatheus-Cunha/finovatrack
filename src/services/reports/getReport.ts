import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { ExpenseData } from '../expenses/getExpenses'

export interface IReportData {
  data: ExpenseData[]
  totalFree: string
  investments: {
    totalInvestments: any
    investmentPercentageFormat: any
    investmentPercentage: any
  }
  totalEntrys: string
  totalExpenses: string
  totalExpenseEurToReal: string
  period?: string
  quatation: string
}

export async function getReport(
  idUser: string,
  period: string
): Promise<IReportData | null> {
  if (!period) {
    return null
  }

  const reportsCollection = collection(db, 'users', String(idUser), 'reports')
  const periodQuery = query(reportsCollection, where('period', '==', period))

  try {
    const querySnapshot = await getDocs(periodQuery)

    if (querySnapshot.empty) {
      return null
    }

    const reportDoc = querySnapshot.docs[0]
    return { ...(reportDoc.data() as IReportData) }
  } catch (error) {
    console.error('Erro ao buscar relatório:', error)
    return null
  }
}
