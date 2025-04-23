import React from 'react'
import {
  AccordionPanel as AccordionPanelChakra,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { Info, PencilSimpleLine } from '@phosphor-icons/react'
import { UserData } from '@/hooks/entrys/useDeletedEntry/auth/useAuth/types'
import {
  currentAndPreviousYearValidity,
  formatCurrencyMoney
} from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData '
import { useFetchReportsData } from '@/hooks/reports'

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
    const { year } =
      useFetchReportsData()
  const { reportDataToYear } = useFetchReportsToYearData(String(year))
  const yearContributions =
    Number(data.periodContributions) * Number(data.monthlyContributions)
  const totalFixedAndExtraContribution = reportDataToYear?.totalInvestments

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
    <AccordionPanelChakra
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap={10}
    >
      <Stack w="max-content">
        <Heading size="sm">Investimentos</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(data.investments),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Reserva</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(reserveAmount),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm" display="flex" gap={1}>
          Contrib Mensal
          <Tooltip
            label="Contruição fixa todo mês"
            fontSize="sm"
            hasArrow
            placement="top"
          >
            <Info size={18} color="orange" />
          </Tooltip>
        </Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(data.monthlyContributions),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Periodo Contrib</Heading>
        <Text fontSize="md">{data.periodContributions} Meses</Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Contrib Res</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(yearContributions),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Contrib Extra</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(data.receivables),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Total Contrib</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            totalFixedAndExtraContribution || 0,
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Dedução</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(data.deduction),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Total Anual</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            totalAnnualAmount,
            userData.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>

      <IconButton
        aria-label="Edit values"
        onClick={onOpen}
        variant="outline"
        icon={<PencilSimpleLine color="#eee2e2" />}
      />
    </AccordionPanelChakra>
  )
}

export default AccordionPanel
