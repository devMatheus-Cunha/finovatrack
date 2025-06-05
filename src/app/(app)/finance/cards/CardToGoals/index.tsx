'use client'

import React, { useState } from 'react'
import { blueShades, blueHexShades } from '@/utils/colors'
import { Card, Modal } from '@/components'
import { IInvestimentsData } from '@/hooks/finance/useFetchInvestiments'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  useIsVisibilityDatas,
  useUserData,
  useCustomDisclosure
} from '@/hooks/globalStates'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import { ISaveGoalProps, IGoalsProps } from '@/services/finance/goals'
import { useGoals, useSaveGoal } from '@/hooks/finance'
import { PencilSimpleLine, Plus } from '@phosphor-icons/react'
import {
  calcularPrevisaoComExtrasEDeducoes,
  calcularMesesRestantes,
  calcularValorGuardadoMes,
  GOAL_TARGET,
  GOAL_DEADLINE,
  GOAL_INTEREST_RATE
} from './utils'
import { MetaInfo, ProgressBar, ResumoInfo, GoalsList } from './parts'
import GoalsModal from './GoalsModal'

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
  const { goal } = useGoals()
  const { mutateGoal } = useSaveGoal()
  const { isOpen, onOpen, onClose } = useCustomDisclosure()
  const [selectedGoal, setSelectedGoal] = useState<IGoalsProps | undefined>(
    undefined
  )
  const currency = userData.primary_currency
  const handleOpenModal = (goal?: IGoalsProps) => {
    setSelectedGoal(goal)
    onOpen()
  }

  const handleCloseModal = () => {
    setSelectedGoal(undefined)
    onClose()
  }

  const handleSubmitGoal = async (data: ISaveGoalProps) => {
    try {
      await mutateGoal(data)
      handleCloseModal()
    } catch (error) {
      console.error('Error saving goal:', error)
    }
  } // Previsão
  const valorAtual = investimentsData?.patrimonioTotal ?? 18000
  const goalDeadline = goal?.meta_year || GOAL_DEADLINE
  const mesesRestantes = calcularMesesRestantes(goalDeadline)
  const valorGuardadoMes = calcularValorGuardadoMes(
    financialPlanningYear,
    goalDeadline
  )

  // Função para formatar mês/ano no formato MM/YYYY
  const formatMonthYear = (metaYear: { year: number; month: number }) => {
    const month = String(metaYear.month + 1).padStart(2, '0') // +1 porque JavaScript months são 0-based
    return `${month}/${metaYear.year}`
  }

  // Previsão considerando aportes extras e deduções
  const previsao = calcularPrevisaoComExtrasEDeducoes(
    financialPlanningYear,
    goalDeadline,
    GOAL_INTEREST_RATE,
    valorAtual
  )

  const targetValue = goal?.meta_value_to_year || GOAL_TARGET
  const diferenca = previsao - targetValue

  // Calcular total aportado (sem juros)
  let totalAportado = valorAtual
  if (financialPlanningYear && financialPlanningYear.length > 0) {
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() // 0-indexed
    const anoAlvo = goalDeadline.year
    const mesAlvo = goalDeadline.month
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
  const percentualAtual = Math.min((valorAtual / targetValue) * 100, 100)
  const percentualPrevisto = Math.min((previsao / targetValue) * 100, 100)
  // Objetivos
  const goalItems = [
    {
      name: 'Renda fixa',
      current: investimentsData?.totalNaoInvestido ?? 0,
      target: goal?.meta_renda_fixa || 30000,
      color: blueShades.blue700
    },
    {
      name: 'Investimentos',
      current: investimentsData?.totalInvestido ?? 0,
      target: goal?.meta_investimentos || 6000,
      color: blueShades.blue300
    },
    {
      name: 'Reserva',
      current: investimentsData?.reserva ?? 0,
      target: goal?.meta_reserva || 6000,
      color: blueShades.blue600
    }
  ]

  const metaInfo = [
    {
      label: `Meta ${goal?.meta_year ? formatMonthYear(goal.meta_year) : formatMonthYear(GOAL_DEADLINE)}:`,
      value: formatCurrencyMoney(targetValue, currency, isVisibilityData),
      valueClass: 'text-md font-bold text-gray-100',
      key: 'meta'
    },
    {
      label: `Previsão até ${goal?.meta_year ? formatMonthYear(goal.meta_year) : formatMonthYear(GOAL_DEADLINE)}:`,
      value: formatCurrencyMoney(previsao, currency, isVisibilityData),
      valueClass: 'text-sm font-bold',
      valueStyle: { color: previsao >= targetValue ? '#22c55e' : '#f87171' },
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
      action={() => handleOpenModal(goal)}
      actionIcon={
        goal?.id ? (
          <PencilSimpleLine size={20} color="#fff" />
        ) : (
          <Plus size={20} color="#fff" />
        )
      }
      actionTooltip={goal?.id ? 'Editar meta' : 'Adicionar meta'}
    >
      <div className="flex flex-col gap-1 rounded-xl p-3 border bg-gray-800/50/70 border-gray-700">
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
        goals={goalItems}
        currency={currency}
        isVisibilityData={isVisibilityData}
        formatCurrencyMoney={formatCurrencyMoney}
      />

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="xl"
        isCentered
        title={selectedGoal ? 'Editar Meta' : 'Criar Nova Meta'}
      >
        <GoalsModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitGoal}
          initialValues={selectedGoal}
          currency={currency}
        />
      </Modal>
    </Card>
  )
}

export default CardToGoals
