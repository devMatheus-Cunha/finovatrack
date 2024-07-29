import React, { ReactNode } from 'react'

const HeaderMobile = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="flex justify-start z-50 w-full text-sm py-4 bg-gray-800">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between"
          aria-label="Global"
        >
          {children}
        </nav>
      </header>
    </div>
  )
}

export default HeaderMobile
