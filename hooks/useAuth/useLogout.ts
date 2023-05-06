import { auth } from '@/service/firebase';
import { signOut } from '@firebase/auth';

const useLogout = () => {
  const logout = async () => {
  return signOut(auth);
};

 return {
   logout,
  };
}

export default useLogout;