import {
  Skeleton,
  VStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Heading,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Box
} from '@chakra-ui/react'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { formatCurrencyMoney } from '@/utils/formatNumber'
import useFetchReportsToYearData from '@/hooks/reports/useFetchReportsToYearData '
import Slider from 'react-slick'

const CardToStatsInYear = ({ year }: { year: string }) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()
  const { reportDataToYear, isLoading } = useFetchReportsToYearData(year)

  const investmentPercentage =
    reportDataToYear &&
    (
      (reportDataToYear?.totalInvestments / reportDataToYear?.totalEntrys) *
      100
    ).toFixed(2)

  const summaryItems = [
    {
      label: 'Total Entradas',
      value: reportDataToYear?.totalEntrys
    },
    {
      label: 'Total Gastos',
      value: reportDataToYear?.totalExpenses
    },
    {
      label: 'Total Livre',
      value: reportDataToYear?.totalFree
    },
    {
      label: 'Total Investido',
      value: reportDataToYear?.totalInvestments,
      investments: `${investmentPercentage}%`
    }
  ]

  if (isLoading) {
    return (
      <Skeleton
        height={{ base: '40', lg: '40' }}
        w={{ base: '100%', lg: '100%' }}
        rounded="md"
      />
    )
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    arrowsPadding: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <>
      {reportDataToYear ? (
        <Card
          bg={{ base: 'none', lg: 'gray.700' }}
          h={{ base: 'initial', lg: '40' }}
          boxShadow="none"
        >
          <CardHeader display="flex" alignItems="end" gap={3} pb={0}>
            <Box>
              <Text color="gray.400" fontSize="sm">
                Ano {year}
              </Text>
              <Heading size="md">Relatorio Anual</Heading>
            </Box>
          </CardHeader>

          <CardBody pt={{ base: '4', lg: 0 }}>
            <Slider {...settings} className="w-full">
              {summaryItems.map((card, index) => (
                <Box key={index} p={{ base: 2, lg: 1 }}>
                  <GridItem
                    display="flex"
                    w="full"
                    alignItems="center"
                    bg="gray.700"
                    borderRadius="md"
                    py={4}
                    px={{ base: 2, lg: 4 }}
                  >
                    <Stat>
                      <StatLabel fontSize="xs" color="gray.500">
                        {card.label}
                      </StatLabel>
                      <HStack>
                        <StatNumber
                          fontSize={{ base: 'lg', lg: 'xl' }}
                          textDecor="underline"
                        >
                          {formatCurrencyMoney(
                            card.value,
                            userData.primary_currency,
                            isVisibilityData
                          )}
                        </StatNumber>
                        {card.investments && (
                          <StatHelpText
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="center"
                          >
                            <StatArrow type="increase" />
                            {card.investments}
                          </StatHelpText>
                        )}
                      </HStack>
                    </Stat>
                  </GridItem>
                </Box>
              ))}
            </Slider>
          </CardBody>
        </Card>
      ) : (
        <VStack
          h="full"
          alignItems="center"
          justifyContent="center"
          overflowY="auto"
          rounded="md"
          w={{ base: '100%', lg: '100%' }}
          height={{ base: '40', lg: '40' }}
          bg="gray.700"
        >
          <Text
            mt={4}
            fontWeight="bold"
            fontSize={{ base: 'xl', lg: 26 }}
            color="white"
          >
            Nenhum relatório gerado
          </Text>
          <Text mt={2} fontSize={{ base: 'sm', lg: 'md' }} color="gray.300">
            Não há dados disponíveis para este período.
          </Text>
        </VStack>
      )}
    </>
  )
}

export default CardToStatsInYear
