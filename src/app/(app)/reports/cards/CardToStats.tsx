import { InfoCardsToReport } from '@/components'
import { Skeleton, VStack, Box, Text } from '@chakra-ui/react'
import { IReportData } from '@/services/reports/getReport'
import { useUserData } from '@/hooks/globalStates'

const CardToStats = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()

  return (
    <>
      {isLoading ? (
        <Skeleton
          height={{ base: 214, lg: 227 }}
          w={{ base: '100%', lg: '2xl' }}
          rounded="md"
        />
      ) : (
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
              h="full"
              alignItems="center"
              justifyContent="center"
              overflowY="auto"
              rounded="md"
              w={{ base: '100%', lg: '2xl' }}
              height={{ base: 214, lg: 227 }}
              bg={{ lg: 'gray.700' }}
            >
              <Text mt={4} fontWeight="bold" fontSize={30} color="white">
                Nenhum relatório gerado
              </Text>
              <Text mt={2} fontSize="md" color="gray.300">
                Não há dados disponíveis para este período.
              </Text>
            </VStack>
          )}
        </>
      )}
    </>
  )
}

export default CardToStats
