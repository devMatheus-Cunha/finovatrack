import { useUserData } from '@/hooks/globalStates'
import { getInvestmentData } from '@/services/finance/getInvestiments'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFetchFinancialPlaningYear } from '@/hooks/finance/useFetchFinancialPlaningYear'
import {
  IInvestimentsData,
  updateAndRevalidateInvestments
} from '@/app/actions/financeActions'

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
    placeholderData: (previous) => previous
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
