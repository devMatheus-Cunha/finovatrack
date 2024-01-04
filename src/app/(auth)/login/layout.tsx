import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginLayout({ children }: SideBarProps) {
  return <>{children}</>
}
