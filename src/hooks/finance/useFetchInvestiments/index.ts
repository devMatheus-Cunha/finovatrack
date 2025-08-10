import { useUserData } from '@/hooks/globalStates'
import { getInvestmentData } from '@/services/finance/getInvestiments'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFetchFinancialPlaningYear } from '@/hooks/finance/useFetchFinancialPlaningYear'
import { updateAndRevalidateInvestments } from '@/app/actions/financeActions'
import { IInvestimentsData } from './types'

export const useFetchInvestiments = () => {
  const { userData } = useUserData()
  const { financialPlanningActualYear } = useFetchFinancialPlaningYear()

  const reserveNumber = financialPlanningActualYear?.reserve
    ? Number(financialPlanningActualYear.reserve)
    : 0

  const {
    data: investimentsDataRequestRaw,
    isFetching,
    refetch,
    isFetched
  } = useQuery({
    queryKey: ['investiments_data', userData.id],
    queryFn: () => getInvestmentData(userData.id!),
    enabled: !!userData.id,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5
  })

  const { mutate: refetchInvestimentsData, isPending: isUpdatingInvestments } =
    useMutation({
      mutationFn: () =>
        updateAndRevalidateInvestments(userData.id!, reserveNumber),

      onSuccess: () => {
        refetch()
      },
      onError: (error) => {
        console.error('Falha na mutação:', error.message)
      }
    })
  const isLoading = isFetching || !isFetched

  const investimentsData: IInvestimentsData | undefined = isLoading
    ? undefined
    : investimentsDataRequestRaw

  return {
    investimentsData,
    isFetching,
    isUpdatingInvestments,
    isLoadingInvestimentsData: isLoading,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
