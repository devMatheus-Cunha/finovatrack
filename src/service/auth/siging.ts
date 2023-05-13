import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { UserData } from '@/hooks/auth/useAuth/types';
import { auth, db } from '../firebase';

export interface SigingProps{
  email: string;
  password: string;
  name: string
  typeAccount: string
}

export async function siging({
  email,
  password,
  name,
  typeAccount,
}: SigingProps) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const { user } = userCredential;
  if (user) {
    await updateProfile(user, {
      displayName: name || '',
      photoURL: typeAccount,
    });
  }
  return user;
}

export async function createDocumentForUser(data: UserData) {
  const myCollection = doc(db, 'users', data.id);
  await setDoc(myCollection, data, { merge: true });
}
