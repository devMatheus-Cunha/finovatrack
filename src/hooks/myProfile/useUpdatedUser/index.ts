import { useUserData, useUserId } from '@/hooks/globalStates'
import { updatedDocumentForUser, updatedEmailUser } from '@/services/auth/login'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface IUpadtedUserProps {
  name?: string
  email?: string
  primary_currency?: string
  secondary_currency?: string
}

const useUpdatedUser = () => {
  const { userId } = useUserId() as any
  const { refetchUserData } = useUserData()

  const { mutateAsync: updatedUserData, isPending: isLoading } = useMutation({
    mutationFn: async (values: IUpadtedUserProps) => {
      await updatedEmailUser(values.email)
      await updatedDocumentForUser({
        id: userId,
        ...values
      } as any)
    },
    onSuccess: async () => {
      await refetchUserData()
      toast.success('Usuario atualizado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT
      })
    },
    onError: () => {
      toast.error('Erro ao atualizar usuario.', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  })

  return {
    updatedUserData,
    isLoading
  }
}

export default useUpdatedUser
