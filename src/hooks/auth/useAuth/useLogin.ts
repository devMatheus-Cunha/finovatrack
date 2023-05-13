/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */

'use client';

import { auth, db } from '@/service/firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';

const useLogin = () => {
  const loginWithEmail = async ({
    email,
    password,
  }: {
  email: string;
  password: string;
}) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user } = userCredential;
      return user;
    } catch (error) {
      throw error;
    }
  };
  const upadtedDocumentForUser = async ({ id, expirationTimeToken, token }: {id: string, expirationTimeToken: string, token: string }) => {
    const myCollection = doc(db, 'users', id);
    await updateDoc(myCollection, {
      token,
      expirationTimeToken,
    });
  };

  return {
    loginWithEmail,
    upadtedDocumentForUser,
  };
};

export default useLogin;
