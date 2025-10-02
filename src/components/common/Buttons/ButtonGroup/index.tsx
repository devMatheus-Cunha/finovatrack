'use client'

import React, { ReactNode } from 'react'

interface ButtonOption {
  onClick?: () => void
  content: ReactNode
}

interface ButtonGroupProps {
  buttonOptions: ButtonOption[]
}

function ButtonGroup({ buttonOptions }: ButtonGroupProps) {
  return (
    <div className="flex space-x-2">
      {buttonOptions?.map((item, index) => (
        <button
          key={index}
          onClick={item?.onClick}
          type="button"
          className="p-0 border border-gray-600/50  text-gray-300 hover:border-gray-400 hover:bg-transparent rounded-md transition-colors px-2 py-2 text-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {item?.content}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
