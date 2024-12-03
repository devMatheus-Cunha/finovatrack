import { InfoCardsToReport } from '@/components'
import { Skeleton, VStack, Box, Text } from '@chakra-ui/react'
import { IReportData } from '@/services/reports/getReport'
import { useUserData } from '@/hooks/globalStates'

const CardToStatsInMonth = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()

  if (isLoading) {
    return (
      <Skeleton
        height={{ base: 214, lg: 200 }}
        w={{ base: '100%', lg: '2xl' }}
        rounded="md"
      />
    )
  }

  return (
    <>
      {reportData?.data && reportData?.data.length > 0 ? (
        <Box>
          <InfoCardsToReport
            data={reportData}
            userData={userData}
            isLoading={isLoading}
          />
        </Box>
      ) : (
        <VStack
          alignItems="center"
          justifyContent="center"
          overflowY="auto"
          rounded="md"
          w={{ base: '100%', lg: '2xl' }}
          height={{ base: 214, lg: 200 }}
          bg="gray.700"
          p={{ base: '4', lg: '0' }}
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

export default CardToStatsInMonth
