import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../firebase';

export interface SigingProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  typeAccount: string;
  primary_currency?: string;
  secondary_currency?: string;
  id?: string;
}

export async function siging({
  email,
  password,
  confirmPassword,
  name,
}: SigingProps) {
  if (!email || !password || !confirmPassword || !name) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  if (password !== confirmPassword) {
    throw new Error('As senhas não correspondem.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const { user } = userCredential;
    return user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email já está em uso.');
    } else {
      throw new Error('Erro no servidor. Tente novamente mais tarde.');
    }
  }
}

export async function createDocumentForUser(data: SigingProps) {
  if (!data.id) {
    throw new Error('O ID do usuário é obrigatório.');
  }

  const myCollection = doc(db, 'users', data.id);
  await setDoc(myCollection, data, { merge: true });
}
