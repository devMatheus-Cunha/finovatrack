'use client'

import React from 'react'
import { Logo } from '@/components'

export default function LayoutAuth({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[100vh] justify-center items-center flex-col gap-6 w-[100%]">
      <Logo className="text-3xl" />
      <div className="w-[95%] lg:w-[55%] xl:w-[36%]">{children}</div>
    </div>
  )
}
