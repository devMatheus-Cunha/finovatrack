import { useState, useCallback } from 'react'

export interface FilterState {
 selectedRoom: string
 selectedCategory: string
 selectedBoughtStatus: string
 selectedPriorities: string[]
 includeBoughtInCalculations: boolean
}

export function useShoppingFilters() {
 const [selectedRoom, setSelectedRoom] = useState<string>('Todos')
 const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
 const [selectedBoughtStatus, setSelectedBoughtStatus] =
  useState<string>('Todos')
 const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
 const [includeBoughtInCalculations, setIncludeBoughtInCalculations] =
  useState<boolean>(false)

 const handleResetFilters = useCallback(() => {
  setSelectedRoom('Todos')
  setSelectedCategory('Todas')
  setSelectedBoughtStatus('Todos')
  setSelectedPriorities([])
  setIncludeBoughtInCalculations(false)
 }, [])

 const handlePriorityFilterChange = useCallback((priority: string) => {
  setSelectedPriorities((prev) =>
   prev.includes(priority)
    ? prev.filter((p) => p !== priority)
    : [...prev, priority]
  )
 }, [])

 const filters: FilterState = {
  selectedRoom,
  selectedCategory,
  selectedBoughtStatus,
  selectedPriorities,
  includeBoughtInCalculations
 }

 return {
  filters,
  setSelectedRoom,
  setSelectedCategory,
  setSelectedBoughtStatus,
  setSelectedPriorities,
  setIncludeBoughtInCalculations,
  handleResetFilters,
  handlePriorityFilterChange
 }
}
