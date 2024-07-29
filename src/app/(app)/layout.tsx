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
import ReactLoading from 'react-loading'
import { HeaderMobile, Logo, SideMenu, SideMenuMobile } from '@/components'
import { useIsVisibilityDatas, useUserId } from '@/hooks/globalStates'
import { useLogout } from '@/hooks/auth'
import { Show } from '@chakra-ui/react'

interface SideBarProps {
  children: ReactNode
}

export default function AppLayout({ children }: SideBarProps) {
  const { isVisibilityData, handleToggleVisibilityData } =
    useIsVisibilityDatas()
  const router = useRouter()
  const pathname = usePathname()

  const { onLogout } = useLogout()
  const { userId } = useUserId()

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
    <div className="h-[100vh] flex flex-col lg:flex-row">
      <Show above="lg">
        <SideMenu pathname={pathname} sidebarItems={sidebarItems} />
      </Show>

      <Show below="lg">
        <HeaderMobile>
          <Logo className="text-xl md:text-lg" />
          <SideMenuMobile pathname={pathname} sidebarItems={sidebarItems} />
        </HeaderMobile>
      </Show>

      <div className="flex-auto w-full p-0 md:p-4">
        {!userId ? (
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
