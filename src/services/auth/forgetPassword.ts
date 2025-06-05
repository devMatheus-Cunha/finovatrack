import { sendPasswordResetEmail } from '@firebase/auth'
import { auth } from '../firebase'

export interface LogoutProps {
  email: string
}

export async function forgetPassword({ email }: LogoutProps) {
  await sendPasswordResetEmail(auth, email)
}
