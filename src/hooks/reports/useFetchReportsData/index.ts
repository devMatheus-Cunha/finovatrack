import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IReportData, getReport } from '@/services/reports/getReport'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchReportsData() {
  const [period, setPeriod] = useState('')
  const { userId } = useUserId() as any

  const { data: reportData } = useQuery<IReportData[], unknown>({
    queryKey: ['report_data', period, userId],
    queryFn: () => getReport(userId, period),
    keepPreviousData: true,
    enabled: !!period && !!userId
  })

  return {
    reportData,
    setPeriod
  }
}
