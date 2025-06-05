import { collection, deleteDoc, getDocs } from '@firebase/firestore'
import { db } from '../firebase'

export async function clearExpenses(id: string) {
  const querySnapshot = await getDocs(collection(db, 'users', id, 'expenses'))
  const documents = querySnapshot.docs

  const promises: any[] = []
  documents.forEach((doc) => {
    promises.push(deleteDoc(doc.ref))
  })

  await Promise.all(promises)
}
