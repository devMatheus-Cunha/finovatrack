'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/service/auth/logout'

const useLogout = () => {
  const router = useRouter()
  const { mutate: onLogout } = useMutation(logout, {
    onSuccess: () => {
      router.push('/login')
    },
  })

  return {
    onLogout,
  }
}

export default useLogout
