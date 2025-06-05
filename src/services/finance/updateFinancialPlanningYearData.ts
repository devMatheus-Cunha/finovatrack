import { doc, setDoc } from '@firebase/firestore'
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
  // Usa setDoc para criar ou sobrescrever o documento
  await setDoc(docRef, { ...data })
}
