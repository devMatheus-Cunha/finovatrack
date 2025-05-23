import NextLink from 'next/link'
import React from 'react'

// Ajuste do tipo do ícone para aceitar componente React
// e action opcional para itens de navegação

type SidebarItem = {
  id: string
  label: string
  route: string
  disabled: boolean
  icon: React.ElementType | React.ReactNode // Aceita componente ou elemento
  action?: () => void
}

type SideMenuDesktopProps = {
  sidebarItems: SidebarItem[]
  pathname: string
}

const SideMenuDesktop: React.FC<SideMenuDesktopProps> = ({
  sidebarItems,
  pathname
}) => {
  return (
    <div className="transition-opacity duration-300 h-full">
      <div className="h-full flex flex-col px-2.5 py-3 bg-gray-700">
        <div className="flex flex-col gap-6">
          {sidebarItems.map((item) => {
            const isActive = pathname?.includes(item.route)
            const itemTextColor = item.disabled
              ? 'text-gray-500'
              : isActive
                ? 'text-cyan-400'
                : 'text-white'

            if (item.id === 'eye' || item.id === 'logout') {
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  disabled={item.disabled}
                  className={`bg-transparent border-none flex flex-col items-center justify-center p-0 ${itemTextColor} hover:opacity-75 active:opacity-75 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  type="button"
                >
                  {typeof item.icon === 'function'
                    ? React.createElement(item.icon, {
                        className: 'w-6 h-6 mb-1'
                      })
                    : item.icon}
                  <span className="text-xs">{item.label}</span>
                </button>
              )
            }

            return item.disabled ? (
              <span
                key={item.id}
                className={`flex flex-col items-center justify-center p-0 opacity-50 cursor-not-allowed ${itemTextColor}`}
              >
                {typeof item.icon === 'function'
                  ? React.createElement(item.icon, {
                      className: 'w-6 h-6 mb-1'
                    })
                  : item.icon}
                <span className="text-xs">{item.label}</span>
              </span>
            ) : (
              <NextLink
                key={item.id}
                href={`/${item.route}`}
                passHref
                legacyBehavior
              >
                <a
                  className={`flex flex-col items-center justify-center p-0 hover:opacity-75 ${itemTextColor}`}
                >
                  {typeof item.icon === 'function'
                    ? React.createElement(item.icon, {
                        className: 'w-6 h-6 mb-1'
                      })
                    : item.icon}
                  <span className="text-xs">{item.label}</span>
                </a>
              </NextLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SideMenuDesktop
