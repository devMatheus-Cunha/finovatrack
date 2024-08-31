import { Box, Flex, Button, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const SideMenu = ({
  sidebarItems,
  pathname
}: {
  pathname: string
  sidebarItems: {
    id: string
    label: string
    route: string
    disabled: boolean
    icon: React.JSX.Element
    action: () => void
  }[]
}) => {
  return (
    <Box transition="opacity 0.3s">
      <Flex height="full" flexDirection="column" px={2.5} py={3} bg="gray.700">
        <Flex flexDirection="column" gap={6}>
          {sidebarItems.map((item) => {
            const isActive = pathname?.includes(item?.route)
            const itemTextColor = isActive ? 'cyan' : 'white'

            const LinkComponent: any =
              item.id === 'eye' || item.id === 'logout' ? Button : NextLink
            const linkProps =
              item.id === 'eye' || item.id === 'logout'
                ? { onClick: item.action }
                : { href: `/${item.route}` }

            return (
              <LinkComponent
                key={item.id}
                disabled={item.disabled}
                _hover={{ opacity: 0.75 }}
                className="chakra-button"
                variant="ghost"
                p={0}
                borderRadius="md"
                {...linkProps}
              >
                <Flex
                  gap={0.5}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  color={itemTextColor}
                  cursor="pointer"
                >
                  {item.icon}
                  <Text fontSize="xs">{item.label}</Text>
                </Flex>
              </LinkComponent>
            )
          })}
        </Flex>
      </Flex>
    </Box>
  )
}

export default SideMenu
