/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */

'use client';

import { sendPasswordResetEmail } from '@firebase/auth';
import { auth } from '../../../service/firebase';

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
