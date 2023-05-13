'use client';

import { doc, getDoc } from '@firebase/firestore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserData } from '../../auth/useAuth/types';
import { db } from '../../../../service/firebase';

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
  // const { id } = router.query as { id: string };
  const queryClient = useQueryClient();

  const id = '3gy9V810PwXjVpAABBi8bZN6JkO2';

  const checkAuthState = async () => {
    const myDocRef = doc(db, 'users', id);
    const myDocSnapshot = await getDoc(myDocRef);
    return myDocSnapshot.data() as UserData;
  };

  const userData = queryClient.getQueryData<UserData>(['user_data', id]) ?? initialState;

  useQuery<UserData>({
    queryKey: ['user_data', id],
    queryFn: checkAuthState,
    staleTime: Infinity,
    enabled: !!id,
    onSuccess: (data) => {
      queryClient.setQueryData(['user_data', id], data);
    },
  });

  return {
    userData,
  };
};

export default useUserData;
