// Serviço para adicionar e editar itens da lista de compras no Firebase
import { db } from '../firebase'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore'
import type { IFormData, IItem } from '@/app/(app)/shopping/types'
import { getFormattedTodayDate } from '@/app/(app)/shopping/utils/helpers'

const SHOPPING_COLLECTION = 'shoppingItems'

export async function addShoppingItem(
  userId: string,
  data: IFormData
): Promise<IItem> {
  const links = data.links.map((link) => ({
    ...link,
    historicoPrecos: link.price
      ? [{ price: link.price, date: getFormattedTodayDate() }]
      : []
  }))

  const sanitize = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map((v) => sanitize(v))
    }
    if (value && typeof value === 'object') {
      const out: any = {}
      Object.keys(value).forEach((k) => {
        const v = value[k]
        if (v !== undefined) {
          out[k] = sanitize(v)
        }
      })
      return out
    }
    return value
  }

  const payload = {
    ...data,
    links,
    earlyPurchase: (data as any).earlyPurchase ?? false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }

  const cleanPayload = sanitize(payload)

  const docRef = await addDoc(
    collection(db, 'users', userId, SHOPPING_COLLECTION),
    cleanPayload
  )
  const docSnap = await getDoc(docRef)
  return { id: docRef.id, ...docSnap.data() } as IItem
}

export async function editShoppingItem(
  userId: string,
  id: string,
  data: IFormData
): Promise<IItem> {
  const itemRef = doc(db, 'users', userId, SHOPPING_COLLECTION, id)
  const docSnap = await getDoc(itemRef)
  const currentItem = docSnap.data() as any // Firebase retorna um objeto plano
  const updatedLinks = data.links.map((newLinkData) => {
    const oldLink = currentItem?.links?.find(
      (l: any) => l.url === newLinkData.url
    )
    const oldLinkPrice = oldLink?.price !== undefined ? oldLink.price : -1
    const oldLinkHistory = oldLink?.historicoPrecos || []
    let newLinkHistory = [...oldLinkHistory]
    if (newLinkData.price !== undefined && newLinkData.price !== oldLinkPrice) {
      const lastHistoryPrice =
        newLinkHistory.length > 0 ? newLinkHistory[0].price : -1
      if (oldLinkPrice !== -1 && oldLinkPrice !== lastHistoryPrice) {
        newLinkHistory = [
          { price: oldLinkPrice, date: getFormattedTodayDate() },
          ...newLinkHistory
        ]
      }
      newLinkHistory = [
        { price: newLinkData.price, date: getFormattedTodayDate() },
        ...newLinkHistory
      ]
    }
    const uniqueEntriesMap = new Map()
    newLinkHistory.forEach((entry: any) => {
      if (!uniqueEntriesMap.has(entry.price)) {
        uniqueEntriesMap.set(entry.price, entry)
      }
    })
    const finalHistory = Array.from(uniqueEntriesMap.values())
      .sort((a: any, b: any) => {
        const [dayA, monthA, yearA] = a.date.split('/')
        const dateA = new Date(`${yearA}-${monthA}-${dayA}`).getTime()
        const [dayB, monthB, yearB] = b.date.split('/')
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`).getTime()
        return dateB - dateA
      })
      .slice(0, 10)
    return {
      ...newLinkData,
      historicoPrecos: finalHistory
    }
  })
  // sanitize update payload to avoid sending `undefined` values to Firestore
  const sanitize = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map((v) => sanitize(v))
    }
    if (value && typeof value === 'object') {
      const out: any = {}
      Object.keys(value).forEach((k) => {
        const v = value[k]
        if (v !== undefined) {
          out[k] = sanitize(v)
        }
      })
      return out
    }
    return value
  }

  const updatePayload = sanitize({
    ...data,
    links: updatedLinks,
    // keep updatedAt timestamp
    updatedAt: serverTimestamp()
  })

  await updateDoc(itemRef, updatePayload)
  const updatedSnap = await getDoc(itemRef)
  return { id, ...updatedSnap.data() } as IItem
}
