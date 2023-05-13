'use client';

import { signOut } from '@firebase/auth';
import { auth } from '../../../../service/firebase';

const useLogout = () => {
  const logout = async () => signOut(auth);

  return {
    logout,
  };
};

export default useLogout;
