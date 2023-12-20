import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Investimentos'
}

export default function InvestmentsLayout({ children }: SideBarProps) {
  return <>{children}</>
}
