'use client'

import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { Eye, EyeSlash, List } from '@phosphor-icons/react'
import React from 'react'

const SideMenuMobile = ({
  sidebarItems,
  pathname
}: {
  pathname: string
  sidebarItems: {
    id: string
    label: string
    route: string
    disabled: boolean
    icon: React.JSX.Element
    action: () => void
  }[]
}) => {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()

  return (
    <>
      <div className="flex gap-3 item-center">
        <button type="button" onClick={() => handleToggleVisibilityData()}>
          {isVisibilityData ? (
            <Eye size={21} color="#eee2e2" />
          ) : (
            <EyeSlash size={21} color="#eee2e2" />
          )}
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          data-hs-overlay="#docs-sidebar"
          aria-controls="docs-sidebar"
          aria-label="Toggle navigation"
        >
          <List size={22} color="#eee2e2" />
        </button>
      </div>

      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-44  border-r  pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 scrollbar-y bg-gray-800 border-gray-700"
      >
        <div className="px-3 mb-3">
          <a
            className="flex-none text-xl font-semibold text-white"
            aria-label="Brand"
          >
            Menu
          </a>
        </div>
        <nav
          className="hs-accordion-group w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {sidebarItems.map((item) => (
              <React.Fragment key={item.id}>
                <li>
                  <button
                    onClick={item.action}
                    disabled={item.disabled}
                    className={`${
                      pathname?.includes(item?.route)
                        ? 'text-cyan-600'
                        : 'text-white'
                    } hover:opacity-75 flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md  bg-gray-800  w-full`}
                  >
                    {item.icon}
                    <p className="text-[14px]">{item.label}</p>
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default SideMenuMobile
