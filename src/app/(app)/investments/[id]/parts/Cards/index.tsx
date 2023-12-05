import {
  formatCurrencyMoney,
  formatToJavaScriptNumber
} from '@/utils/formatNumber'
import {
  CardBody,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Card
} from '@chakra-ui/react'
import { GearSix } from '@phosphor-icons/react'
import React from 'react'

const Cards = ({
  isVisibilityData,
  userData,
  setOpenModal,
  investmentsAllGoalsData,
  openModal,
  monthlycontributionData
}: any) => {
  function calculatePercentageReachedToGoal(
    currentValue: number,
    goalValue: number
  ): string {
    if (currentValue > goalValue) {
      return 'O saldo esta maior que a meta.'
    }

    const percentage = (currentValue / goalValue) * 100
    const formattedPercentage = percentage.toFixed()
    return `Alcançou ${formattedPercentage}%`
  }

  return (
    <Box
      display="flex"
      gap={5}
      flexFlow="wrap"
      justifyContent={['center', 'initial']}
      mt={[2, 0]}
      w="full"
      px={2}
    >
      <Card minW={['xs', 'sm']} display="flex" flexDirection="row">
        <CardBody flex={1}>
          <StatGroup display="flex" gap={4}>
            <Stat>
              <StatLabel>Aporte Mensal</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      Number(monthlycontributionData?.value || 0),
                      userData?.primary_currency
                    )
                  : '****'}
              </StatNumber>
              <StatHelpText>
                Período de {monthlycontributionData?.date || 0} meses
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Valor gerado</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      Number(monthlycontributionData?.value || 0) *
                        Number(monthlycontributionData?.date || 0),
                      userData?.primary_currency
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
                monthlycontribution: true
              })
            }}
          />
        </Box>
      </Card>
      <Card minW={['xs', 'sm']} display="flex" flexDirection="row">
        <CardBody flex={1}>
          <StatGroup display="flex" gap={8}>
            <Stat>
              <StatLabel>Saldo Atual</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      formatToJavaScriptNumber('3.400' || '0'),
                      userData?.primary_currency
                    )
                  : '****'}
              </StatNumber>
              <StatHelpText>
                {isVisibilityData
                  ? calculatePercentageReachedToGoal(
                      formatToJavaScriptNumber('3.400' || '0'),
                      formatToJavaScriptNumber(
                        investmentsAllGoalsData?.goal || '0'
                      )
                    )
                  : '****'}
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Meta</StatLabel>
              <StatNumber>
                {isVisibilityData
                  ? formatCurrencyMoney(
                      formatToJavaScriptNumber(
                        investmentsAllGoalsData?.goal || '0'
                      ),
                      userData?.primary_currency
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
                investmentsAllGoals: true
              })
            }}
          />
        </Box>
      </Card>
    </Box>
  )
}

export default Cards
