import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

export default function Logo({ fontSize = 'lg' }: { fontSize?: string }) {
  return (
    <Heading as="h1" size={fontSize} fontWeight="bold" color="white">
      Finova
      <Box as="span" color="cyan.600">
        Tranck
      </Box>
    </Heading>
  )
}
