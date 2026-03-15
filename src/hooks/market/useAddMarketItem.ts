import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { addMarketItem } from '@/services/market/addMarketItem'
import { useFetchMarketItems } from './useFetchMarketItems'
import { useUserId } from '@/hooks/globalStates'

export const useAddMarketItem = () => {
  const { userId } = useUserId() as any
  const { refetchMarketItems } = useFetchMarketItems()

  const { mutateAsync: addItem, status } = useMutation({
    mutationFn: (values: Omit<any, 'id'>) => addMarketItem(values, userId),
    onSuccess: () => {
      refetchMarketItems()
      toast.success('Item adicionado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao adicionar item')
    }
  })

  return { addItem, status }
}

export default useAddMarketItem
