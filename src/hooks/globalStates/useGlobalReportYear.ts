import { queryClient } from '@/app/providers'
import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'globalReportYear'

export function useGlobalReportYear() {
  const [reportYear, setReportYearState] = useState<number>(() => {
    const storedYear = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storedYear ? parseInt(storedYear, 10) : new Date().getFullYear()
  })

  const setReportYear = (year: number) => {
    setReportYearState(year)
    localStorage.setItem(LOCAL_STORAGE_KEY, year.toString())
    queryClient.invalidateQueries()
  }

  useEffect(() => {
    const storedYear = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedYear) {
      setReportYearState(parseInt(storedYear, 10))
    }
  }, [])

  return { reportYear, setReportYear }
}
