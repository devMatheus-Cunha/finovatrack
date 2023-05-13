import { db } from '@/service/firebase';
import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserData } from '../../auth/useAuth/types';

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
  const router = useRouter();
  const { id } = router.query as { id: string };
  const queryClient = useQueryClient();

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
