import { useMutation } from '@tanstack/react-query'
import { forgetPassword } from '@/service/auth/forgetPassword'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const useForgetPassword = () => {
  const router = useRouter()
  const { mutate: onForgetPassword, isLoading } = useMutation(forgetPassword, {
    onSuccess: async () => {
      toast.success('E-mail de recupeção enviado!', {
        position: toast.POSITION.TOP_RIGHT,
      })
      router.push('/login')
    },
    onError: ({ message }: { message: string }) => {
      if (
        message ===
        'Firebase: Error (auth/invalid-value-(email),-starting-an-object-on-a-scalar-field).'
      ) {
        toast.error(
          'E-mail inválido. Por favor, insira um endereço de e-mail válido.',
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        )
      } else {
        toast.error('Erro no Servidor. Tente mais tarde!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    },
  })

  return {
    onForgetPassword,
    isLoading,
  }
}

export default useForgetPassword
