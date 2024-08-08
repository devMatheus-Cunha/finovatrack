import React, { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

const HeaderMobile = ({ children }: { children: ReactNode }) => {
  return (
    <Box as="header" position="relative" zIndex={50} w="full" py={4}>
      <Flex
        maxW="85rem"
        w="full"
        mx="auto"
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default HeaderMobile
