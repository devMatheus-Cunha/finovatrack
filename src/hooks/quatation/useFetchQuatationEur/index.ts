import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { getQuatationRateFromAPI } from '@/services/quatation/getQuatationRateFromAPI'
import { updateQuotationData } from '@/services/quatation/updateQuotationData'
import { getLastQuotationData } from '@/services/quatation/getLastQuotationData'
import { UserData } from '@/hooks/auth/useAuth/types'
import { useUserId } from '@/hooks/globalStates'

export type RefetchQuationDataType = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => Promise<
  QueryObserverResult<
    {
      result_calculation: number
      current_quotation: any
      date: any
      status: any
    },
    unknown
  >
>

const useFetchQuatationEur = (userData: UserData, amount = 0) => {
  const { userId } = useUserId() as any
  const toastId: any = React.useRef(null)

  const { data: lastQuatationData, refetch: refetchLastQuotationData } =
    useQuery(
      ['last_quotation_data', userId],
      async () => await getLastQuotationData(userId),
      { enabled: !!userId }
    )

  const { mutateAsync: addLastQuotation } = useMutation(
    (data: Record<string, any>) => updateQuotationData(userId, data),
    {
      onSuccess: async () => await refetchLastQuotationData()
    }
  )

  const { refetch: refetchQuationData } = useQuery({
    queryKey: ['quatation_data'],
    queryFn: async () => {
      if (toastId.current === null) {
        toastId.current = toast('Atualizando Cotação...', { autoClose: false })
      }
      return await getQuatationRateFromAPI(amount === 0 ? 1 : amount, {
        primary_currency: userData.primary_currency,
        secondary_currency: userData.secondary_currency
      })
    },
    enabled: false,
    cacheTime: 0,
    onSuccess: (res) => {
      addLastQuotation(res)
      toast.update(toastId.current, {
        type: 'success',
        render: 'Sucesso ao atualizar cotação',
        className: 'rotateY animated',
        autoClose: 5000
      })
      toastId.current = null
    },
    onError: () => {
      toast.update(toastId.current, {
        type: 'error',
        render: 'Erro ao atualizar cotação',
        autoClose: 5000
      })
      toastId.current = null
    }
  })
  return { lastQuatationData, refetchQuationData }
}

export default useFetchQuatationEur
