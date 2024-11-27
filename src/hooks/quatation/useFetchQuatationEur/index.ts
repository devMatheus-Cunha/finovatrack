import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { getQuatationRateFromAPI } from '@/services/quatation/getQuatationRateFromAPI'
import { updateQuotationData } from '@/services/quatation/updateQuotationData'
import { getLastQuotationData } from '@/services/quatation/getLastQuotationData'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import { useUserId } from '@/hooks/globalStates'

export type RefetchQuationDataType = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<void, Error>>

const useFetchQuatationEur = (userData: UserData, amount = 0) => {
  const { userId } = useUserId() as any
  const toastId: any = React.useRef(null)

  const { data: lastQuatationData, refetch: refetchLastQuotationData } =
    useQuery({
      queryKey: ['last_quotation_data', userId],
      queryFn: async () => await getLastQuotationData(userId),
      enabled: !!userId
    })

  const { mutateAsync: addLastQuotation } = useMutation({
    mutationFn: (data: Record<string, any>) =>
      updateQuotationData(userId, data),
    onSuccess: async () => await refetchLastQuotationData()
  })

  const { refetch: refetchQuationData } = useQuery({
    queryKey: ['quatation_data'],
    queryFn: async () => {
      if (toastId.current === null) {
        toastId.current = toast('Atualizando Cotação...', { autoClose: false })
      }
      const res = await getQuatationRateFromAPI(amount === 0 ? 1 : amount, {
        primary_currency: userData.primary_currency,
        secondary_currency: userData.secondary_currency
      })

      if (res) {
        addLastQuotation(res)
        toast.update(toastId.current, {
          type: 'success',
          render: 'Sucesso ao atualizar cotação',
          className: 'rotateY animated',
          autoClose: 5000
        })
        toastId.current = null
        return
      }
      toast.update(toastId.current, {
        type: 'error',
        render: 'Erro ao atualizar cotação',
        autoClose: 5000
      })
      toastId.current = null
    },
    enabled: false
  })
  return { lastQuatationData, refetchQuationData }
}

export default useFetchQuatationEur
