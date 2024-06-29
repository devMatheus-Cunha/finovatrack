import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { IFinancialPlanningProps } from './getFinancialPlanningYear'

export async function updateFinancialPlanningYearData(
  data: IFinancialPlanningProps,
  idUser: string
) {
  const docRef = doc(
    db,
    'users',
    idUser,
    'financial_planning_year',
    data.id
  ) as any
  await updateDoc(docRef, { ...data })
}
