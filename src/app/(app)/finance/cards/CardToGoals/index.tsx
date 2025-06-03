'use client'

import React from 'react'
import { blueShades, blueHexShades } from '@/utils/colors'
import { Card } from '@/components'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import {
  calcularPrevisaoComExtrasEDeducoes,
  calcularMesesRestantes,
  calcularValorGuardadoMes,
  GOAL_TARGET,
  GOAL_DEADLINE,
  GOAL_INTEREST_RATE
} from './utils'
import { MetaInfo, ProgressBar, ResumoInfo, GoalsList } from './parts'

interface CardToGoalsProps {
  investimentsData: IInvestimentsData | undefined
  financialPlanningYear?: IFinancialPlanningProps[]
}

const CardToGoals = ({
  investimentsData,
  financialPlanningYear
}: CardToGoalsProps) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const currency = userData.primary_currency

  // Previsão
  const valorAtual = investimentsData?.patrimonioTotal ?? 18000
  const mesesRestantes = calcularMesesRestantes(GOAL_DEADLINE)
  const valorGuardadoMes = calcularValorGuardadoMes(
    financialPlanningYear,
    GOAL_DEADLINE
  )
  // Previsão considerando aportes extras e deduções
  const previsao = calcularPrevisaoComExtrasEDeducoes(
    financialPlanningYear,
    GOAL_DEADLINE,
    GOAL_INTEREST_RATE,
    valorAtual
  )
  const diferenca = previsao - GOAL_TARGET
  // Calcular total aportado (sem juros)
  let totalAportado = valorAtual
  if (financialPlanningYear && financialPlanningYear.length > 0) {
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() // 0-indexed
    const anoAlvo = GOAL_DEADLINE.year
    const mesAlvo = GOAL_DEADLINE.month
    for (let ano = anoAtual; ano <= anoAlvo; ano++) {
      const planning = financialPlanningYear.find((y) => Number(y.year) === ano)
      if (!planning) continue
      let mesesNoAno = 12
      if (ano === anoAtual) {
        mesesNoAno = (ano === anoAlvo ? mesAlvo : 11) - mesAtual + 1
      } else if (ano === anoAlvo) {
        mesesNoAno = mesAlvo + 1
      }
      const mensal = Number(planning.monthlyContributions)
      const extra = Number(planning.receivables || 0)
      const deducao = Number(planning.deduction || 0)
      totalAportado += mesesNoAno * mensal + extra - deducao
    }
  }
  const totalJuros = Math.max(previsao - totalAportado, 0)
  const percentualAtual = Math.min((valorAtual / GOAL_TARGET) * 100, 100)
  const percentualPrevisto = Math.min((previsao / GOAL_TARGET) * 100, 100)

  // Objetivos
  const goals = [
    {
      name: 'Renda fixa',
      current: investimentsData?.totalNaoInvestido ?? 0,
      target: 30000,
      color: blueShades.blue700
    },
    {
      name: 'Investimentos',
      current: investimentsData?.totalInvestido ?? 0,
      target: 6000,
      color: blueShades.blue300
    },
    {
      name: 'Reserva',
      current: investimentsData?.reserva ?? 0,
      target: 6000,
      color: blueShades.blue600
    }
  ]

  const metaInfo = [
    {
      label: 'Meta 2027:',
      value: formatCurrencyMoney(GOAL_TARGET, currency, isVisibilityData),
      valueClass: 'text-md font-bold text-gray-100',
      key: 'meta'
    },
    {
      label: 'Previsão até 2027:',
      value: formatCurrencyMoney(previsao, currency, isVisibilityData),
      valueClass: 'text-sm font-bold',
      valueStyle: { color: previsao >= GOAL_TARGET ? '#22c55e' : '#f87171' },
      key: 'previsao'
    },
    {
      label: 'Valor aportado:',
      value: formatCurrencyMoney(totalAportado, currency, isVisibilityData),
      valueClass: 'text-sm font-semibold',
      valueStyle: { color: blueHexShades.blue400 },
      key: 'aportado'
    },
    {
      label: 'Juros gerado:',
      value: formatCurrencyMoney(totalJuros, currency, isVisibilityData),
      valueClass: 'text-sm font-medium text-green-400',
      key: 'juros'
    },
    {
      label: diferenca >= 0 ? 'Acima da meta:' : 'Faltando:',
      value: formatCurrencyMoney(
        Math.abs(diferenca),
        currency,
        isVisibilityData
      ),
      valueClass: 'text-sm font-medium',
      valueStyle: { color: diferenca >= 0 ? '#22c55e' : '#f87171' },
      key: 'diferenca'
    }
  ]

  return (
    <Card
      title="Objetivos"
      className="max-w-md h-[570px] flex flex-col gap-2"
      isLoading={!investimentsData}
    >
      <div className="flex flex-col gap-1.5 rounded-xl p-3 border bg-gray-800/70 border-gray-700">
        <MetaInfo metaInfo={metaInfo} />
        <ProgressBar
          percentualAtual={percentualAtual}
          percentualPrevisto={percentualPrevisto}
          valorAtual={valorAtual}
          currency={currency}
          isVisibilityData={isVisibilityData}
          formatCurrencyMoney={formatCurrencyMoney}
          blueShades={blueShades}
          blueHexShades={blueHexShades}
        />
        <ResumoInfo
          valorGuardadoMes={valorGuardadoMes}
          mesesRestantes={mesesRestantes}
          GOAL_INTEREST_RATE={GOAL_INTEREST_RATE}
          currency={currency}
          isVisibilityData={isVisibilityData}
          formatCurrencyMoney={formatCurrencyMoney}
        />
      </div>
      <GoalsList
        goals={goals}
        currency={currency}
        isVisibilityData={isVisibilityData}
        formatCurrencyMoney={formatCurrencyMoney}
      />
    </Card>
  )
}

export default CardToGoals
