import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import { db } from '../firebase'

export interface IFinancialPlanningProps {
  id: string
  year: string
  investments: string
  reserve: string
  monthlyContributions: string
  receivables: string
  deduction: string
  periodContributions: string
  totoalReserveLastYear?: string
}

export async function getFinancialPlanningYear(idUser: string) {
  const docsArray: IFinancialPlanningProps[] = []
  let queryRef = collection(db, 'users', idUser, 'financial_planning_year')

  queryRef = query(queryRef, orderBy('year')) as any

  const querySnapshot = await getDocs(queryRef)

  querySnapshot.forEach((doc) => {
    docsArray.push({
      id: doc.id,
      ...(doc.data() as any)
    } as IFinancialPlanningProps)
  })

  return docsArray
}
