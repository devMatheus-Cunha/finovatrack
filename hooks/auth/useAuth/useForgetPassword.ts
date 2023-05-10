/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import { auth } from '@/service/firebase';
import { sendPasswordResetEmail } from '@firebase/auth';

const useForgetPassword = () => {
  const forgetPassword = async ({ email }:{email: string}) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  return {
    forgetPassword,
  };
};

export default useForgetPassword;
