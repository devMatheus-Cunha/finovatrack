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
import { UserData } from '@/hooks/auth/useAuth/types'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'

interface AccordionPanelProps {
  data: IFinancialPlanningProps
  userData: UserData
  onOpen: () => void
  isVisibilityData?: boolean
}

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
            Number(data.totoalReserveLastYear ?? data.reserve),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm" display="flex" gap={1}>
          Aporte Mensal
          <Tooltip
            label={`O cálculo é baseado nos campos Aporte Mensal x Período Aporte em Meses `}
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
        <Heading size="sm">A Receber</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(data.receivables),
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
            Number(data.investments) +
              Number(data.totoalReserveLastYear ?? data.reserve) +
              Number(data.monthlyContributions) *
                Number(data.periodContributions) +
              Number(data.receivables) -
              Number(data.deduction),
            userData.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <IconButton
        aria-label="Editar valores"
        onClick={onOpen}
        variant="outline"
        icon={<PencilSimpleLine color="#eee2e2" />}
      />
    </AccordionPanelChakra>
  )
}

export default AccordionPanel
