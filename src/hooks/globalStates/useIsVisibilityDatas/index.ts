'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

const useIsVisibilityDatas = () => {
  const queryClient = useQueryClient()
  let initialData = true

  if (typeof localStorage !== 'undefined') {
    initialData = localStorage.getItem('isVisibilityData') === 'true'
  }

  const { data: isVisibilityData } = useQuery({
    queryKey: ['is_visibility_data'],
    initialData
  })

  const handleToggleVisibilityData = () => {
    const [queryKey, data] = queryClient
      .getQueriesData({
        queryKey: ['is_visibility_data']
      })
      .flat(Infinity)
    queryClient.setQueryData([queryKey], !data)
    localStorage.setItem('isVisibilityData', String(!data))
  }

  return { isVisibilityData, handleToggleVisibilityData }
}

export default useIsVisibilityDatas
