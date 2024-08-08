import { Center, VStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface SideBarProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Meu Perfil'
}

export default function MyProfileLayout({ children }: SideBarProps) {
  return (
    <Center h={{ base: 'auto', md: '90vh' }} w="100%" p={2}>
      <VStack spacing={4} align="center">
        {' '}
        {/* Add vertical spacing for better layout */}
        {children}
      </VStack>
    </Center>
  )
}
