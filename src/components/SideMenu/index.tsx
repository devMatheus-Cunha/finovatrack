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
import React from 'react'
import { HeaderMobile, Logo } from '@/components'
import { useIsVisibilityDatas, useUserId } from '@/hooks/globalStates'
import { useLogout } from '@/hooks/auth'
import { Show } from '@chakra-ui/react'

import SideMenuMobile from './SideMenuMobile'
import SideMenuDesktop from './SideMenuDesktop'

export const SideMenu = () => {
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
        userId !== process.env.NEXT_USER_ID_1 &&
        userId !== process.env.NEXT_USER_ID_2,
      icon: <ChartLineUp size={21} />,
      action: () => router.push(`/finance`)
    },
    // {
    //   id: 'statistics',
    //   label: 'Estatísticas',
    //   route: 'statistics',
    //   disabled:
    //     userId !== process.env.NEXT_USER_ID_1 &&
    //     userId !== process.env.NEXT_USER_ID_2,
    //   icon: <ChartPie size={21} />,
    //   action: () => router.push(`/statistics`)
    // },
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
    <>
      <Show above="lg">
        <SideMenuDesktop pathname={pathname} sidebarItems={sidebarItems} />
      </Show>

      <Show below="lg">
        <HeaderMobile>
          <Logo fontSize="lg" />
          <SideMenuMobile pathname={pathname} sidebarItems={sidebarItems} />
        </HeaderMobile>
      </Show>
    </>
  )
}
