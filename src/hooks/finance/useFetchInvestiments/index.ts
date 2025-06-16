import { useUserData } from '@/hooks/globalStates'
import {
  getCombinedData,
  getInvestmentData,
  updateOrCreateDoc
} from '@/services/finance/getInvestiments'
import { useQuery } from '@tanstack/react-query'
import { useFetchFinancialPlaningYear } from '@/hooks/finance/useFetchFinancialPlaningYear'

// ============================================================================
// == TIPAGENS DA API (Sem alterações) ==
// ============================================================================

/** Dados brutos da API sobre o caixa da conta */
export interface InvestmentDataPropsApi {
  blocked: number
  free: number
  invested: number
  pieCash: number
  ppl: number
  result: number
  total: number
}

/** Dados brutos da API sobre as 'Pies' (carteiras) */
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

/** Dados de uma única transação da API */
export interface TransactionListProps {
  type: string
  amount: number
  reference?: string
  dateTime: string
}

// ============================================================================
// == INTERFACE PRINCIPAL DOS DADOS PROCESSADOS (Sem alterações) ==
// ============================================================================
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
        porcentagemSobreTotal: number
        reinvestidos: number
        recebidosEmCaixa: number
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

// ============================================================================
// == HOOK OTIMIZADO ==
// ============================================================================

/**
 * Hook customizado para buscar, processar e gerenciar os dados de investimentos.
 * Ele busca os dados do Firestore, permite o recarregamento manual
 * e atualiza os dados automaticamente em segundo plano.
 */
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
    enabled: !!userData.id,
    // OTIMIZAÇÃO: Mantém os dados "frescos" por 5 minutos, evitando re-fetches desnecessários
    staleTime: 1000 * 60 * 5, // 5 minutos
    // OTIMIZAÇÃO: Atualiza os dados automaticamente a cada 5 minutos em segundo plano
    refetchInterval: 1000 * 60 * 5
  })

  /**
   * Função para forçar uma atualização: busca os dados mais recentes da API,
   * processa com getCombinedData, salva no Firestore e re-renderiza o componente.
   */
  const refetchInvestimentsData = async () => {
    try {
      const investiments = await getCombinedData(
        investimentsDataRequestRaw,
        reserveNumber
      )
      if (investiments) {
        await updateOrCreateDoc(userData.id!, investiments)
      }
      refetch() // Re-busca os dados do Firestore para atualizar a UI
    } catch (error) {
      console.error('Error refetching investments:', error)
    }
  }

  const isLoading = isFetching || !isFetched

  // CORREÇÃO DE TIPAGEM: A constante agora aceita ser 'undefined' durante o carregamento.
  const investimentsData: IInvestimentsData | undefined = isLoading
    ? undefined
    : investimentsDataRequestRaw

  return {
    investimentsData,
    isLoadingInvestimentsData: isLoading,
    refetchInvestimentsData
  }
}

export default useFetchInvestiments
