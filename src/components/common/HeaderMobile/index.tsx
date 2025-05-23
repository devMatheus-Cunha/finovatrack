import React, { ReactNode } from 'react'

const HeaderMobile = ({ children }: { children: ReactNode }) => {
  return (
    <header className="relative z-50 w-full py-4">
      <div className="flex max-w-[85rem] w-full mx-auto px-4 items-center justify-between">
        {children}
      </div>
    </header>
  )
}

export default HeaderMobile
