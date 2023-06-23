/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import React from 'react'

interface IModalProps {
  width?: string
  children: React.ReactNode
}

export default function Modal({ children, width = '50%' }: IModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div style={{ width }}>{children}</div>
    </div>
  )
}
