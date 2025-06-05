'use client'

import React from 'react'
import { PencilSimpleLine, Info } from '@phosphor-icons/react'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import {
  currentAndPreviousYearValidity,
  formatCurrencyMoney
} from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'

interface AccordionPanelProps {
  data: IFinancialPlanningProps
  userData: UserData
  onOpen: () => void
  isVisibilityData?: boolean
  year: string
}

const MONTHS_IN_YEAR = 12

export function monthsLeftUntilEndOfYear() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const monthsRemaining = 11 - currentMonth
  return monthsRemaining
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  data,
  onOpen,
  userData,
  isVisibilityData
}) => {
  const yearContributions =
    Number(data.periodContributions) * Number(data.monthlyContributions)
  const contributedMonths = MONTHS_IN_YEAR - Number(data.periodContributions)
  const fixedContribution =
    contributedMonths * Number(data.monthlyContributions)
  const totalFixedAndExtraContribution =
    fixedContribution + Number(data.receivables)

  const reserveAmount = currentAndPreviousYearValidity(data.year)
    ? data.reserve
    : data.totoalReserveLastYear

  const totalAnnualAmount =
    Number(data.investments) +
    Number(reserveAmount) +
    yearContributions +
    Number(data.receivables) -
    Number(data.deduction)

  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="w-max">
        <h3 className="text-sm font-semibold">Investimentos</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            Number(data.investments),
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Reserva</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            Number(reserveAmount),
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold flex gap-1">
          Contrib Mensal
          <span className="group relative">
            <Info size={18} className="text-orange-500" />
            <span className="absolute -top-10 left-0 hidden group-hover:block bg-gray-800/50 text-white text-xs p-2 rounded">
              Contribuição fixa todo mês
            </span>
          </span>
        </h3>
        <p className="text-md">
          {formatCurrencyMoney(
            Number(data.monthlyContributions),
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Periodo Contrib</h3>
        <p className="text-md">{data.periodContributions} Meses</p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Contrib Res</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            Number(yearContributions),
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Contrib Extra</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            Number(data.receivables),
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Total Contrib</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            totalFixedAndExtraContribution || 0,
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Dedução</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            Number(data.deduction),
            userData?.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>
      <div className="w-max">
        <h3 className="text-sm font-semibold">Total Anual</h3>
        <p className="text-md">
          {formatCurrencyMoney(
            totalAnnualAmount,
            userData.primary_currency,
            isVisibilityData
          )}
        </p>
      </div>

      <button
        aria-label="Edit values"
        onClick={onOpen}
        className="p-2 border border-gray-600/50  rounded hover:bg-gray-700"
      >
        <PencilSimpleLine size={20} className="text-gray-300" />
      </button>
    </div>
  )
}

export default AccordionPanel
