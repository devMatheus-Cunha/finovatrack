import { doc, getDoc, updateDoc, setDoc } from '@firebase/firestore'
import { db } from '../firebase'

export async function updateQuotationData(
  idUser: string,
  data: Record<string, any>
) {
  if (!idUser) {
    throw new Error('User not logged in')
  }

  const docRef = doc(db, 'users', idUser, 'quotation', 'last_quotation_data')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    await updateDoc(docRef, data)
    return 'Document updated successfully'
  }
  await setDoc(docRef, data, { merge: true })
  return 'Document created successfully'
}
