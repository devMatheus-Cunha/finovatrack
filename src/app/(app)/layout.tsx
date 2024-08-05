'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Archive,
  ChartLineUp,
  ClipboardText,
  Eye,
  EyeSlash,
  SignOut,
  User
} from '@phosphor-icons/react'
import React, { ReactNode } from 'react'
import { HeaderMobile, Logo, SideMenu, SideMenuMobile } from '@/components'
import { useIsVisibilityDatas, useUserId } from '@/hooks/globalStates'
import { useLogout } from '@/hooks/auth'
import { Box, Show } from '@chakra-ui/react'

interface SideBarProps {
  children: ReactNode
}

export default function AppLayout({ children }: SideBarProps) {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()
  const router = useRouter()
  const pathname = usePathname()
  const { userId } = useUserId()
  const { onLogout } = useLogout()

  const sidebarItems = [
    {
      id: 'eye',
      label: 'Visualizar',
      route: 'eye',
      disabled: false,
      icon: isVisibilityData ? (
        <Eye size={21} color="#eee2e2" />
      ) : (
        <EyeSlash size={21} color="#eee2e2" />
      ),
      action: () => handleToggleVisibilityData()
    },
    {
      id: 'control',
      label: 'Controle',
      route: 'control',
      disabled: false,
      icon: <ClipboardText size={21} />,
      action: () => router.push(`/control`)
    },
    {
      id: 'reports',
      label: 'Relatórios',
      route: 'reports',
      disabled: false,
      icon: <Archive size={21} />,
      action: () => router.push(`/reports`)
    },
    {
      id: 'finance',
      label: 'Finanças',
      route: 'finance',
      disabled:
        userId !== 'NgoGdyGlfATkew04ELS3m5MbWht2' &&
        userId !== 'phVFFH1yHmXHXSCQuAACgyQxVe33',
      icon: <ChartLineUp size={21} />,
      action: () => router.push(`/finance`)
    },
    {
      id: 'myProfile',
      label: 'Perfil',
      route: 'myProfile',
      disabled: false,
      icon: <User size={21} />,
      action: () => router.push(`/myProfile`)
    },
    {
      id: 'logout',
      label: 'Logout',
      route: 'logout',
      disabled: false,
      icon: <SignOut size={21} />,
      action: () => onLogout()
    }
  ]

  return (
    <Box h="100vh" display="flex" flexDirection={{ base: 'column', lg: 'row' }}>
      <Show above="lg">
        <SideMenu pathname={pathname} sidebarItems={sidebarItems} />
      </Show>

      <Show below="lg">
        <HeaderMobile>
          <Logo className="text-xl md:text-lg" />
          <SideMenuMobile pathname={pathname} sidebarItems={sidebarItems} />
        </HeaderMobile>
      </Show>

      <Box flex="1" w="full" p={{ base: 0, md: 4 }}>
        {children}
      </Box>
    </Box>
  )
}
