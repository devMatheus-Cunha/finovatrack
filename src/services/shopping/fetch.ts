// Serviço para buscar itens da lista de compras do Firebase, com suporte a filtros
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import type { IItem } from '@/app/(app)/shopping/types'

const SHOPPING_COLLECTION = 'shoppingItems'

export interface ShoppingItemFilters {
  room?: string
  category?: string
  boughtStatus?: 'Todos' | 'Comprado' | 'Nao Comprado' | 'Compra Antecipada'
  priorities?: string[]
  orderByField?: 'price' | 'name'
  orderDirection?: 'asc' | 'desc'
}

export async function fetchShoppingItems(
  userId: string,
  filters: ShoppingItemFilters = {}
): Promise<IItem[]> {
  // Monta a query de ordenação dinâmica
  let orderField = 'price'
  let orderDir: 'asc' | 'desc' = 'desc'
  if (filters.orderByField) orderField = filters.orderByField
  if (filters.orderDirection) orderDir = filters.orderDirection
  // Ajusta o campo para Firestore
  let firestoreField = 'price'
  if (orderField === 'name') {
    firestoreField = 'name'
  }
  let q
  try {
    q = query(
      collection(db, 'users', userId, SHOPPING_COLLECTION),
      orderBy(firestoreField, orderDir)
    )
  } catch (e) {
    // fallback para price caso o campo de nome não exista no Firestore
    q = query(
      collection(db, 'users', userId, SHOPPING_COLLECTION),
      orderBy('price', orderDir)
    )
  }
  const snapshot = await getDocs(q)
  // Corrige para garantir que cada item tenha a estrutura .properties
  let items = snapshot.docs.map((doc) => {
    const data = doc.data()
    if (data.properties) {
      return { id: doc.id, ...data } as IItem
    } else {
      return {
        id: doc.id,
        properties: {
          Nome: { title: [{ plain_text: data.name }] },
          Comodo: { select: { name: data.room } },
          Categoria: { select: { name: data.category } },
          Quantidade: { number: data.quantity },
          Preco: { number: data.price },
          Comprado: { checkbox: data.bought },
          // Suporte ao novo campo `earlyPurchase` (pode existir em documentos novos ou antigos)
          earlyPurchase: data.earlyPurchase || false,
          links: data.links || [],
          productInfo: data.productInfo,
          priority: data.priority
        }
      } as IItem
    }
  })
  // Aplica filtros manualmente
  if (filters.room && filters.room !== 'Todos') {
    items = items.filter(
      (item) => item.properties.Comodo.select.name === filters.room
    )
  }
  if (filters.category && filters.category !== 'Todas') {
    items = items.filter(
      (item) => item.properties.Categoria.select.name === filters.category
    )
  }
  if (filters.boughtStatus && filters.boughtStatus !== 'Todos') {
    items = items.filter((item) => {
      if (filters.boughtStatus === 'Comprado') {
        return item.properties.Comprado.checkbox
      }
      if (filters.boughtStatus === 'Nao Comprado') {
        // Não comprado = não está marcado como comprado e não é compra antecipada
        return (
          !item.properties.Comprado.checkbox && !item.properties.earlyPurchase
        )
      }
      if (filters.boughtStatus === 'Compra Antecipada') {
        return !!item.properties.earlyPurchase
      }
      return true
    })
  }
  if (filters.priorities && filters.priorities.length > 0) {
    items = items.filter(
      (item) =>
        item.properties.priority &&
        filters.priorities &&
        filters.priorities.includes(item.properties.priority)
    )
  }
  return items
}

export function calculateTotalValue(
  items: IItem[],
  includeBought: boolean,
  includeEarlyPurchase: boolean
) {
  return items
    .filter((item) => {
      // Se já comprou
      if (item.properties.Comprado.checkbox) return includeBought
      // Se é compra antecipada
      if (item.properties.earlyPurchase) return includeEarlyPurchase
      // Caso padrão: item não comprado e não antecipado - incluir
      return true
    })
    .reduce(
      (acc, item) =>
        acc +
        (item.properties.Preco.number || 0) *
          (item.properties.Quantidade?.number || 1),
      0
    )
}

export function countUniqueItems(
  items: IItem[],
  includeBought: boolean,
  includeEarlyPurchase: boolean
) {
  return items.filter((item) => {
    if (item.properties.Comprado.checkbox) return includeBought
    if (item.properties.earlyPurchase) return includeEarlyPurchase
    return true
  }).length
}

export function calculateTotalSpentValue(items: IItem[]) {
  return items
    .filter((item) => item.properties.Comprado.checkbox)
    .reduce(
      (acc, item) =>
        acc +
        (item.properties.Preco.number || 0) *
          (item.properties.Quantidade?.number || 1),
      0
    )
}
