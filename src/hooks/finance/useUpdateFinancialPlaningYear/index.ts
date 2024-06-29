import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { updateFinancialPlanningYearData } from '@/service/finance/updateFinancialPlanningYearData'
import { useFetchFinancialPlaningYear } from '../useFetchFinancialPlaningYear'

const useUpdateFinancialPlaningYear = () => {
  const router = useParams()
  const { refetchFinancialPlanningYear } = useFetchFinancialPlaningYear()

  const { mutateAsync: updateFinancialPlaningYear } = useMutation(
    (data: any) => updateFinancialPlanningYearData(data, router.id),
    {
      onSuccess: () => {
        refetchFinancialPlanningYear()
        toast.success('Sucesso ao editar planejamento')
      },
      onError: () => {
        toast.error('Erro ao editar planejamento')
      }
    }
  )

  return {
    updateFinancialPlaningYear
  }
}

export default useUpdateFinancialPlaningYear
