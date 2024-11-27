import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { IReportData } from '@/services/reports/getReport'
import { saveReportService } from '@/services/reports/saveReport'
import { useUserId } from '@/hooks/globalStates'

export default function useSaveReport() {
  const { userId } = useUserId() as any

  const {
    mutateAsync: saveReport,
    isPending: isLoadingSaveReport,
    status: statusSaveReport
  } = useMutation({
    mutationFn: async (data: IReportData) => {
      await saveReportService(data, userId)
    },
    onSuccess: () => {
      toast.success('Sucesso ao salvar relatório')
    },
    onError: () => {
      toast.error('Erro ao salvar relatório')
    }
  })

  return {
    saveReport,
    isLoadingSaveReport,
    statusSaveReport
  }
}
