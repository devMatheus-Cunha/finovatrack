import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../firebase';

export interface LoginProps{
 email: string,
 password: string
}

export interface UpadtedPropsLogin {
 id: string,
 expirationTimeToken: string,
 token: string,
}

export async function login({ email, password }: LoginProps) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const { user } = userCredential;
  return user;
}

export async function upadtedDocumentForUser(
  {
    token,
    expirationTimeToken,
    id,
  }: UpadtedPropsLogin,
) {
  const myCollection = doc(db, 'users', id);
  await updateDoc(myCollection, {
    token,
    expirationTimeToken,
  });
}
