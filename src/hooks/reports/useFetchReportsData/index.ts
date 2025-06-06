import { useQuery } from '@tanstack/react-query'
import { IReportData, getReport } from '@/services/reports/getReport'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchReportsData(selectedDate: Date) {
  const { userId } = useUserId() as any

  const year = selectedDate.getFullYear()
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
  const formattedDate = `${month}/${year}`

  const {
    data: reportDataRequest,
    isFetching,
    isFetched
  } = useQuery<IReportData | null>({
    queryKey: ['report_data', month, year, userId],
    queryFn: () => getReport(userId, formattedDate),
    enabled: !!userId,
    placeholderData: (previous) => previous
  })

  const isLoading = isFetching || !isFetched
  const reportData = isLoading ? undefined : reportDataRequest

  return {
    reportData,
    month,
    year,
    isLoading,
    formattedDate
  }
}
