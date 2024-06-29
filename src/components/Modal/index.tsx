import React from 'react'
import { twMerge } from 'tailwind-merge'
interface IModalProps {
  children: React.ReactNode
  className?: string
}

export default function Modal({ children, className }: IModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className={twMerge('max-w-[700px] w-[50%]', className)}>
        {children}
      </div>
    </div>
  )
}
