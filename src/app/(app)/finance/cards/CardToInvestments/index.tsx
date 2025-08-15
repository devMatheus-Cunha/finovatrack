import React, { useMemo, useState } from 'react'
import { Card, Charts } from '@/components'
import { PieChartCircleData } from '@/components/common/Charts/PieChartCircle'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { blueHexShades } from '@/utils/colors'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments/types'

interface IDisplayStat {
  label: string
  value: number
  icon: React.ReactNode
  percentage?: number
  subValue?: string
  unit?: '%' | 'currency'
}

const createDisplayData = (investimentsData: IInvestimentsData | undefined) => {
  if (!investimentsData) {
    return {
      chartData: [],
      totalNaCorretora: 0,
      statsByTab: { Rendimentos: [], Projeções: [], Metas: [] } // --- ALTERADO ---
    }
  }

  // --- ALTERADO ---: Desestruturando 'metas'
  const { patrimonio, composicaoPortfolio, rendimentos, projecoes, metas } =
    investimentsData

  const iconMap: { [key: string]: React.ReactNode } = {
    // --- ADICIONADO ---: Ícones para as novas metas
    'Meta de Dividendos': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    'Meta de Juros': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    'Rendimento Total (Anual)': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),

    // Ícones existentes...
    'Lucro Total': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    'Valorização Invesitimentos': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <polyline points="18 10 12 4 6 10"></polyline>
      </svg>
    ),
    Dividendos: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    ),
    Juros: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 7h10v10" />
        <path d="M21 7L7 21" />
      </svg>
    ),
    'Juros (Anual)': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    'Juros (Mensal)': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 7V3h8v4H8z" />
        <path d="M8 7v14h8V7H8zM4 14h16" />
      </svg>
    ),
    'Dividendos (Anual)': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    'Dividendos (Mensal)': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  }

  const chartData: PieChartCircleData[] = [
    {
      label: 'Disponível',
      value: composicaoPortfolio?.valorNaoInvestido || 0,
      color: blueHexShades.blue600
    },
    {
      label: 'Aplicado',
      value: composicaoPortfolio?.totalInvestidoComValorizacao || 0,
      color: blueHexShades.blue500
    },
    {
      label: 'Juros',
      value: rendimentos?.detalhes?.jurosSobreCaixa?.totalRecebido || 0,
      color: blueHexShades.blue400
    },
    {
      label: 'Dividendos',
      value: rendimentos?.detalhes?.dividendos?.totalRecebido || 0,
      color: blueHexShades.blue300
    }
  ]

  const statsByTab: { [key: string]: IDisplayStat[] } = {
    Rendimentos: [
      {
        label: 'Lucro Total',
        value: rendimentos?.lucroTotal || 0,
        icon: iconMap['Lucro Total'],
        percentage: rendimentos?.porcentagemLucroTotal || 0
      },
      {
        label: 'Valorização Invesitimentos',
        value: rendimentos?.detalhes?.valorizacaoInvestimentos?.valor || 0,
        icon: iconMap['Valorização Invesitimentos'],
        percentage:
          rendimentos?.detalhes?.valorizacaoInvestimentos?.porcentagem || 0
      },
      {
        label: 'Dividendos',
        value: rendimentos?.detalhes?.dividendos?.totalRecebido || 0,
        icon: iconMap['Dividendos'],
        percentage: rendimentos.detalhes.dividendos.yieldAnualizado || 0,
        subValue: `Yield Atual: ${projecoes?.dividendos?.yieldProjetado.toFixed(2)}%`
      },
      {
        label: 'Juros',
        value: rendimentos?.detalhes?.jurosSobreCaixa?.totalRecebido || 0,
        icon: iconMap['Juros'],
        percentage:
          rendimentos.detalhes.jurosSobreCaixa.rendimentoHistoricoPercentual ||
          0,
        subValue: `Taxa Atual: ${rendimentos?.detalhes?.jurosSobreCaixa?.taxaAnual || 0}%`
      }
    ],
    Projeções: [
      {
        label: 'Rendimento Total (Anual)',
        value: projecoes?.rendimentoTotalAnual || 0, // --- ALTERADO ---
        icon: iconMap['Rendimento Total (Anual)'],
        subValue: 'Juros + Dividendos'
      },
      {
        label: 'Juros (Anual)', // --- ALTERADO (consistência) ---
        value: projecoes?.jurosSobreCaixa?.projecaoAnual || 0,
        icon: iconMap['Juros (Anual)']
      },
      {
        label: 'Juros (Mensal)', // --- ALTERADO (consistência) ---
        value: projecoes?.jurosSobreCaixa?.projecaoMensal || 0,
        icon: iconMap['Juros (Mensal)']
      },
      {
        label: 'Dividendos (Anual)', // --- ALTERADO (consistência) ---
        value: projecoes?.dividendos?.projecaoAnualEstimada || 0,
        icon: iconMap['Dividendos (Anual)'],
        subValue: `Yield Projetado: ${projecoes?.dividendos?.yieldProjetado.toFixed(2)}%`
      },
      {
        label: 'Dividendos (Mensal)', // --- ALTERADO (consistência) ---
        value: projecoes?.dividendos?.projecaoMensalEstimada || 0,
        icon: iconMap['Dividendos (Mensal)']
      }
    ],
    // --- ADICIONADO ---: Nova aba de Metas
    Metas: [
      {
        label: `Meta de Dividendos (€${metas?.dividendos?.objetivoMensal || 10}/mês)`,
        value: metas?.dividendos?.valorInvestidoNecessario || 0,
        icon: iconMap['Meta de Dividendos'],
        subValue: 'Total investido necessário'
      },
      {
        label: `Meta de Juros (€${metas?.juros?.objetivoMensal || 40}/mês)`,
        value: metas?.juros?.valorNaoInvestidoNecessario || 0,
        icon: iconMap['Meta de Juros'],
        subValue: 'Dinheiro em caixa necessário'
      }
    ]
  }

  return {
    chartData,
    totalNaCorretora: patrimonio?.totalNaCorretora || 0,
    statsByTab
  }
}

interface ICardToInvestmentsProps {
  investimentsData: IInvestimentsData | undefined
  isLoadingInvestimentsData: boolean
  isLoadingIcon?: boolean
  refetchInvestimentsData: () => void
}

const CardToInvestments = ({
  investimentsData,
  isLoadingInvestimentsData,
  refetchInvestimentsData,
  isLoadingIcon
}: ICardToInvestmentsProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const [activeTab, setActiveTab] = useState('Rendimentos')

  const { chartData, totalNaCorretora, statsByTab } = useMemo(
    () => createDisplayData(investimentsData),
    [investimentsData]
  )

  // --- ALTERADO ---: Adicionando a nova aba
  const TABS = ['Rendimentos', 'Projeções', 'Metas']

  return (
    <Card
      title="Painel de Controle - Trading 212"
      isLoading={isLoadingInvestimentsData}
      isLoadingIcon={isLoadingIcon}
      hasData={!!investimentsData}
      className="w-full lg:max-w-4xl flex flex-col"
      action={refetchInvestimentsData}
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6 mt-4 h-full lg:h-[490px]">
        <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-xl h-full">
          <Charts.PieChartCircle
            data={chartData}
            total={totalNaCorretora}
            currency={userData.primary_currency}
            isVisibilityData={isVisibilityData}
            showTooltip
            showDescription
          />
        </div>

        <div className="flex flex-col bg-gray-800/50 p-4 md:p-6 rounded-xl">
          <div className="flex w-full bg-gray-900/50 p-1 rounded-lg mb-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-2 text-xs lg:text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-grow flex flex-col divide-y divide-gray-700/80">
            {(statsByTab[activeTab] || []).map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[auto,1fr] items-center py-3.5 px-1 gap-4"
              >
                <div className="text-blue-400 flex-shrink-0">{item.icon}</div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base text-gray-200">
                      {item.label}
                    </span>
                    {item.subValue && (
                      <span className="text-xs lg:text-sm text-gray-400 mt-0.5">
                        {item.subValue}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-base md:text-lg font-semibold text-white">
                      {item.unit === '%'
                        ? `${item.value?.toFixed(2) || '0.00'}%`
                        : formatCurrencyMoney(
                            item.value,
                            userData.primary_currency,
                            isVisibilityData
                          )}
                    </span>
                    {item.percentage !== undefined && (
                      <span
                        className={`text-xs md:text-sm font-bold ${item.percentage > 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {item.percentage > 0 ? '▲' : '▼'}{' '}
                        {item.percentage.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CardToInvestments
