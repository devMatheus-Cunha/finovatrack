'use client'
import React from 'react'
import { Logo } from '@/components'
import { Flex, Box } from '@chakra-ui/react'

export default function LayoutAuth({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Flex
      height="100vh"
      justify="center"
      align="center"
      direction="column"
      w="100%"
      gap={6}
    >
      <Logo fontSize="2xl" />
      <Box width={{ base: '95%', lg: '55%', xl: '36%' }}>{children}</Box>
    </Flex>
  )
}
