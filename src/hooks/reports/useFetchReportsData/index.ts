import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IReportData, getReport } from '@/services/reports/getReport'
import { useUserId } from '@/hooks/globalStates'

export default function useFetchReportsData() {
  const { userId } = useUserId() as any
  const [selectedDate, setSelectedDate] = useState(new Date())

  const year = selectedDate.getFullYear()
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
  const formattedDate = `${month}/${year}`

  const { data: reportData, isLoading } = useQuery<IReportData | null>({
    queryKey: ['report_data', month, year, userId],
    queryFn: () => getReport(userId, formattedDate),
    enabled: !!userId
  })

  console.log(reportData)

  return {
    reportData,
    setSelectedDate,
    month,
    year,
    isLoading,
    formattedDate
  }
}
