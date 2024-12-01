import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { SideMenu } from '@/components/common/SideMenu'

interface SideBarProps {
  children: ReactNode
}

export default function AppLayout({ children }: SideBarProps) {
  return (
    <Box h="100vh" display="flex" flexDirection={{ base: 'column', lg: 'row' }}>
      <SideMenu />
      <Box flex="1" overflow="auto" w="full" p={{ base: 0, md: 4 }}>
        {children}
      </Box>
    </Box>
  )
}
