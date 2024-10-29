import { useUserId } from '@/hooks/globalStates'
import { fetchDividends } from '@/services/finance/getDividends'
import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc, setDoc } from '@firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export interface IDividendProps {
  ticker: string
  reference: string
  quantity: number
  amount: number
  grossAmountPerShare: number
  amountInEuro: number
  paidOn: string
  type: string
}

export type IDividendsProps = IDividendProps[]

const func = async (idUser: string, arr: any[]) => {
  const docRef = doc(db, 'users', idUser, 'finance', 'dividends')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    await updateDoc(docRef, { data: arr })
    return 'Document updated successfully'
  }
  await setDoc(docRef, { data: arr }, { merge: true })
}

const get = async (idUser: string, size?: number) => {
  let query = doc(db, 'users', idUser, 'finance', 'dividends')

  if (size) {
    query = query.withConverter({
      fromFirestore: (snapshot) => {
        const data = snapshot.data()
        return data?.data.slice(0, size) as IDividendProps[]
      },
      toFirestore: (value) => value
    })
  }

  const docSnap = await getDoc(query)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data as IDividendProps[]
  }
  return []
}

export const useFetchDividends = () => {
  const { userId } = useUserId() as any
  const [currentPage, setCurrentPage] = useState(10)

  const {
    data: dividendsData,
    isFetching: isLoadingDividendsData,
    status: statusDividendsData,
    refetch: refetchDividendsDatasss
  } = useQuery({
    queryKey: ['dividends_data', currentPage, userId],
    queryFn: () => get(userId, currentPage),
    enabled: !!userId
  })

  const refetchDividendsData = async () => {
    const dividends = await fetchDividends('50')
    func(userId, dividends)
    refetchDividendsDatasss()
  }

  return {
    dividendsData: dividendsData ?? [],
    isLoadingDividendsData,
    statusDividendsData,
    refetchDividendsData,
    currentPage,
    setCurrentPage
  }
}

export default useFetchDividends
