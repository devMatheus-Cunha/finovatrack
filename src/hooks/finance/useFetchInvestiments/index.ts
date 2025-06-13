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
  reference?: string // Tornando opcional, pois não usamos
  dateTime: string
}

export interface IInvestimentsData {
  patrimonio: {
    total: number
    reservaExterna: number
    totalNaCorretora: number
  }
  composicaoPortfolio: {
    valorInvestido: number
    valorNaoInvestido: number
    valorizacaoAtual: number
    totalInvestidoComValorizacao: number
  }
  rendimentos: {
    lucroTotal: number
    porcentagemLucroTotal: number
    detalhes: {
      jurosSobreCaixa: {
        totalRecebido: number
        taxaAnual: number
        rendimentoHistoricoPercentual: number
      }
      valorizacaoInvestimentos: {
        valor: number
        porcentagem: number
      }
      dividendos: {
        totalRecebido: number
        // NOVOS CAMPOS ADICIONADOS DA API:
        reinvestidos: number // Total de dividendos que foram reinvestidos automaticamente
        recebidosEmCaixa: number // Total de dividendos que caíram como dinheiro livre
      }
    }
  }
  projecoes: {
    jurosSobreCaixa: {
      projecaoDiaria: number
      projecaoMensal: number
      projecaoAnual: number
    }
    dividendos: {
      projecaoAnualEstimada: number
      yieldHistorico: number
    }
  }
  dadosBrutos: {
    transacoesRecentes: TransactionListProps[]
  }
}
export const useFetchInvestiments = () => {
  const { userData } = useUserData()
  const { financialPlanningActualYear } = useFetchFinancialPlaningYear()

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
