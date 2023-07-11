import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function Logo({ className }: { className?: string }) {
  return (
    <h1 className={twMerge('text-2xl font-bold', className)}>
      Finova<strong className="text-cyan-600">Tranck</strong>
    </h1>
  )
}
