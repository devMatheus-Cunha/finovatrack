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
import { MetaInfo, ProgressBar, ResumoInfo, GoalsList } from './parts'
import GoalsModal from './GoalsModal'
import { calculateProjection } from '@/utils/calculateFinancialProjection'
import {
  GOAL_DEADLINE,
  GOAL_TARGET,
  GOAL_INTEREST_RATE,
  calcularValorGuardadoMes
} from '../utils'

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
  }

  const valorAtual = investimentsData?.patrimonio?.total ?? 18000
  const goalDeadline = goal?.meta_year || GOAL_DEADLINE
  const targetValue = goal?.meta_value_to_year || GOAL_TARGET

  const projectionResults = calculateProjection({
    principal: valorAtual,
    annualRate: GOAL_INTEREST_RATE,
    goalDate: goalDeadline,
    financialPlanningYear: financialPlanningYear || []
  })

  // 2. Extração dos resultados principais
  const finalProjection =
    projectionResults.length > 0
      ? projectionResults[projectionResults.length - 1]
      : null

  const previsao = finalProjection?.endValue ?? valorAtual
  const totalAportado = finalProjection?.totalInvested ?? valorAtual
  const totalJuros = finalProjection?.interestGenerated ?? 0
  const diferenca = previsao - targetValue

  const valorGuardadoMes = calcularValorGuardadoMes(
    financialPlanningYear,
    goalDeadline
  )

  const formatMonthYear = (metaYear: { year: number; month: number }) => {
    const month = String(metaYear.month + 1).padStart(2, '0')
    return `${month}/${metaYear.year}`
  }

  const percentualAtual = Math.min((valorAtual / targetValue) * 100, 100)
  const percentualPrevisto = Math.min((previsao / targetValue) * 100, 100)

  const goalItems = [
    {
      name: 'Renda fixa',
      current: investimentsData?.composicaoPortfolio.valorNaoInvestido ?? 0,
      target: goal?.meta_renda_fixa || 30000,
      color: blueShades.blue700
    },
    {
      name: 'Investimentos',
      current:
        investimentsData?.composicaoPortfolio?.totalInvestidoComValorizacao ??
        0,
      target: goal?.meta_investimentos || 6000,
      color: blueShades.blue300
    },
    {
      name: 'Reserva',
      current: investimentsData?.patrimonio?.reservaExterna ?? 0,
      target: goal?.meta_reserva || 6000,
      color: blueShades.blue600
    }
  ]

  const metaInfo = [
    {
      label: `Meta ${formatMonthYear(goalDeadline)}:`,
      value: formatCurrencyMoney(targetValue, currency, isVisibilityData),
      valueClass: 'text-md font-bold text-white',
      key: 'meta'
    },
    {
      label: `Previsão até ${formatMonthYear(goalDeadline)}:`,
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
      className="w-full lg:w-[50%]  h-[570px] flex flex-col gap-2"
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
      <div className="flex flex-col gap-1 rounded-xl p-3 border bg-gray-800/50 border-gray-700">
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
          mesesRestantes={finalProjection?.monthsRemaining}
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
