import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { IReportData } from '@/services/reports/getReport'
import { saveReportService } from '@/services/reports/saveReport'
import { useParams } from 'next/navigation'

export default function useSaveReport() {
  const router = useParams()

  const {
    mutateAsync: saveReport,
    isLoading: isLoadingSaveReport,
    status: statusSaveReport
  } = useMutation(
    async (data: IReportData) => {
      await saveReportService(data, router.id)
    },
    {
      onSuccess: () => {
        toast.success('Sucesso ao salvar relatório')
      },
      onError: () => {
        toast.error('Erro ao salvar relatório')
      }
    }
  )

  return {
    saveReport,
    isLoadingSaveReport,
    statusSaveReport
  }
}
