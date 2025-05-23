import { useQuery } from '@tanstack/react-query'
import {
  getReportsToYear,
  IReportToYearData
} from '@/services/reports/getReportsToYear'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchReportsToYearData(year: string) {
  const { userId } = useUserId() as any

  const { data: reportDataToYear, isLoading } = useQuery<IReportToYearData>({
    queryKey: ['report_data_to_year', year, userId],
    queryFn: () => getReportsToYear(userId, year),
    enabled: !!userId
  })

  return {
    reportDataToYear,
    isLoading
  }
}
