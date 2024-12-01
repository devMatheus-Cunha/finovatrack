'use client'

import { Flex, HStack, Button, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Logo from '../Logo'

export default function Header() {
  const router = useRouter()
  const bgColor = useColorModeValue('gray.800', 'gray.900')

  return (
    <Flex
      as="nav"
      bg={bgColor}
      px={4}
      py={{ base: 2, md: 4 }}
      align="center"
      justify="space-between"
      w="100%"
    >
      <Logo />

      <HStack spacing={7}>
        <Button as="a" href="/" variant="link" colorScheme="teal">
          Login
        </Button>
        <Button onClick={() => router.push('/signup')} colorScheme="teal">
          Sign up
        </Button>
      </HStack>
    </Flex>
  )
}
