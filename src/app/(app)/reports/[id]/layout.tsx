import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Relatórios'
}

export default function ReportLayout({ children }: SideBarProps) {
  return <>{children}</>
}
