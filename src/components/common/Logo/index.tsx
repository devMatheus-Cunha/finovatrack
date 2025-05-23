import React from 'react'

export default function Logo({
  fontSize = 'lg'
}: {
  fontSize?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}) {
  // Map ChakraUI font sizes to Tailwind classes
  const fontSizeMap = {
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  }

  const fontSizeClass = fontSizeMap[fontSize] || 'text-lg'

  return (
    <h1 className={`font-bold text-white ${fontSizeClass}`}>
      Finova
      <span className="text-cyan-600">Tranck</span>
    </h1>
  )
}
