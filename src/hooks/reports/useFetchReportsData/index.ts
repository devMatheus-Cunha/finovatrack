import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { IReportData, getReport } from '@/services/reports/getReport'

export default function useFetchReportsData() {
  const [period, setPeriod] = useState('')
  const router = useParams()

  const { data: reportData } = useQuery<IReportData[], unknown>({
    queryKey: ['report_data', period, router.id],
    queryFn: () => getReport(router.id, period),
    keepPreviousData: true,
    enabled: !!period && !!router.id
  })

  return {
    reportData,
    setPeriod
  }
}
