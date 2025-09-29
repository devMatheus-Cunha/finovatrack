import React from 'react'
import {
  DollarSign,
  Package,
  TrendingDown,
  Wallet, // Ícone novo
  ArrowUpCircle, // Ícone novo
  ArrowDownCircle // Ícone novo
} from 'lucide-react'
import { useUserData, useIsVisibilityDatas } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Card } from '@/components'

interface StatsOverviewProps {
  totalUniqueItems: number
  totalOverallValue: number
  totalSpentValue: number
}

// Interface não precisa de alteração
interface StatConfig {
  key: string
  icon: React.ReactNode
  label: string
  value: string
  color: string
  valueColor: string
  description?: string
}

export function StatsOverview({
  totalUniqueItems,
  totalOverallValue,
  totalSpentValue
}: StatsOverviewProps) {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  // --- Lógica Adicionada ---
  const investmentBudget = 4800 // Valor fixo para investir
  const difference = investmentBudget - totalOverallValue
  const isWithinBudget = difference >= 0

  // Formata os novos valores para exibição
  const formattedBudget = formatCurrencyMoney(
    investmentBudget - totalSpentValue,
    userData?.primary_currency,
    isVisibilityData
  )
  const formattedDifference = formatCurrencyMoney(
    Math.abs(difference), // Usamos o valor absoluto para exibir sempre um número positivo
    userData?.primary_currency,
    isVisibilityData
  )
  // --- Fim da Lógica Adicionada ---

  const statsConfig: StatConfig[] = [
    {
      key: 'totalOverallValue',
      icon: <DollarSign className="w-4 h-4" />,
      label: 'Total Estimado',
      value: formatCurrencyMoney(
        totalOverallValue,
        userData?.primary_currency,
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
        userData?.primary_currency,
        isVisibilityData
      ),
      color: 'text-green-300',
      valueColor: 'text-green-400'
    }
  ]

  return (
    <Card className="bg-gray-700 rounded-xl shadow-md p-6 flex flex-col items-center text-center relative w-full h-full min-h-[255px]">
      <div className="flex justify-between items-center mb-6 w-full">
        <h3 className="text-2xl font-semibold text-gray-300">
          Valores da lista
        </h3>
        <div className="flex items-center gap-2 bg-gray-700/50 text-xs text-gray-200 px-3 py-1 rounded-full font-medium">
          <Package className="w-4 h-4" />
          <span>{totalUniqueItems} itens</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {statsConfig.map((stat) => (
          <div
            key={stat.key}
            className={`flex flex-col items-center md:items-start text-center md:text-left p-4 rounded-lg bg-gray-800/50`}
          >
            <div
              className={`flex items-center gap-2 text-xs mb-2 ${stat.color}`}
            >
              {stat.icon}
              <span>{stat.label}</span>
            </div>
            <p
              className={`text-3xl font-bold tracking-tighter mb-1 ${stat.valueColor}`}
            >
              {stat.value}
            </p>
            {stat.description && (
              <p className="text-xs text-gray-400">{stat.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* --- Nova Seção Adicionada --- */}
     <div className="border-t border-gray-700 mt-6 pt-6 w-full flex flex-col sm:flex-row justify-center sm:justify-around items-center space-y-4 sm:space-y-0">
          {/* Valor do Orçamento */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wallet className="w-4 h-4" />
              <span>Valor para investir</span>
            </div>
            <p className="text-xl font-semibold text-gray-200">
              {formattedBudget}
            </p>
          </div>

          {/* Diferença (Sobra ou Falta) */}
          <div className="flex flex-col items-center text-center">
            {isWithinBudget ? (
              <>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <ArrowUpCircle className="w-4 h-4" />
                  <span>Sobra no orçamento</span>
                </div>
                <p className="text-2xl font-bold text-green-300">
                  {formattedDifference}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <ArrowDownCircle className="w-4 h-4" />
                  <span>Falta no orçamento</span>
                </div>
                <p className="text-2xl font-bold text-red-300">
                  {formattedDifference}
                </p>
              </>
            )}
          </div>
        </div>
      {/* --- Fim da Nova Seção --- */}
    </Card>
  )
}