'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

export const useExpenseFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const currentFilter = searchParams.get('q') || ''

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const setFilter = (term: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      if (term) {
        params.set('q', term)
      } else {
        params.delete('q')
      }
      replace(`${pathname}?${params.toString()}`)
    }, 300)
  }

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('q')
    replace(`${pathname}?${params.toString()}`)
  }

  return { filter: currentFilter, setFilter, clearFilter }
}
