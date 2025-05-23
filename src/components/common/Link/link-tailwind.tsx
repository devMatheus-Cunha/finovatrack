import React from 'react'
import NextLink from 'next/link'

interface ILinksProps {
  href: string
  children: React.ReactNode
  textDecor?: string
  [key: string]: any
}

const Link = ({ href, children, textDecor, ...props }: ILinksProps) => {
  const decorationClass = textDecor === 'underline' ? 'underline' : ''

  return (
    <NextLink
      href={href}
      className={`text-white hover:text-blue-300 ${decorationClass}`}
      {...props}
    >
      {children}
    </NextLink>
  )
}

export default Link
