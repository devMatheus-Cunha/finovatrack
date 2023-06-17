/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../firebase';

export interface SigingProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  typeAccount: string;
  primary_currency: string;
  secondary_currency: string;
  id?: string;
}

export type TDataUser = Omit<SigingProps, 'password' | 'confirmPassword'>

async function createDocumentForUser(data: TDataUser) {
  try {
    const myCollection = doc(db, 'users', data.id || '');
    await setDoc(myCollection, data, { merge: true });
  } catch (error) {
    throw new Error('Erro no servidor. Tente novamente mais tarde.');
  }
}

export async function siging({
  email,
  password,
  primary_currency,
  secondary_currency,
  typeAccount,
  ...rest
}: SigingProps) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const { user } = userCredential;

    const data: TDataUser = {
      email,
      primary_currency: typeAccount === 'hybrid' ? primary_currency : typeAccount,
      secondary_currency: typeAccount === 'hybrid' ? secondary_currency : '',
      typeAccount: typeAccount !== 'hybrid' ? 'oneCurrency' : typeAccount,
      id: user.uid,
      ...rest,
    };

    await createDocumentForUser(data);

    return user.uid;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email já está em uso.');
    }
    throw new Error('Erro no servidor. Tente novamente mais tarde.');
  }
}
