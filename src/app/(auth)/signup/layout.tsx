import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Criar Conta'
}

export default function SigingLayout({ children }: SideBarProps) {
  return <>{children}</>
}
