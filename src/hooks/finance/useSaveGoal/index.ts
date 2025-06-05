import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { saveGoal, ISaveGoalProps } from '@/services/finance/goals'
import { useGoals } from '../useGoals'
import { useUserId } from '@/hooks/globalStates'

const useSaveGoal = () => {
 const { userId } = useUserId() as any
 const { refetchGoals } = useGoals()

 const { mutateAsync: mutateGoal } = useMutation({
  mutationFn: (data: ISaveGoalProps) => saveGoal(data, userId),
  onSuccess: () => {
   refetchGoals()
   toast.success('Sucesso ao salvar meta')
  },
  onError: () => {
   toast.error('Erro ao salvar meta')
  }
 })

 return {
  mutateGoal
 }
}

export default useSaveGoal