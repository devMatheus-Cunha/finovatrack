'use client'

import { SigingProps, siging } from '@/services/auth/siging'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const useSignUp = () => {
  const router = useRouter()

  const { mutateAsync: createAccountUser, isLoading } = useMutation({
    mutationFn: async (values: SigingProps) => siging(values),
    onSuccess: (id: string) => {
      router.push(`/control/${id}`)
    },
    onError: ({ message }: { message: string }) => {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  })

  return {
    createAccountUser,
    isLoading
  }
}

export default useSignUp
