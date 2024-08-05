'use client'

import {
  HStack,
  IconButton,
  VStack,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { List, Eye, EyeSlash } from '@phosphor-icons/react'
import { useIsVisibilityDatas } from '@/hooks/globalStates'
import { useRouter } from 'next/navigation'

interface SidebarItem {
  id: string
  label: string
  route: string
  disabled: boolean
  icon: React.JSX.Element
  action?: () => void
}

const SideMenuMobile: React.FC<{
  sidebarItems: SidebarItem[]
  pathname: string
}> = ({ sidebarItems, pathname }) => {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const linkColor = useColorModeValue('blue.500', 'cyan.500')

  const handleNavigation = (route: string, action?: () => void) => {
    if (action) {
      action()
    } else {
      router.push(route !== 'logout' ? `/${route}` : '#')
    }
    onClose()
  }

  return (
    <>
      <HStack spacing={3}>
        <IconButton
          aria-label={isVisibilityData ? 'Hide Data' : 'Show Data'}
          icon={isVisibilityData ? <Eye size={21} /> : <EyeSlash size={21} />}
          onClick={handleToggleVisibilityData}
          color="white"
        />
        <IconButton
          aria-label="Open Menu"
          icon={<List size={22} />}
          onClick={onOpen}
          color="white"
        />
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" borderRight="1px" borderColor="gray.700">
          <DrawerCloseButton color="white" />
          <DrawerBody pt={7} pb={10} overflowY="auto" className="scrollbar-y">
            <VStack alignItems="flex-start" px={3} mb={3} spacing={1.5}>
              <Link
                href="/"
                fontSize="xl"
                fontWeight="semibold"
                color="white"
                _hover={{ textDecoration: 'none' }}
              >
                Menu
              </Link>
            </VStack>
            <VStack alignItems="flex-start" w="full" spacing={1.5}>
              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  onClick={() => handleNavigation(item.route, item.action)}
                  w="full"
                  display="flex"
                  alignItems="center"
                  px={2.5}
                  py={2}
                  borderRadius="md"
                  bg="gray.800"
                  color={pathname?.includes(item?.route) ? linkColor : 'white'}
                  _hover={{ opacity: '0.75', textDecoration: 'none' }}
                >
                  {item.icon}
                  <Text fontSize="14px" ml={3.5}>
                    {item.label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideMenuMobile
