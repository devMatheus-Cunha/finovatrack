import { useQuery } from '@tanstack/react-query'
import {
  getReportsToYear,
  IReportToYearData
} from '@/services/reports/getReportsToYear'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchReportsToYearData(year: string) {
  const { userId } = useUserId() as any

  const {
    data: reportDataToYearRaw,
    isFetching,
    isFetched
  } = useQuery<IReportToYearData>({
    queryKey: ['report_data_to_year', year, userId],
    queryFn: () => getReportsToYear(userId, year),
    enabled: !!userId,
    placeholderData: (previous) => previous
  })

  const isLoading = isFetching || !isFetched
  const reportDataToYear = isLoading ? undefined : reportDataToYearRaw

  return {
    reportDataToYear,
    isLoading,
    isFetching,
    isFetched
  }
}
