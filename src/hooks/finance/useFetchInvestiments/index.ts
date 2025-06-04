import { useUserData } from '@/hooks/globalStates'
import {
  getCombinedData,
  getInvestmentData,
  updateOrCreateDoc
} from '@/services/finance/getInvestiments'
import { useQuery } from '@tanstack/react-query'
import { useFetchFinancialPlaningYear } from '@/hooks/finance/useFetchFinancialPlaningYear'

export interface IInvestmentsProps {
  blocked: number
  free: number
  invested: number
  pieCash: number
  ppl: number
  result: number
  total: number
}

export interface IGetAllPies {
  id: number
  cash: number
  dividendDetails: {
    gained: number
    reinvested: number
    inCash: number
  }
  result: {
    priceAvgInvestedValue: number
    priceAvgResult: number
    priceAvgResultCoef: number
    priceAvgValue: number
  }
  progress: number
  status: null
}

export interface TransactionListProps {
  type: string
  amount: number
  reference: string
  dateTime: string
}

export interface IInvestimentsData {
  totalListaData: TransactionListProps[]
  totalJurosValorLivre: {
    atual: number
    antigo: number
  }
  totalNaoInvestido: number
  reserva?: number
  totalPortifolioTranding: number
  totalInvestido: number
  investEValorizacao: number
  totalDividendos: number
  porcValorizacaoInv: number
  lucroTotal: number
  porcLucroTotal: number
  valorValorizacaoInvest: number
  totalValoriEJuros: number
  patrimonioTotal: number
}

export const useFetchInvestiments = () => {
  const { userData } = useUserData()
  const { financialPlanningActualYear } = useFetchFinancialPlaningYear()

  // Corrige o tipo de reserve para number
  const reserveNumber = financialPlanningActualYear?.reserve
    ? Number(financialPlanningActualYear.reserve)
    : 0

  const {
    data: investimentsDataRequestRaw,
    isFetching,
    isFetched,
    refetch
  } = useQuery({
    queryKey: ['investiments_data', userData.id],
    queryFn: () => getInvestmentData(userData.id!),
    enabled: !!userData.id // Removido o filtro por admin
  })

  const refetchInvestimentsData = async () => {
    try {
      const investiments = await getCombinedData(
        investimentsDataRequestRaw,
        reserveNumber
      )
      await updateOrCreateDoc(userData.id!, investiments)
      refetch()
    } catch (error) {
      console.error('Error refetching investments:', error)
    }
  }

  const isLoading = isFetching || !isFetched
  const investimentsData: IInvestimentsData = isLoading
    ? undefined
    : investimentsDataRequestRaw

  return {
    investimentsData,
    isLoadingInvestimentsData: isLoading,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
