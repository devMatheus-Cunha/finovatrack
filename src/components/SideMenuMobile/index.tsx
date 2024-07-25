import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { Eye, EyeSlash, List } from '@phosphor-icons/react'
import Link from 'next/link'
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

      <div id="docs-sidebar" className="hs-overlay ...">
        {/* ... (outras partes do seu componente) */}
        <nav className="hs-accordion-group ...">
          <ul className="space-y-1.5">
            {sidebarItems.map((item) => (
              <React.Fragment key={item.id}>
                <li>
                  <Link
                    href={item.route !== 'logout' ? `/${item.route}` : '#'}
                    onClick={item.action}
                    className={`${
                      pathname?.includes(item?.route)
                        ? 'text-cyan-600'
                        : 'text-white'
                    } hover:opacity-75 flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md  bg-gray-800  w-full`}
                  >
                    {item.icon}
                    <p className="text-[14px]">{item.label}</p>
                  </Link>
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
