import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateMarketItem } from '@/services/market/updateMarketItem'
import { useFetchMarketItems } from './useFetchMarketItems'
import { useUserId } from '@/hooks/globalStates'

export const useUpdateMarketItem = () => {
  const { userId } = useUserId() as any
  const { refetchMarketItems } = useFetchMarketItems()

  const { mutateAsync: updateItem, status } = useMutation({
    mutationFn: (values: any) => updateMarketItem(values, userId),
    onSuccess: () => {
      refetchMarketItems()
      toast.success('Item atualizado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao atualizar item')
    }
  })

  return { updateItem, status }
}

export default useUpdateMarketItem
