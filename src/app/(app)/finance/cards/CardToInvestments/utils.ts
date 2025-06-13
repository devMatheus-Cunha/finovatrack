export interface IFormatDataToStats {
  label: string
  value: number
  percentage?: number
  subValue?: string
}

// export const createChartConfig = (
//   investimentsData: IInvestimentsData | undefined,
//   isVisibilityData: boolean
// ): {
//   chartData: PieChartCircleData[]
//   formatDataToStats: IFormatDataToStats[]
// } => {
//   const chartData: PieChartCircleData[] = [
//     {
//       label: 'Disponível',
//       value: investimentsData?.composicaoPortfolio?.valorNaoInvestido || 0,
//       color: blueHexShades.blue600
//     },
//     {
//       label: 'Aplicado',
//       value: investimentsData?.composicaoPortfolio?.valorInvestido || 0,
//       color: blueHexShades.blue400
//     },
//     {
//       label: 'Dividendos',
//       value:
//         investimentsData?.rendimentos?.detalhes.dividendos.totalRecebido || 0,
//       color: blueHexShades.blue300
//     }
//   ]

//   const formatDataToStats: IFormatDataToStats[] = [
//     {
//       label: 'Disponível',
//       value: investimentsData?.composicaoPortfolio?.valorNaoInvestido || 0,
//       percentage: isVisibilityData
//         ? `(${investimentsData?.rendimentos.detalhes.jurosSobreCaixa.rendimentoHistoricoPercentual}%)`
//         : '****'
//     },
//     {
//       label: 'Aplicado',
//       value: investimentsData?.composicaoPortfolio?.valorInvestido || 0
//     },
//     {
//       label: 'Posição Total Ativos',
//       value:
//         investimentsData?.composicaoPortfolio?.totalInvestidoComValorizacao ||
//         0,
//       percentage: isVisibilityData
//         ? `(${investimentsData?.rendimentos?.detalhes?.valorizacaoInvestimentos?.porcentagem}%)`
//         : '****'
//     },
//     {
//       label: 'Valorização',
//       value: investimentsData?.composicaoPortfolio?.valorizacaoAtual || 0
//     },
//     {
//       label: 'Juros Recebidos',
//       value:
//         investimentsData?.rendimentos?.detalhes?.jurosSobreCaixa
//           ?.totalRecebido || 0
//     },
//     {
//       label: 'Dividendos Recebidos',
//       value:
//         investimentsData?.rendimentos?.detalhes?.dividendos?.totalRecebido || 0,
//       percentage: isVisibilityData
//         ? `(${investimentsData?.projecoes.dividendos.yieldHistorico}%)`
//         : '****'
//     },
//     {
//       label: 'Lucro Total',
//       value: investimentsData?.rendimentos?.lucroTotal || 0,
//       percentage: isVisibilityData
//         ? `(${investimentsData?.rendimentos?.porcentagemLucroTotal}%)`
//         : '****'
//     }
//   ]

//   return { chartData, formatDataToStats }
// }
