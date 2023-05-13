'use client';

import { doc, getDoc } from '@firebase/firestore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { UserData } from '../../auth/useAuth/types';
import { db } from '../../../service/firebase';

export const initialState: UserData = {
  id: '',
  expirationTimeToken: '',
  token: '',
  email: '',
  name: '',
  typeAccount: 'hybrid',
};

export interface IUseUserProps {
  userData: UserData;
}

const useUserData = (): IUseUserProps => {
  const router = useParams();

  const queryClient = useQueryClient();

  const checkAuthState = async () => {
    const myDocRef = doc(db, 'users', router.id);
    const myDocSnapshot = await getDoc(myDocRef);
    return myDocSnapshot.data() as UserData;
  };

  const userData = queryClient.getQueryData<UserData>(['user_data', router.id]) ?? initialState;

  useQuery<UserData>({
    queryKey: ['user_data', router.id],
    queryFn: checkAuthState,
    staleTime: Infinity,
    enabled: !!router.id,
    onSuccess: (data) => {
      queryClient.setQueryData(['user_data', router.id], data);
    },
  });

  return {
    userData,
  };
};

export default useUserData;
