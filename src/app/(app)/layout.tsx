import React, { ReactNode } from 'react'
import { SideMenu } from '@/components/common/SideMenu'

interface SideBarProps {
  children: ReactNode
}

export default function AppLayout({ children }: SideBarProps) {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <SideMenu />
      <div className="flex-1 overflow-auto w-full p-0 md:p-4">{children}</div>
    </div>
  )
}
