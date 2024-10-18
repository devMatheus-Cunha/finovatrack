import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IReportData, getReport } from '@/services/reports/getReport'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchReportsData() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const formattedDate = `${month}/${year}`

  const [period, setPeriod] = useState(formattedDate)
  const { userId } = useUserId() as any

  const { data: reportData } = useQuery<IReportData[], unknown>({
    queryKey: ['report_data', period, userId],
    queryFn: () => getReport(userId, period),
    keepPreviousData: true,
    enabled: !!userId
  })

  return {
    reportData,
    setPeriod
  }
}
