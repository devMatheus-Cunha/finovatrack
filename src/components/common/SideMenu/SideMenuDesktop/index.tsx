import { Box, Flex, Button, Text, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

type SidebarItem = {
  id: string
  label: string
  route: string
  disabled: boolean
  icon: React.JSX.Element
  action: () => void
}

type SideMenuDesktopProps = {
  sidebarItems: SidebarItem[]
  pathname: string
}

const SideMenuDesktop: React.FC<SideMenuDesktopProps> = ({
  sidebarItems,
  pathname
}) => {
  return (
    <Box transition="opacity 0.3s" height="full">
      <Flex height="full" flexDirection="column" px={2.5} py={3} bg="gray.700">
        <Flex flexDirection="column" gap={6}>
          {sidebarItems.map((item) => {
            const isActive = pathname?.includes(item.route)
            const itemTextColor = isActive ? 'cyan' : 'white'

            if (item.id === 'eye' || item.id === 'logout') {
              return (
                <Button
                  key={item.id}
                  onClick={item.action}
                  disabled={item.disabled}
                  variant="ghost"
                  _hover={{ opacity: 0.75 }}
                  _active={{ opacity: 0.75 }}
                  p={0}
                  color={itemTextColor}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  {item.icon}
                  <Text fontSize="xs">{item.label}</Text>
                </Button>
              )
            }

            return (
              <Link
                as={item.disabled ? 'span' : NextLink}
                key={item.id}
                href={item.disabled ? undefined : `/${item.route}`}
                onClick={(e) => item.disabled && e.preventDefault()} // Impede o clique
                _hover={item.disabled ? { opacity: 0.5 } : { opacity: 0.75 }}
                color={item.disabled ? 'gray.500' : itemTextColor}
                cursor={item.disabled ? 'not-allowed' : 'pointer'}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={0}
                opacity={item.disabled ? 0.5 : 1}
              >
                {item.icon}
                <Text fontSize="xs">{item.label}</Text>
              </Link>
            )
          })}
        </Flex>
      </Flex>
    </Box>
  )
}

export default SideMenuDesktop
