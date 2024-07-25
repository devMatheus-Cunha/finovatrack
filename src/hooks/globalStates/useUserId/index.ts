import { useQuery, useQueryClient } from '@tanstack/react-query'

const USER_ID_QUERY_KEY = ['userId']
const USER_ID_STORAGE_KEY = 'userId'
function useUserId() {
  const queryClient = useQueryClient()

  const setUserId = (userId: string) => {
    queryClient.setQueryData(USER_ID_QUERY_KEY, userId)
    localStorage.setItem(USER_ID_STORAGE_KEY, userId)
  }

  const clearUserId = () => {
    queryClient.removeQueries(USER_ID_QUERY_KEY)
    localStorage.removeItem(USER_ID_STORAGE_KEY)
  }

  const { data: userId } = useQuery(
    USER_ID_QUERY_KEY,
    () => {
      const storedUserId = localStorage.getItem(USER_ID_STORAGE_KEY)
      return storedUserId ?? null
    },
    {
      staleTime: Infinity,
      enabled: true
    }
  )

  return { userId, setUserId, clearUserId }
}
export default useUserId
