'use client'

import React, { ReactNode } from 'react'
import Button from '../Button'

interface ButtonOption {
  onClick: () => void
  content: ReactNode
}

interface ButtonGroupProps {
  buttonOptions: ButtonOption[]
}

function ButtonGroup({ buttonOptions }: ButtonGroupProps) {
  return (
    <div className="flex space-x-2">
      {buttonOptions?.map((item, index) => (
        <Button
          key={index}
          onClick={item?.onClick}
          variant="outline"
          className="p-0 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-transparent"
        >
          {item?.content}
        </Button>
      ))}
    </div>
  )
}

export default ButtonGroup
