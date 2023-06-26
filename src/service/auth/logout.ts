/* eslint-disable import/prefer-default-export */
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export async function logout() {
  await signOut(auth)
}
