/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */

'use client';

import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../../../../service/firebase';
import { UserData } from './types';

const useCreateAccount = () => {
  const createAccountUser = async ({
    email,
    password,
    name,
    type_account,
  }: {
  email: string;
  password: string;
  name: string
  type_account: string
}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user } = userCredential;
      if (user) {
        await updateProfile(user, {
          displayName: name || '',
          photoURL: type_account,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  const createDocumentForUser = async (data: UserData) => {
    const myCollection = doc(db, 'users', data.id);
    await setDoc(myCollection, data, { merge: true });
  };

  return {
    createAccountUser,
    createDocumentForUser,
  };
};

export default useCreateAccount;
