import React from 'react'

import NextLink from 'next/link'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

interface ILinksProps extends LinkProps {
  href: string
}

const Link = ({ href, children, ...props }: ILinksProps) => {
  return (
    <ChakraLink as={NextLink} {...props} href={href} color="white">
      {children}
    </ChakraLink>
  )
}

export default Link
