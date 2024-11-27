import { signInWithEmailAndPassword, updateEmail } from 'firebase/auth'
import { doc, updateDoc } from '@firebase/firestore'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { auth, db } from '../firebase'

export interface LoginProps {
  email: string
  password: string
}

export interface UpdatedPropsLogin {
  id: string
  expirationTimeToken?: string
  token?: string
}

export async function login({ email, password }: LoginProps) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { user } = userCredential
    return user
  } catch (error: any) {
    if (error.message === 'Firebase: Error (auth/user-not-found).') {
      throw new Error('Conta não encontrada')
    } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
      throw new Error('Senha incorreta')
    } else {
      throw new Error('Erro no Servidor. Tente mais tarde!')
    }
  }
}

export async function updatedDocumentForUser({ id, ...props }: UserData) {
  try {
    const myCollection = doc(db, 'users', id)
    await updateDoc(myCollection, {
      ...props
    })
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

export async function updatedEmailUser(email = '') {
  const user = auth.currentUser

  if (!user) {
    throw new Error('Nenhum usuário autenticado.')
  }

  try {
    await updateEmail(user, email)
  } catch (error) {
    throw new Error('Erro no servidor')
  }
}
