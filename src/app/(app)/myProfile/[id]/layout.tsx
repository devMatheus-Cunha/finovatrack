/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/button-has-type */

import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Meu Perfil',
}

export default function MyProfileLayout({ children }: SideBarProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] p-[2%]">
      {children}
    </div>
  )
}
