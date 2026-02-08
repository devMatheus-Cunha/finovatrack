/* ============================================================================
   ACCOUNT SUMMARY (API)
============================================================================ */

/* AUX */
export interface IAccountCashApi {
  availableToTrade: number
  inPies: number
  reservedForOrders: number
}

export interface IAccountInvestmentsApi {
  currentValue: number
  realizedProfitLoss: number
  totalCost: number
  unrealizedProfitLoss: number
}

/* ORIGINAL (NOME MANTIDO) */
export interface IAccountSummaryApi {
  id: number
  currency: string
  totalValue: number
  cash: IAccountCashApi
  investments: IAccountInvestmentsApi
}

/* ============================================================================
   POSITION (API)
============================================================================ */

/* AUX */
export interface IPositionInstrumentApi {
  ticker: string
  currency: string
}

export interface IPositionWalletImpactApi {
  totalCost: number
  currentValue: number
  unrealizedProfitLoss: number
  fxImpact: number
}

/* ORIGINAL (NOME MANTIDO) */
export interface IPositionApi {
  averagePricePaid: number
  currentPrice: number
  quantity: number
  instrument: IPositionInstrumentApi
  walletImpact: IPositionWalletImpactApi
}

/* ============================================================================
   INSTRUMENT METADATA (ORIGINAL – NÃO ALTERADO)
============================================================================ */

export interface IInstrumentMetadataApi {
  ticker: string
  name: string
  type: 'STOCK' | 'ETF' | 'REIT' | string
  currencyCode: string
  isin: string
}

/* ============================================================================
   POSITION PROCESSADA (ORIGINAL – NÃO ALTERADO)
============================================================================ */

export interface IPositionProcessed {
  ticker: string
  name: string
  type: string
  qtd: number
  precoMedio: number
  precoAtual: number
  totalInvestido: number
  valorAtual: number
  lucro: number
  lucroPercentual: number
  impactoCambial: number
}

/* ============================================================================
   TRANSAÇÕES (ORIGINAL – NÃO ALTERADO)
============================================================================ */

export interface TransactionListProps {
  type: string
  amount: number
  reference?: string
  dateTime: string
}

/* ============================================================================
   INVESTMENTS DATA
============================================================================ */

/* AUX – Patrimônio */
export interface IInvestmentsPatrimonio {
  total: number
  reservaExterna: number
  totalNaCorretora: number
  caixaLivre: number
}

/* AUX – Composição */
export interface IInvestmentsComposicaoPortfolio {
  valorInvestido: number
  valorNaoInvestido: number
  valorizacaoAtual: number
  totalInvestidoComValorizacao: number
}

/* AUX – Alocação */
export interface IInvestmentsAlocacao {
  acoes: number
  etfs: number
}

/* AUX – Carteira */
export interface IInvestmentsCarteira {
  acoes: IPositionProcessed[]
  etfs: IPositionProcessed[]
  alocacao: IInvestmentsAlocacao
  maiorAlta: IPositionProcessed | null
  maiorBaixa: IPositionProcessed | null
}

/* AUX – Rendimentos */
export interface IJurosSobreCaixa {
  totalRecebido: number
  taxaAnual: number
  rendimentoHistoricoPercentual: number
}

export interface IValorizacaoInvestimentos {
  valor: number
  porcentagem: number
}

export interface IDividendoDistribuicaoAtivo {
  ticker: string
  valor: number
}

export interface IDividendos {
  totalRecebido: number
  totalRecebidoUltimos12Meses: number
  yieldAnualizado: number
  distribuicaoPorAtivo: IDividendoDistribuicaoAtivo[]
}

export interface IRendimentosDetalhes {
  jurosSobreCaixa: IJurosSobreCaixa
  valorizacaoInvestimentos: IValorizacaoInvestimentos
  dividendos: IDividendos
}

export interface IRendimentos {
  lucroTotal: number
  porcentagemLucroTotal: number
  detalhes: IRendimentosDetalhes
}

/* AUX – Projeções */
export interface IProjecaoJuros {
  projecaoDiaria: number
  projecaoMensal: number
  projecaoAnual: number
}

export interface IProjecaoDividendos {
  projecaoAnualEstimada: number
  projecaoMensalEstimada: number
  projecaoDiariaEstimada: number
  yieldProjetado: number
}

export interface IProjecoes {
  rendimentoTotalAnual: number
  jurosSobreCaixa: IProjecaoJuros
  dividendos: IProjecaoDividendos
}

/* AUX – Metas */
export interface IMetasDividendos {
  objetivoMensal: number
  valorInvestidoNecessario: number
}

export interface IMetasJuros {
  objetivoMensal: number
  valorNaoInvestidoNecessario: number
}

export interface IMetas {
  dividendos: IMetasDividendos
  juros: IMetasJuros
}

/* AUX – Dados Brutos */
export interface IDadosBrutos {
  transacoesRecentes: TransactionListProps[]
  historicoDividendos: any[]
}

/* ORIGINAL (NOME MANTIDO) */
export interface IInvestimentsData {
  patrimonio: IInvestmentsPatrimonio
  composicaoPortfolio: IInvestmentsComposicaoPortfolio
  carteira: IInvestmentsCarteira
  rendimentos: IRendimentos
  projecoes: IProjecoes
  metas: IMetas
  dadosBrutos: IDadosBrutos
}

/* ============================================================================
   HELPERS (ORIGINAL – NÃO ALTERADO)
============================================================================ */

export interface DividendPageResponse {
  items: any[]
  nextPagePath?: string | null
}
