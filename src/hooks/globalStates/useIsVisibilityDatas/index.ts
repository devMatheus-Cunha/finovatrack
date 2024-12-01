'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

const VISIBILITY_KEY = 'is_visibility_data'

const useIsVisibilityDatas = () => {
  const queryClient = useQueryClient()

  const getInitialData = () => {
    if (typeof localStorage !== 'undefined') {
      const storedValue = localStorage.getItem(VISIBILITY_KEY)
      return storedValue === 'true'
    }
    return true
  }

  const { data: isVisibilityData } = useQuery({
    queryKey: [VISIBILITY_KEY],
    queryFn: () => getInitialData(),
    initialData: getInitialData()
  })

  const handleToggleVisibilityData = () => {
    const currentValue = queryClient.getQueryData([VISIBILITY_KEY])
    const newValue = !currentValue

    queryClient.setQueryData([VISIBILITY_KEY], newValue)

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(VISIBILITY_KEY, String(newValue))
    }
  }

  return { isVisibilityData, handleToggleVisibilityData }
}

export default useIsVisibilityDatas
