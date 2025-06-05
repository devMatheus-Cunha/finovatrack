// components/CustomCheckbox.tsx (Componente de Checkbox Customizado)

import React from 'react'
import { Check } from 'lucide-react'

interface CustomCheckboxProps {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  labelClassName?: string
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  labelClassName
}) => (
  <label htmlFor={id} className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="sr-only peer" // Esconde o input original, mas mantém a funcionalidade
    />
    <div
      className={`
        h-4 w-4 rounded-full border border-gray-600 bg-gray-800/50 flex items-center justify-center transition-all duration-200
        ${checked ? 'bg-blue-600 border-blue-600' : ''}
        peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-700
      `}
    >
      {checked && <Check size={12} className="text-white" />}
    </div>
    <span
      className={`ml-2 block text-sm font-medium ${labelClassName || 'text-gray-200'}`}
    >
      {label}
    </span>
  </label>
)
