// Dados fakes centralizados para testes
import { IDividendsProps } from '@/hooks/finance/useFetchDividends'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'

export const fakeDividends: IDividendsProps = [
  {
    ticker: 'AAPL',
    reference: '2025-05',
    quantity: 10,
    amount: 15.5,
    grossAmountPerShare: 1.55,
    amountInEuro: 14.8,
    paidOn: '2025-05-15',
    type: 'cash'
  },
  {
    ticker: 'MSFT',
    reference: '2025-04',
    quantity: 5,
    amount: 8.2,
    grossAmountPerShare: 1.64,
    amountInEuro: 7.9,
    paidOn: '2025-04-10',
    type: 'cash'
  },
  {
    ticker: 'TSLA',
    reference: '2025-03',
    quantity: 3,
    amount: 2.7,
    grossAmountPerShare: 0.9,
    amountInEuro: 2.5,
    paidOn: '2025-03-20',
    type: 'cash'
  }
]

export const fakeInvestiments: IInvestimentsData = {
  totalListaData: [
    { type: 'Depósito', amount: 1000, reference: 'DEP2025', dateTime: '2025-05-01' },
    { type: 'Juros', amount: 50, reference: 'JUR2025', dateTime: '2025-05-10' }
  ],
  totalJurosValorLivre: { atual: 50, antigo: 30 },
  totalNaoInvestido: 2000,
  reserva: 5000,
  totalPortifolioTranding: 3000,
  totalInvestido: 2500,
  investEValorizacao: 2600,
  totalDividendos: 120,
  porcValorizacaoInv: 4.0,
  lucroTotal: 170,
  porcLucroTotal: 5.7,
  valorValorizacaoInvest: 100,
  totalValoriEJuros: 270,
  patrimonioTotal: 3200
}
