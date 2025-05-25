'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth/logout'
import { useUserId } from '@/hooks/globalStates'

const useLogout = () => {
  const router = useRouter()
  const { clearUserId } = useUserId()
  const { mutateAsync: onLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUserId()
      router.push('/login')
    }
  })

  return {
    onLogout
  }
}

export default useLogout
