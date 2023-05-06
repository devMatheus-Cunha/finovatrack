import { db } from '@/service/firebase';
import { doc, getDoc } from '@firebase/firestore';
import { UserData } from '../useAuth/types';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

export const initialState: UserData = {
  id: '',
  expirationTimeToken: '',
  token: '',
  email: '',
  name: '',
  typeAccount: 'hybrid',
};

interface IUseUserProps {
  userData: UserData;
}

const useUser = (): IUseUserProps => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const checkAuthState = async () => {
    const myDocRef = doc(db, 'users', id);
    const myDocSnapshot = await getDoc(myDocRef);
    return myDocSnapshot.data() as UserData;
  };
  
  const { data } = useQuery<UserData>({
    queryKey: ['user_data', id],
    queryFn: checkAuthState,
    staleTime: Infinity, // Manter o cache indefinidamente
    enabled: !!id
  });

  const userData = data ?? initialState;

  return {
    userData,
  };
};

export default useUser;
