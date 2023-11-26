'use client'

import { doc, getDoc } from '@firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { UserData } from '../../auth/useAuth/types'
import { db } from '../../../service/firebase'

export const initialState: UserData = {
  id: '',
  expirationTimeToken: '',
  token: '',
  email: '',
  name: '',
  primary_currency: '',
  secondary_currency: '',
  typeAccount: 'hybrid'
}

const useUserData = () => {
  const router = useParams()

  const checkAuthState = async () => {
    const myDocRef = doc(db, 'users', router.id)
    const myDocSnapshot = await getDoc(myDocRef)
    return myDocSnapshot.data() as UserData
  }

  const { data, refetch: refetchUserData } = useQuery<UserData>({
    queryKey: ['user_data', router.id],
    queryFn: checkAuthState,
    staleTime: Infinity,
    enabled: !!router.id
  })

  const userData = data ?? initialState

  return {
    userData,
    refetchUserData
  }
}

export default useUserData
