'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
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
import ReactLoading from 'react-loading'
import { HeaderMobile, Logo, SideMenu, SideMenuMobile } from '@/components'
import { useIsVisibilityDatas, useUserData } from '@/hooks/globalStates'
import { useLogout } from '@/hooks/auth'

interface SideBarProps {
  children: ReactNode
}

export default function AppLayout({ children }: SideBarProps) {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()
  const router = useRouter()
  const { id: idRoute } = useParams()
  const pathname = usePathname()

  const { onLogout } = useLogout()
  const {
    userData: { id }
  } = useUserData()

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
      action: () => router.push(`/${id}/control`)
    },
    {
      id: 'reports',
      label: 'Relatórios',
      route: 'reports',
      disabled: false,
      icon: <Archive size={21} />,
      action: () => router.push(`/${id}/reports`)
    },
    {
      id: 'finance',
      label: 'Finanças',
      route: 'finance',
      disabled:
        idRoute !== 'NgoGdyGlfATkew04ELS3m5MbWht2' &&
        idRoute !== 'lgR9vIxkzLU4cs62fqiBDGVUVen2',
      icon: <ChartLineUp size={21} />,
      action: () => router.push(`/${id}/finance`)
    },
    {
      id: 'myProfile',
      label: 'Perfil',
      route: 'myProfile',
      disabled: false,
      icon: <User size={21} />,
      action: () => router.push(`/${id}/myProfile`)
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
    <div className="h-[100vh] flex flex-col lg:flex-row">
      <SideMenu pathname={pathname} sidebarItems={sidebarItems} />

      <HeaderMobile>
        <Logo className="text-xl md:text-lg" />
        <SideMenuMobile pathname={pathname} sidebarItems={sidebarItems} />
      </HeaderMobile>

      <div className="flex-auto w-full p-0 md:p-4">
        {!id ? (
          <div className="flex h-screen w-full items-center justify-center">
            <ReactLoading
              type="spinningBubbles"
              color="#13C1ED"
              height={100}
              width={100}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
