'use client'

import React from 'react'
import {
  Target,
  TrendingUp,
  Calendar,
  ArrowUpCircle,
  Wallet,
  Landmark
} from 'lucide-react'
import { PencilSimpleLine } from '@phosphor-icons/react'
import { Modal } from '@/components'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  useIsVisibilityDatas,
  useUserData,
  useCustomDisclosure
} from '@/hooks/globalStates'
import { useGoals, useSaveGoal } from '@/hooks/finance'
import {
  calculateProjection,
  IFinancialPlanningProps
} from '@/utils/calculateFinancialProjection'
import {
  GOAL_DEADLINE,
  GOAL_TARGET,
  GOAL_INTEREST_RATE,
  calcularValorGuardadoMes
} from '../utils'
import GoalsModal from './GoalsModal'
import { IInvestimentsData } from '@/app/actions/financeActions'

const CardToGoals = ({
  investimentsData,
  financialPlanningYear
}: {
  investimentsData: IInvestimentsData | undefined
  financialPlanningYear: IFinancialPlanningProps[] | undefined
}) => {
  const { isVisibilityData } = useIsVisibilityDatas()
  const { userData } = useUserData()
  const { goal } = useGoals()
  const { mutateGoal } = useSaveGoal()

  const {
    isOpen: isOpenGoal,
    onOpen: onOpenGoal,
    onClose: onCloseGoal
  } = useCustomDisclosure()
  const {
    isOpen: isOpenStrategy,
    onOpen: onOpenStrategy,
    onClose: onCloseStrategy
  } = useCustomDisclosure()

  const currency = userData.primary_currency

  // --- LÓGICA DE CÁLCULOS ATUALIZADA ---
  const valorAtual = investimentsData?.resumoConta?.totalGeral ?? 0
  const goalDeadline = goal?.meta_year || GOAL_DEADLINE
  const targetValue = goal?.meta_value_to_year || GOAL_TARGET

  const projectionResults = calculateProjection({
    principal: valorAtual,
    annualRate: GOAL_INTEREST_RATE,
    goalDate: goalDeadline,
    financialPlanningYear: financialPlanningYear || []
  })

  const finalProjection =
    projectionResults.length > 0
      ? projectionResults[projectionResults.length - 1]
      : null
  const previsao = finalProjection?.endValue ?? valorAtual
  const totalJuros = finalProjection?.interestGenerated ?? 0
  const diferenca = previsao - targetValue
  const mesesRestantes = finalProjection?.monthsRemaining ?? 0
  const valorGuardadoMes = calcularValorGuardadoMes(
    financialPlanningYear,
    goalDeadline
  )
  const percentualAtual = Math.min((valorAtual / targetValue) * 100, 100)

  const formatMonthYear = (metaYear: any) => {
    const month = String(metaYear.month + 1).padStart(2, '0')
    return `${month}/${metaYear.year}`
  }

  const handleSubmitGoal = async (data: any) => {
    try {
      await mutateGoal(data)
      onCloseGoal()
      onCloseStrategy()
    } catch (error) {
      console.error('Error saving goal:', error)
    }
  }

  return (
    <div className="space-y-2">
      {/* CARD PRINCIPAL DE METAS */}
      <div className="bg-gray-700 p-5 rounded-lg border border-gray-800 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Objetivo Mudança
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar size={12} className="text-blue-400" />
              <span className="text-[10px] font-bold text-blue-400">
                ALVO EM: {formatMonthYear(goalDeadline)}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenGoal}
            className="p-1.5 bg-gray-800 hover:bg-gray-600 rounded transition-all border border-gray-600/30 text-gray-400 hover:text-white"
          >
            <PencilSimpleLine size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-1">
            <p className="text-[9px] text-gray-300 font-black uppercase tracking-tighter">
              Sua Meta
            </p>
            <p className="text-xl font-black text-white">
              {formatCurrencyMoney(targetValue, currency, isVisibilityData)}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[9px] font-black uppercase text-gray-300 tracking-tighter">
              Previsão Final
            </p>
            <p
              className={`text-xl font-black ${previsao >= targetValue ? 'text-green-500' : 'text-red-400'}`}
            >
              {formatCurrencyMoney(previsao, currency, isVisibilityData)}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-gray-400 uppercase">
              Progresso Atual
            </span>
            <span className="text-xs font-black text-green-500">
              {percentualAtual.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-700 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
              style={{ width: `${percentualAtual}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-800/50">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpCircle size={14} className="text-blue-400" />
              <p className="text-[9px] text-gray-300 font-bold uppercase">
                Aporte Mensal
              </p>
            </div>
            <p className="text-sm font-bold text-white">
              {formatCurrencyMoney(
                valorGuardadoMes,
                currency,
                isVisibilityData
              )}
            </p>
          </div>
          <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-800/50">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={14} className="text-orange-400" />
              <p className="text-[9px] text-gray-300 font-bold uppercase">
                Tempo Restante
              </p>
            </div>
            <p className="text-sm font-bold text-white">
              {mesesRestantes}{' '}
              <span className="text-[10px] font-normal text-gray-300">
                Meses
              </span>
            </p>
          </div>
          <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-800/50">
            <p className="text-[9px] text-gray-300 font-bold uppercase mb-1 tracking-tighter">
              Juros Acumulado
            </p>
            <p className="text-sm font-bold text-green-500">
              +{formatCurrencyMoney(totalJuros, currency, isVisibilityData)}
            </p>
          </div>
          <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-800/50">
            <p className="text-[9px] text-gray-300 font-bold uppercase mb-1 tracking-tighter">
              Status (Falta/Sobra)
            </p>
            <p
              className={`text-sm font-bold ${diferenca >= 0 ? 'text-green-500' : 'text-red-400'}`}
            >
              {formatCurrencyMoney(
                Math.abs(diferenca),
                currency,
                isVisibilityData
              )}
            </p>
          </div>
        </div>
      </div>

      {/* CARD 2: META DOS INVESTIMENTOS */}
      <div className="bg-gray-700 p-5 rounded-lg border border-gray-800 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-all duration-700 rotate-12 group-hover:rotate-0">
          <TrendingUp size={130} />
        </div>

        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                Estratégia de Investimentos
              </h3>
            </div>
            <button
              onClick={onOpenStrategy}
              className="p-1.5 bg-gray-800 hover:bg-gray-600 rounded transition-all border border-gray-600/30 text-gray-400 hover:text-white"
            >
              <PencilSimpleLine size={14} />
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {[
              {
                label: 'Caixa Corretora',
                icon: <Landmark size={12} />,
                current:
                  investimentsData?.resumoConta?.corretora?.caixaLivre || 0,
                target: goal?.meta_renda_fixa || 1
              },
              {
                label: 'Ações/ETFs',
                icon: <TrendingUp size={12} />,
                current:
                  investimentsData?.resumoConta?.corretora?.valorDeMercado || 0,
                target: goal?.meta_investimentos || 1
              },
              {
                label: 'Reserva Externa',
                icon: <Wallet size={12} />,
                current: investimentsData?.resumoConta?.reservaExterna || 0,
                target: goal?.meta_reserva || 1
              }
            ].map((item, idx) => {
              const percent = Math.min((item.current / item.target) * 100, 100)
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-end text-white">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-blue-500">{item.icon}</span>
                      <span className="text-[10px] font-bold uppercase text-gray-300">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-black block">
                        {formatCurrencyMoney(
                          item.current,
                          currency,
                          isVisibilityData
                        )}
                      </span>
                      <span className="text-[8px] font-bold text-gray-300 uppercase">
                        Meta:{' '}
                        {formatCurrencyMoney(
                          item.target,
                          currency,
                          isVisibilityData
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-2 border-t border-gray-800 space-y-3">
            <div className="flex items-center gap-2 text-gray-400">
              <ArrowUpCircle size={14} className="text-green-500" />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Renda Passiva Projetada
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 p-2.5 rounded-lg border border-gray-600/20">
                <p className="text-[8px] text-gray-300 font-bold uppercase mb-1">
                  Média Mensal
                </p>
                <p className="text-[13px] font-black text-green-500">
                  {formatCurrencyMoney(
                    (investimentsData?.planejamento?.projecoes?.juros?.mensal ||
                      0) +
                      (investimentsData?.planejamento?.projecoes?.dividendos
                        ?.mensal || 0),
                    currency,
                    isVisibilityData
                  )}
                </p>
              </div>
              <div className="bg-gray-800/50 p-2.5 rounded-lg border border-gray-600/20 text-right">
                <p className="text-[8px] text-gray-300 font-bold uppercase mb-1">
                  Total Anual Est.
                </p>
                <p className="text-[13px] font-black text-green-500">
                  {formatCurrencyMoney(
                    investimentsData?.planejamento?.rendaAnualEstimada || 0,
                    currency,
                    isVisibilityData
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenGoal}
        onClose={onCloseGoal}
        size="2xl"
        isCentered
        title="Ajustar Meta da Mudança"
      >
        <GoalsModal
          onClose={onCloseGoal}
          onSubmit={handleSubmitGoal}
          initialValues={goal}
          currency={currency}
          mode="mudanca"
        />
      </Modal>

      <Modal
        isOpen={isOpenStrategy}
        onClose={onCloseStrategy}
        size="2xl"
        isCentered
        title="Configurar Alocação"
      >
        <GoalsModal
          onClose={onCloseStrategy}
          onSubmit={handleSubmitGoal}
          initialValues={goal}
          currency={currency}
          mode="estrategia"
        />
      </Modal>
    </div>
  )
}

export default CardToGoals
