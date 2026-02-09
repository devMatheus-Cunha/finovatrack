import React from 'react'
import {
  DollarSign,
  TrendingDown,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  LayoutDashboard
} from 'lucide-react'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

// --- Interfaces ---
interface StatsOverviewProps {
  totalUniqueItems: number
  totalOverallValue: number
  totalSpentValue: number
  earlyTotal?: number
  includeEarlyPurchase?: boolean
  boughtTotal?: number
  baseOverallValue?: number
}

interface StatConfig {
  key: string
  icon: React.ReactNode
  label: string
  value: string
  color: string
  valueColor: string
  description?: string
}

const Card = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`rounded-xl ${className}`}>{children}</div>

export function StatsOverview({
  totalOverallValue,
  totalSpentValue,
  earlyTotal,
  includeEarlyPurchase,
  boughtTotal,
  baseOverallValue
}: StatsOverviewProps) {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const investmentBudget = 5400
  const effectiveEarlyTotal = includeEarlyPurchase ? earlyTotal || 0 : 0
  const effectiveBoughtTotal = boughtTotal || 0
  const effectiveBaseOverall = baseOverallValue || 0

  const difference =
    investmentBudget - effectiveBoughtTotal - effectiveBaseOverall
  const isWithinBudget = difference >= 0

  const formattedBudget = formatCurrencyMoney(
    investmentBudget + effectiveEarlyTotal - effectiveBoughtTotal,
    userData.primary_currency,
    isVisibilityData
  )

  const formattedDifference = formatCurrencyMoney(
    Math.abs(difference),
    userData.primary_currency,
    isVisibilityData
  )

  const statsConfig: StatConfig[] = [
    {
      key: 'totalOverallValue',
      icon: <DollarSign className="w-4 h-4" />,
      label: 'Total Estimado',
      value: formatCurrencyMoney(
        totalOverallValue,
        userData.primary_currency,
        isVisibilityData
      ),
      color: 'text-blue-300',
      valueColor: 'text-blue-400'
    },
    {
      key: 'totalSpentValue',
      icon: <TrendingDown className="w-4 h-4" />,
      label: 'Total Comprado',
      value: formatCurrencyMoney(
        totalSpentValue,
        userData.primary_currency,
        isVisibilityData
      ),
      color: 'text-green-300',
      valueColor: 'text-green-400'
    }
  ]

  return (
    <Card className="bg-gray-700 shadow-xl w-full border border-gray-600/50 overflow-hidden flex flex-col h-full min-h-[260px]">
      <div className="p-6 border-b border-gray-600 flex justify-between items-center bg-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <LayoutDashboard className="w-5 h-5 text-gray-400 mr-2" />
          Resumo de Valores
        </h2>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        {/* Grid de Cards Superiores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statsConfig.map((stat) => (
            <div
              key={stat.key}
              className="flex flex-col p-4 rounded-lg bg-gray-800/50 border border-gray-600/30 transition-all hover:bg-gray-800/80"
            >
              <div
                className={`flex items-center gap-2 text-xs font-medium mb-1 ${stat.color}`}
              >
                {stat.icon}
                <span className="uppercase tracking-wide opacity-80">
                  {stat.label}
                </span>
              </div>
              <p
                className={`text-2xl font-bold tracking-tight ${stat.valueColor}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Rodapé de Orçamento */}
        <div className="pt-6 border-t border-gray-600/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Valor para investir */}
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gray-800/50 rounded-lg border border-gray-600/30 text-gray-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Disponível
              </span>
              <p className="text-lg font-bold text-gray-100 tracking-tight">
                {formattedBudget}
              </p>
            </div>
          </div>

          {/* Status do Orçamento */}
          <div
            className={`flex items-center gap-4 px-4 py-2 rounded-xl border ${isWithinBudget ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}
          >
            <div className={`flex flex-col items-end`}>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${isWithinBudget ? 'text-green-400' : 'text-red-400'}`}
              >
                {isWithinBudget ? 'Sobra Atual' : 'Déficit'}
              </span>
              <p
                className={`text-xl font-black tracking-tighter ${isWithinBudget ? 'text-green-400' : 'text-red-400'}`}
              >
                {formattedDifference}
              </p>
            </div>
            <div className={isWithinBudget ? 'text-green-500' : 'text-red-500'}>
              {isWithinBudget ? (
                <ArrowUpCircle className="w-6 h-6" />
              ) : (
                <ArrowDownCircle className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Componente de exportação padrão para o Preview do Canvas
export default function App() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <StatsOverview
          totalUniqueItems={12}
          totalOverallValue={4500.5}
          totalSpentValue={1200.0}
          boughtTotal={1200}
          baseOverallValue={3300.5}
          includeEarlyPurchase={false}
        />
      </div>
    </div>
  )
}
