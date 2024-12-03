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

  if (isLoading) {
    return (
      <Skeleton
        w={{ base: '100%', lg: 'xs' }}
        h={{ base: 214, lg: 555 }}
        rounded="md"
      />
    )
  }

  return (
    <>
      {reportData?.data && reportData?.data.length > 0 ? (
        <Box w={{ base: '100%', lg: 'xs' }}>
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
          h={{ base: 214, lg: 555 }}
          rounded="md"
          bg="gray.700"
        >
          <Text
            mt={4}
            fontWeight="bold"
            color="white"
            fontSize={{ base: 'xl', lg: 26 }}
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

export default CardToCategoryExpense
