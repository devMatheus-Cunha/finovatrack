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
import { HeaderMobile, Logo, ShowAndHide } from '@/components'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useLogout } from '@/hooks/entrys/useDeletedEntry/auth'

import SideMenuMobile from './SideMenuMobile'
import SideMenuDesktop from './SideMenuDesktop'

export const SideMenu = () => {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()
  const { userData } = useUserData()
  const router = useRouter()
  const pathname = usePathname()
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
      disabled: !userData.admin,
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
    <>
      <ShowAndHide displayLg="initial" displayBase="none">
        <SideMenuDesktop pathname={pathname} sidebarItems={sidebarItems} />
      </ShowAndHide>

      <ShowAndHide displayLg="none" displayBase="initial">
        <HeaderMobile>
          <Logo fontSize="lg" />
          <SideMenuMobile pathname={pathname} sidebarItems={sidebarItems} />
        </HeaderMobile>
      </ShowAndHide>
    </>
  )
}
