import { useUserId } from '@/hooks/globalStates'
import { getAllPies } from '@/services/finance/getAllPies'
import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc, setDoc } from '@firebase/firestore'
import { useQuery } from '@tanstack/react-query'

export interface IGetAllPies {
  id: number
  cash: number
  dividendDetails: {
    gained: number
    reinvested: number
    inCash: number
  }
  result: {
    priceAvgInvestedValue: number
    priceAvgResult: number
    priceAvgResultCoef: number
    priceAvgValue: number
  }
  progress: number
  status: null
}

const func = async (idUser: string, data: any) => {
  const docRef = doc(db, 'users', idUser, 'finance', 'allPies')
  const docSnap = await getDoc(docRef)

  if (!data[0]) return
  if (docSnap.exists()) {
    await updateDoc(docRef, data[0])
    return 'Document updated successfully'
  }
  await setDoc(docRef, data[0], { merge: true })
}

const get = async (idUser: string) => {
  const docRef = doc(db, 'users', idUser, 'finance', 'allPies')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data as IGetAllPies
  }
  return undefined
}

export const useFetchAllPies = () => {
  const { userId } = useUserId() as any

  const {
    data: allPiesData,
    isFetching: isLoadingAllPiesData,
    status: statusAllPiesData,
    refetch: refetchAllPiesDataasss
  } = useQuery({
    queryKey: ['all_pies_data', userId],
    queryFn: () => get(userId),
    enabled: !!userId
  })

  const refetchAllPiesData = async () => {
    const allpies = await getAllPies()
    func(userId, allpies)
    refetchAllPiesDataasss()
  }

  return {
    allPiesData: allPiesData,
    isLoadingAllPiesData,
    statusAllPiesData,
    refetchAllPiesData
  }
}

export default useFetchAllPies
