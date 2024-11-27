import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateFinancialPlanningYearData } from '@/services/finance/updateFinancialPlanningYearData'
import { useFetchFinancialPlaningYear } from '../useFetchFinancialPlaningYear'
import { useUserId } from '@/hooks/globalStates'

const useUpdateFinancialPlaningYear = () => {
  const { userId } = useUserId() as any
  const { refetchFinancialPlanningYear } = useFetchFinancialPlaningYear()

  const { mutateAsync: updateFinancialPlaningYear } = useMutation({
    mutationFn: (data: any) => updateFinancialPlanningYearData(data, userId),
    onSuccess: () => {
      refetchFinancialPlanningYear()
      toast.success('Sucesso ao editar planejamento')
    },
    onError: () => {
      toast.error('Erro ao editar planejamento')
    }
  })

  return {
    updateFinancialPlaningYear
  }
}

export default useUpdateFinancialPlaningYear
