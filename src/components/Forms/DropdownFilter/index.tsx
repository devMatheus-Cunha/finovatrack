'use client'

import { CaretDown, Funnel } from '@phosphor-icons/react'
import React from 'react'

interface Option {
  text: string
  value: string
}

interface DropdownFilterProps {
  options: Option[]
  value: string
  onFilter: any
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  value,
  onFilter,
}) => {
  return (
    <div className="hs-dropdown relative inline-flex [--strategy:absolute]">
      <button
        id="s-dropdown-left-but-right-on-lg"
        type="button"
        className="hs-dropdown-toggle inline-flex justify-center items-center gap-2 transition-all px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        <div className="hidden md:block">
          <div className="flex gap-3 ">
            Filtros
            <CaretDown size={20} color="#eee2e2" />
          </div>
        </div>
        <Funnel className="block md:hidden" size={20} color="#eee2e2" />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration text-white hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] px-2 py-2.5 text-sm font-medium rounded-lg bg-gray-800 border border-gray-700 shadow"
        aria-labelledby="hs-dropdown-basic"
      >
        <span className="block md:hidden py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-gray-500">
          Filtros
        </span>
        {options.map((item) => (
          <>
            <button
              className={`flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gray-700 border-gray-700 
              ${value === item.value ? 'bg-gray-700' : 'bg-transparent'}`}
              onClick={() => onFilter(item.value)}
            >
              {item.text}
            </button>
          </>
        ))}
      </div>
    </div>
  )
}

export default DropdownFilter
