import { useMemo } from 'react'
import { IItem } from '../types'
import { FilterState } from './useShoppingFilters'
import {
  calculateTotalValue,
  countUniqueItems,
  calculateTotalSpentValue
} from '@/services/shopping/fetch'

export function useShoppingData(items: IItem[], filters: FilterState) {
  const {
    selectedRoom,
    selectedCategory,
    selectedBoughtStatus,
    selectedPriorities,
    includeBoughtInCalculations
  } = filters

  const uniqueRooms = useMemo(() => {
    const rooms = new Set(
      items.map((item) => item.properties.Comodo.select.name)
    )
    return ['Todos', ...Array.from(rooms)].sort()
  }, [items])

  const uniqueCategories = useMemo(() => {
    const categories = new Set(
      items.map((item) => item.properties.Categoria.select.name)
    )
    return ['Todas', ...Array.from(categories)].sort()
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesRoom =
        selectedRoom === 'Todos' ||
        item.properties.Comodo.select.name === selectedRoom
      const matchesCategory =
        selectedCategory === 'Todas' ||
        item.properties.Categoria.select.name === selectedCategory
      const matchesBoughtStatus =
        selectedBoughtStatus === 'Todos' ||
        (selectedBoughtStatus === 'Comprado' &&
          item.properties.Comprado.checkbox) ||
        (selectedBoughtStatus === 'Nao Comprado' &&
          !item.properties.Comprado.checkbox &&
          !item.properties.earlyPurchase) ||
        (selectedBoughtStatus === 'Compra Antecipada' &&
          !!item.properties.earlyPurchase)
      const matchesPriority =
        selectedPriorities.length === 0 ||
        (item.properties.priority &&
          selectedPriorities.includes(item.properties.priority))
      return (
        matchesRoom && matchesCategory && matchesBoughtStatus && matchesPriority
      )
    })
  }, [
    items,
    selectedRoom,
    selectedCategory,
    selectedBoughtStatus,
    selectedPriorities
  ])

  const totalUniqueItems = useMemo(() => {
    return countUniqueItems(
      filteredItems,
      includeBoughtInCalculations,
      filters.includeEarlyPurchaseInCalculations
    )
  }, [
    filteredItems,
    includeBoughtInCalculations,
    filters.includeEarlyPurchaseInCalculations
  ])

  const totalOverallValue = useMemo(() => {
    // Se o filtro atual é 'Compra Antecipada', queremos mostrar o total estimado desses itens
    if (filters.selectedBoughtStatus === 'Compra Antecipada') {
      return filteredItems.reduce(
        (acc, item) =>
          acc +
          (item.properties.Preco?.number || 0) *
            (item.properties.Quantidade?.number || 1),
        0
      )
    }

    return calculateTotalValue(
      filteredItems,
      includeBoughtInCalculations,
      filters.includeEarlyPurchaseInCalculations
    )
  }, [
    filteredItems,
    includeBoughtInCalculations,
    filters.includeEarlyPurchaseInCalculations,
    filters.selectedBoughtStatus
  ])

  const totalSpentValue = useMemo(() => {
    // Se o filtro selecionado é 'Compra Antecipada', exibir soma dos itens de compra antecipada
    if (filters.selectedBoughtStatus === 'Compra Antecipada') {
      return filteredItems
        .filter((item) => !!item.properties.earlyPurchase)
        .reduce(
          (acc, item) =>
            acc +
            (item.properties.Preco.number || 0) *
              (item.properties.Quantidade?.number || 1),
          0
        )
    }

    // Caso padrão: soma dos itens marcados como Comprado
    const boughtTotal = calculateTotalSpentValue(filteredItems)

    // Se o checkbox de incluir compra antecipada estiver marcado, some também os itens antecipados
    if (filters.includeEarlyPurchaseInCalculations) {
      const earlyTotal = filteredItems
        .filter((item) => !!item.properties.earlyPurchase)
        .reduce(
          (acc, item) =>
            acc +
            (item.properties.Preco.number || 0) *
              (item.properties.Quantidade?.number || 1),
          0
        )
      return boughtTotal + earlyTotal
    }

    return boughtTotal
  }, [
    filteredItems,
    filters.selectedBoughtStatus,
    filters.includeEarlyPurchaseInCalculations
  ])

  const itemsByRoom = useMemo(() => {
    const grouped: { [key: string]: { items: IItem[]; totalValue: number } } =
      {}
    filteredItems.forEach((item) => {
      const roomName = item.properties.Comodo.select.name
      if (!grouped[roomName]) {
        grouped[roomName] = {
          items: [],
          totalValue: 0
        }
      }
      grouped[roomName].items.push(item)
      const priceToUse = item.properties.Preco?.number || 0
      grouped[roomName].totalValue +=
        priceToUse * (item.properties.Quantidade?.number || 1)
    })
    return grouped
  }, [filteredItems])

  const earlyTotal = useMemo(() => {
    return filteredItems
      .filter((item) => !!item.properties.earlyPurchase)
      .reduce(
        (acc, item) =>
          acc +
          (item.properties.Preco?.number || 0) *
            (item.properties.Quantidade?.number || 1),
        0
      )
  }, [filteredItems])

  const boughtTotal = useMemo(() => {
    return filteredItems
      .filter((item) => !!item.properties.Comprado.checkbox)
      .reduce(
        (acc, item) =>
          acc +
          (item.properties.Preco?.number || 0) *
            (item.properties.Quantidade?.number || 1),
        0
      )
  }, [filteredItems])

  // Soma dos itens que ainda não foram comprados e não são antecipados (reservados)
  const baseOverallValue = useMemo(() => {
    return filteredItems
      .filter(
        (item) =>
          !item.properties.Comprado.checkbox && !item.properties.earlyPurchase
      )
      .reduce(
        (acc, item) =>
          acc +
          (item.properties.Preco?.number || 0) *
            (item.properties.Quantidade?.number || 1),
        0
      )
  }, [filteredItems])

  return {
    uniqueRooms,
    uniqueCategories,
    filteredItems,
    totalUniqueItems,
    totalOverallValue,
    totalSpentValue,
    earlyTotal,
    boughtTotal,
    baseOverallValue,
    itemsByRoom
  }
}
