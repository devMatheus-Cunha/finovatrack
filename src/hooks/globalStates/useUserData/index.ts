'use client'

import { doc, getDoc } from '@firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { UserData } from '../../entrys/useDeletedEntry/auth/useAuth/types'
import { db } from '../../../services/firebase'
import useUserId from '../useUserId'

export const initialState: UserData = {
  id: '',
  expirationTimeToken: '',
  token: '',
  email: '',
  name: '',
  primary_currency: '',
  secondary_currency: '',
  typeAccount: '',
  admin: false
}

const useUserData = () => {
  const { userId } = useUserId() as any

  const checkAuthState = async () => {
    const myDocRef = doc(db, 'users', userId)
    const myDocSnapshot = await getDoc(myDocRef)
    return myDocSnapshot.data() as UserData
  }

  const { data, refetch: refetchUserData } = useQuery<UserData>({
    queryKey: ['user_data', userId],
    queryFn: checkAuthState,
    staleTime: Infinity,
    enabled: !!userId
  })

  const userData = data ?? initialState

  return {
    userData,
    refetchUserData
  }
}

export default useUserData
