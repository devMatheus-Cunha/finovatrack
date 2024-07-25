import { useUserId } from '@/hooks/globalStates'
import {
  LoginProps,
  login,
  updatedDocumentForUser
} from '@/services/auth/login'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const useLogin = () => {
  const router = useRouter()
  const { setUserId } = useUserId()

  const { mutateAsync: loginWithEmail, isLoading } = useMutation(
    (values: LoginProps) => login(values),
    {
      onSuccess: async (user) => {
        setUserId(user.uid)
        updatedDocumentForUser({
          id: user.uid,
          expirationTimeToken: (await user.getIdTokenResult()).expirationTime,
          token: (await user.getIdTokenResult()).token
        } as any)
        router.push(`/control`)
      },
      onError: ({ message }: { message: string }) => {
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  )

  return {
    loginWithEmail,
    isLoading
  }
}

export default useLogin
