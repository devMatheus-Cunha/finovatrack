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
        totalRecebidoUltimos12Meses: number
        yieldAnualizado: number
        distribuicaoPorAtivo: Array<{
          ticker: string
          valor: number
        }>
      }
    }
  }
  projecoes: {
    jurosSobreCaixa: {
      projecaoDiaria: number
      projecaoMensal: number
      projecaoAnual: number
    }
    // A tipagem abaixo foi atualizada para corresponder aos novos dados
    dividendos: {
      projecaoAnualEstimada: number
      projecaoMensalEstimada: number // Adicionado
      projecaoDiariaEstimada: number // Adicionado
      yieldProjetado: number // Adicionado
    }
  }
  dadosBrutos: {
    transacoesRecentes: TransactionListProps[]
    historicoDividendos: any[]
  }
}
