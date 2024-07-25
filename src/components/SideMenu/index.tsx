'use client'

import React from 'react'

const SideMenu = ({
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
  return (
    <aside className="hidden lg:block transition-opacity duration-300">
      <div className="h-full flex flex-col px-2.5 py-3.5 bg-gray-800">
        <div className="flex flex-col gap-6">
          {sidebarItems.map((item) => (
            <React.Fragment key={item.id}>
              <button
                data-tooltip-target="tooltip-default"
                className={`focus:outline-none font-medium rounded-lg text-md transparent focus:ring-gray-600 border-gray-600 w-[100%] flex items-center justify-center ${
                  item.disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer'
                }`}
                onClick={item.action}
                disabled={item.disabled}
              >
                <div
                  className={`flex gap-0.5 flex-col justify-center items-center ${
                    pathname?.includes(item?.route)
                      ? 'text-cyan-600'
                      : '#eee2e2'
                  } hover:opacity-75`}
                >
                  {item.icon}
                  <p className="text-[11px]">{item.label}</p>
                </div>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default SideMenu
