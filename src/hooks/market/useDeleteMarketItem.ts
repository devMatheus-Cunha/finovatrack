import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteMarketItem } from '@/services/market/deleteMarketItem'
import { useFetchMarketItems } from './useFetchMarketItems'
import { useUserId } from '@/hooks/globalStates'

export const useDeleteMarketItem = () => {
  const { userId } = useUserId() as any
  const { refetchMarketItems } = useFetchMarketItems()

  const { mutateAsync: deleteItem, status } = useMutation({
    mutationFn: (values: any) => deleteMarketItem(values, userId),
    onSuccess: () => {
      refetchMarketItems()
      toast.success('Item removido com sucesso')
    },
    onError: () => {
      toast.error('Erro ao remover item')
    }
  })

  return { deleteItem, status }
}

export default useDeleteMarketItem
