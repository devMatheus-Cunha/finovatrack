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
import { formatCurrencyMoney } from '@/utils/formatNumber'
import { IFinancialPlanningProps } from '@/services/finance/getFinancialPlanningYear'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData '

interface AccordionPanelProps {
  data: IFinancialPlanningProps
  userData: UserData
  onOpen: () => void
  isVisibilityData?: boolean
  year: string
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
  isVisibilityData,
  year
}) => {
  const validate = data.year === "2025"
  const yearContributions =
    Number(data.periodContributions) * Number(data.monthlyContributions)
  const quantidadeDeMesesAportados = 12 - Number(data.periodContributions)
  const valorAportadoFixo = quantidadeDeMesesAportados * Number(data.monthlyContributions)
  const valorAportadoFixoMaisExtra = valorAportadoFixo + Number(data.receivables)
  const reserve = validate ? data.reserve : data.totoalReserveLastYear

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
            Number(reserve),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm" display="flex" gap={1}>
          Aporte Mensal
          <Tooltip
            label="Aporte fixo que e feito todos os meses"
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
        <Heading size="sm">Período Aporte</Heading>
        <Text fontSize="md">{data.periodContributions} Meses</Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Aporte Restante</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(yearContributions),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Aporte Extra</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
            Number(data.receivables),
            userData?.primary_currency,
            isVisibilityData
          )}
        </Text>
      </Stack>
      <Stack w="max-content">
        <Heading size="sm">Total Aportado</Heading>
        <Text fontSize="md">
          {formatCurrencyMoney(
           valorAportadoFixoMaisExtra || 0,
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
              Number(reserve) +
              yearContributions +
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
