import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Meu Perfil'
}

export default function MyProfileLayout({ children }: SideBarProps) {
  return (
    <div className="w-full p-2 flex justify-center items-center min-h-[auto] md:min-h-[90vh]">
      <div className="flex flex-col items-center gap-4 w-full">{children}</div>
    </div>
  )
}
