import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { saveMarketHistory } from '@/services/market/saveMarketHistory'
import { useUserId } from '@/hooks/globalStates'

export const useSaveMarketHistory = () => {
  const { userId } = useUserId() as any

  const { mutateAsync: saveHistory, status } = useMutation({
    mutationFn: (data: any) => saveMarketHistory(data, userId),
    onSuccess: () => {
      toast.success('Histórico mensal salvo com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao salvar o resumo da compra.')
    }
  })

  return { saveHistory, isLoading: status === 'pending' }
}
