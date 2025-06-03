'use client'

import React, { createContext, useContext, useState } from 'react'

// Contexts
const AccordionContext = createContext<{
  activeItems: string[]
  toggleItem: (id: string) => void
  allowMultiple: boolean
}>({
  activeItems: [],
  toggleItem: () => {},
  allowMultiple: false
})

const ItemContext = createContext<{
  isOpen: boolean
  id: string
}>({
  isOpen: false,
  id: ''
})

// Types
interface AccordionProps {
  children: React.ReactNode
  defaultIndex?: string[]
  allowMultiple?: boolean
  className?: string
}

interface AccordionItemProps {
  children: React.ReactNode
  id: string
  className?: string
}

interface AccordionButtonProps {
  children: React.ReactNode
  className?: string
}

interface AccordionPanelProps {
  children: React.ReactNode
  className?: string
}

// Root Accordion
const Accordion = ({
  children,
  defaultIndex = [],
  allowMultiple = false,
  className = ''
}: AccordionProps) => {
  const [activeItems, setActiveItems] = useState<string[]>(defaultIndex)

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setActiveItems((prevItems) =>
        prevItems.includes(id)
          ? prevItems.filter((item) => item !== id)
          : [...prevItems, id]
      )
    } else {
      setActiveItems(activeItems.includes(id) ? [] : [id])
    }
  }

  return (
    <AccordionContext.Provider
      value={{ activeItems, toggleItem, allowMultiple }}
    >
      <div className={`flex flex-col ${className}`}>{children}</div>
    </AccordionContext.Provider>
  )
}

// Accordion Item
const AccordionItem = ({
  children,
  id,
  className = ''
}: AccordionItemProps) => {
  const { activeItems } = useContext(AccordionContext)
  const isOpen = activeItems.includes(id)

  return (
    <ItemContext.Provider value={{ isOpen, id }}>
      <div className={`border-b border-gray-600/50  ${className}`}>
        {children}
      </div>
    </ItemContext.Provider>
  )
}

// Accordion Button
const AccordionButton = ({
  children,
  className = ''
}: AccordionButtonProps) => {
  const { toggleItem } = useContext(AccordionContext)
  const { id, isOpen } = useContext(ItemContext)

  return (
    <button
      type="button"
      onClick={() => toggleItem(id)}
      className={`flex justify-between items-center w-full py-3 px-4 text-left font-medium ${className}`}
      aria-expanded={isOpen}
    >
      {children}
      <svg
        className={`w-5 h-5 transition-transform duration-200 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  )
}

// Accordion Panel
const AccordionPanel = ({ children, className = '' }: AccordionPanelProps) => {
  const { isOpen } = useContext(ItemContext)

  if (!isOpen) return null

  return (
    <div
      className={`px-4 pb-2 ${className}`}
      style={{
        animation: 'accordionAnimate 0.2s ease-out'
      }}
    >
      {children}
    </div>
  )
}

// Export components
const AccordionRoot = Object.assign(Accordion, {
  Item: AccordionItem,
  Button: AccordionButton,
  Panel: AccordionPanel
})

export default AccordionRoot
