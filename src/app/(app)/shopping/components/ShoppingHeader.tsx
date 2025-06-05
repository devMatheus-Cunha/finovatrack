import React from 'react'
import { Home } from 'lucide-react'

interface ShoppingHeaderProps {
  title?: string
}

export function ShoppingHeader({
  title = 'Lista de Compras Casa'
}: ShoppingHeaderProps) {
  return (
    <header className="bg-gray-700 shadow-lg rounded-xl p-4 flex items-center justify-center">
      <Home className="w-8 h-8 text-blue-400 mr-3" />
      <h1 className="text-3xl font-bold text-blue-300">{title}</h1>
    </header>
  )
}
