'use client'

import { Funnel } from '@phosphor-icons/react'
import React, { useState, useRef, useEffect } from 'react'

interface Option {
  text: string
  value: string
  type: string
}

interface DropdownFilterProps {
  options: Option[]
  value: string
  onFilter: any
  label: string
  disabled?: boolean
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  onFilter,
  label,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center gap-2 p-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        disabled={disabled}
      >
        <Funnel size={20} />
        <span>Filtrar</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="block lg:hidden py-2 px-4 text-xs text-gray-400 border-b border-gray-700">
              {label}
            </div>
            {options.map((item) => (
              <button
                key={item.value}
                className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-700"
                role="menuitem"
                onClick={() => {
                  onFilter(item)
                  setIsOpen(false)
                }}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownFilter
