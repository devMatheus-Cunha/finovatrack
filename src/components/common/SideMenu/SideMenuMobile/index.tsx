'use client'

import React, { useState } from 'react'
import { List, Eye, EyeSlash } from '@phosphor-icons/react'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { useRouter } from 'next/navigation'
import { Button } from '@/components'
interface SidebarItem {
  id: string
  label: string
  route: string
  disabled: boolean
  icon: React.ElementType | React.ReactNode
  action?: () => void
}

const SideMenuMobile: React.FC<{
  sidebarItems: SidebarItem[]
  pathname: string
}> = ({ sidebarItems, pathname }) => {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (route: string, action?: () => void) => {
    if (action) {
      action()
    } else {
      router.push(route !== 'logout' ? `/${route}` : '#')
    }
    setIsOpen(false)
  }

  return (
    <>
      <div className="flex flex-row gap-3">
        <Button
          variant="ghost"
          onClick={handleToggleVisibilityData}
          className="bg-gray-700 p-2 rounded-md"
          leftIcon={
            isVisibilityData ? <Eye size={21} /> : <EyeSlash size={21} />
          }
          aria-label={isVisibilityData ? 'Hide Data' : 'Show Data'}
        />
        <Button
          variant="ghost"
          onClick={() => setIsOpen(true)}
          className="bg-gray-700 p-2 rounded-md"
          leftIcon={<List size={22} />}
          aria-label="Open Menu"
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
          />
          <aside className="fixed top-0 left-0 h-full w-64 bg-gray-700 border-r border-gray-700 z-50 flex flex-col shadow-lg animate-slide-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-white text-xl"
              aria-label="Fechar menu"
            >
              ×
            </button>
            <div className="pt-7 pb-10 px-3 overflow-y-auto flex-1 flex flex-col">
              <div className="flex flex-col gap-1.5 w-full">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleNavigation(item.route, item.action)}
                    className={`w-full justify-start text-left ${pathname?.includes(item.route) ? 'text-blue-500' : 'text-white'}`}
                    variant="ghost"
                    disabled={item.disabled}
                    leftIcon={
                      typeof item.icon === 'function'
                        ? React.createElement(item.icon, {
                            className: 'w-5 h-5',
                            color: 'currentColor'
                          })
                        : item.icon
                    }
                  >
                    <span className="ml-0.5 text-[14px]">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

export default SideMenuMobile
