'use client'
import React from 'react'
import { Logo } from '@/components'

export default function LayoutAuth({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen justify-center items-center flex-col w-full gap-6">
      <Logo fontSize="4xl" />
      <div className="w-full sm:w-full md:w-full lg:w-[55%] xl:w-[36%] px-4">
        {children}
      </div>
    </div>
  )
}
