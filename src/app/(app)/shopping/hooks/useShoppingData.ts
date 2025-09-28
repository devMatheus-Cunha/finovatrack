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
          !item.properties.Comprado.checkbox)
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
    return countUniqueItems(filteredItems, includeBoughtInCalculations)
  }, [filteredItems, includeBoughtInCalculations])

  const totalOverallValue = useMemo(() => {
    return calculateTotalValue(filteredItems, includeBoughtInCalculations)
  }, [filteredItems, includeBoughtInCalculations])

  const totalSpentValue = useMemo(() => {
    return calculateTotalSpentValue(filteredItems)
  }, [filteredItems])

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

  return {
    uniqueRooms,
    uniqueCategories,
    filteredItems,
    totalUniqueItems,
    totalOverallValue,
    totalSpentValue,
    itemsByRoom
  }
}
