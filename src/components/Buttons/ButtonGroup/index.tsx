'use client'

import React, { ReactNode } from 'react'

interface ButtonOption {
  onClick: () => void
  content: ReactNode
}

interface ButtonGroupProps {
  buttonOptions: ButtonOption[]
}

function ButtonGroup({ buttonOptions }: ButtonGroupProps) {
  return (
    <>
      {buttonOptions?.map((item, index) => (
        <React.Fragment key={index}>
          <button
            type="button"
            onClick={item?.onClick}
            className="border focus:ring-4 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 hover:border-gray-400 text-white-500 hover:text-gray-400 focus:ring-gray-800"
          >
            {item?.content}
          </button>
        </React.Fragment>
      ))}
    </>
  )
}

export default ButtonGroup
