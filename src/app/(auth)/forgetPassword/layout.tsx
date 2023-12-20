import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Recuperar Senha'
}

export default function ForgetPasswordLayout({ children }: SideBarProps) {
  return <>{children}</>
}
