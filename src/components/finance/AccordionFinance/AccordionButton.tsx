'use client'

import React from 'react'

interface AccordionButtonProps {
  year: string
}

const AccordionButton: React.FC<AccordionButtonProps> = ({ year }) => {
  return (
    <span className="flex-1 text-left font-bold text-lg text-white">
      {year}
    </span>
  )
}

export default AccordionButton
