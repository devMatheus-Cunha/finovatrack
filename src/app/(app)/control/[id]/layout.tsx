import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Controle Financeiro'
}

export default function ControlLayout({ children }: SideBarProps) {
  return <>{children}</>
}
