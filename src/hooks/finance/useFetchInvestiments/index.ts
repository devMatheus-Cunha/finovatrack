import { useUserId } from '@/hooks/globalStates'
import { getInvestments } from '@/services/finance/getInvestiments'
import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc, setDoc } from '@firebase/firestore'
import { useQuery } from '@tanstack/react-query'

export interface IInvestmentsProps {
  blocked: number
  free: number
  invested: number
  pieCash: number
  ppl: number
  result: number
  total: number
}

const func = async (idUser: string, data: any) => {
  const docRef = doc(db, 'users', idUser, 'finance', 'investiments')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    await updateDoc(docRef, data)
    return 'Document updated successfully'
  }
  await setDoc(docRef, data, { merge: true })
}

const get = async (idUser: string) => {
  const docRef = doc(db, 'users', idUser, 'finance', 'investiments')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data as IInvestmentsProps
  }
  return undefined
}

export const useFetchInvestiments = () => {
  const { userId } = useUserId() as any

  const {
    data: investimentsData,
    isFetching: isLoadingInvestimentsData,
    status: statusInvestimentsData,
    refetch: refetchInvestimentsDatassss
  } = useQuery(['investiments_data', userId], async () => get(userId), {
    enabled: !!userId
  })

  const refetchInvestimentsData = async () => {
    const investiments = await getInvestments()
    func(userId, investiments)
    refetchInvestimentsDatassss()
  }

  return {
    investimentsData,
    isLoadingInvestimentsData,
    statusInvestimentsData,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
