import { formatCurrencyMoney } from '@/utils/formatNumber'
import {
  CardBody,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Card,
} from '@chakra-ui/react'
import { GearSix } from '@phosphor-icons/react'
import React from 'react'

const Cards = ({
  isVisibilityData,
  userData,
  setOpenModal,
  investmentsAllGoalsData,
  openModal,
  monthlycontributionData,
}: any) => {
  function calculatePercentageReachedToGoal(
    currentValue: number,
    goalValue: number,
  ): string {
    if (goalValue <= Number(currentValue)) {
      return 'O saldo esta maior que a meta.'
    }

    const percentage = (currentValue / Number(goalValue)) * 100
    const formattedPercentage = percentage.toFixed()
    return `Alcançou ${formattedPercentage}%`
  }

  return (
    <>
      <Card minW="sm" display="flex" flexDirection="row">
        <CardBody flex={1}>
          <StatGroup display="flex" gap={8}>
            <Stat>
              <StatLabel>Aporte Mensal</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      Number(monthlycontributionData?.value),
                      userData?.primary_currency,
                    )
                  : '****'}
              </StatNumber>
              <StatHelpText>
                Período de {monthlycontributionData?.date} meses
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Valor gerado</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      Number(monthlycontributionData?.value) *
                        Number(monthlycontributionData?.date),
                      userData?.primary_currency,
                    )
                  : '****'}
              </StatNumber>
            </Stat>
          </StatGroup>
        </CardBody>
        <Box display="flex" justifyContent="end" cursor="pointer" pt={2} pr={2}>
          <GearSix
            size={24}
            color="#eee2e2"
            onClick={() => {
              setOpenModal({
                ...openModal,
                monthlycontribution: true,
              })
            }}
          />
        </Box>
      </Card>
      <Card minW="sm" display="flex" flexDirection="row">
        <CardBody flex={1}>
          <StatGroup display="flex" gap={8}>
            <Stat>
              <StatLabel>Saldo Aual</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(1000, userData?.primary_currency)
                  : '****'}
              </StatNumber>
              <StatHelpText>
                {isVisibilityData
                  ? calculatePercentageReachedToGoal(
                      1000,
                      investmentsAllGoalsData?.goal,
                    )
                  : '****'}
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Meta</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      investmentsAllGoalsData?.goal,
                      userData?.primary_currency,
                    )
                  : '****'}
              </StatNumber>
            </Stat>
          </StatGroup>
        </CardBody>
        <Box display="flex" justifyContent="end" cursor="pointer" pt={2} pr={2}>
          <GearSix
            size={24}
            color="#eee2e2"
            onClick={() => {
              setOpenModal({
                ...openModal,
                investmentsAllGoals: true,
              })
            }}
          />
        </Box>
      </Card>
    </>
  )
}

export default Cards
