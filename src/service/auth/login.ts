import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';
import { UserData } from '@/hooks/auth/useAuth/types';
import { auth, db } from '../firebase';

export interface LoginProps {
  email: string,
  password: string
}

export interface UpdatedPropsLogin {
  id: string,
  expirationTimeToken?: string,
  token?: string,
}

export async function login({ email, password }: LoginProps) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    return user;
  } catch (error) {
    throw new Error('Erro no servidor');
  }
}

export async function updatedDocumentForUser(
  {
    id,
    ...props
  }: UserData,
) {
  try {
    const myCollection = doc(db, 'users', id);
    await updateDoc(myCollection, {
      ...props,
    });

    return { res: 'deu bom' };
  } catch (error) {
    throw new Error('Erro no servidor');
  }
}
