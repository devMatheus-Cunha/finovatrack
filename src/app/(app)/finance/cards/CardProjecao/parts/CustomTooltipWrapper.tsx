import { FC } from 'react'

export const CustomTooltipWrapper: FC<{
  children: React.ReactNode
  text: string
}> = ({ children, text }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1.5 text-sm font-normal text-white bg-gray-800 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
    </div>
  </div>
)
