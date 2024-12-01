import { ExpenseToCategory } from '@/components'
import { Skeleton, Box, VStack, Text } from '@chakra-ui/react'
import { IReportData } from '@/services/reports/getReport'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'

const CardToCategoryExpense = ({
  isLoading,
  reportData
}: {
  isLoading: boolean
  reportData: IReportData | null | undefined
}) => {
  const { userData } = useUserData()
  const { isVisibilityData } = useIsVisibilityDatas()

  return (
    <>
      {isLoading ? (
        <Skeleton
          w={{ base: '100%', lg: 'xs' }}
          h={{ base: 551, lg: 573.5 }}
          rounded="md"
        />
      ) : (
        <>
          {reportData?.data && reportData?.data.length > 0 ? (
            <Box w={{ base: '100%', lg: 'xs' }} h="max-content">
              <ExpenseToCategory
                expensesData={reportData.data}
                userData={userData}
                isVisibilityData={isVisibilityData}
                totalExpenses={reportData?.totalExpenses}
              />
            </Box>
          ) : (
            <VStack
              alignItems="center"
              justifyContent="center"
              overflowY="auto"
              w={{ base: '100%', lg: 'xs' }}
              h={{ base: 551, lg: 573.5 }}
              rounded="md"
              bg={{ lg: 'gray.700' }}
            >
              <Text mt={4} fontWeight="bold" fontSize={23} color="white">
                Nenhum relatório gerado
              </Text>
              <Text mt={2} fontSize="sm" color="gray.300">
                Não há dados disponíveis para este período.
              </Text>
            </VStack>
          )}
        </>
      )}
    </>
  )
}

export default CardToCategoryExpense
