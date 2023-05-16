/* eslint-disable react/button-has-type */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Archive, ClipboardText, Eye, EyeSlash, SignOut, User,
} from '@phosphor-icons/react';
import React, { ReactNode } from 'react';
import { useIsVisibilityDatas, useUserData } from '../../hooks/globalStates';
import { useLogout } from '../../hooks/auth';

interface SideBarProps {
  children: ReactNode;
}

export default function AppLayout({ children }: SideBarProps) {
  const { isVisibilityData, handleToggleVisibilityData } = useIsVisibilityDatas();
  const router = useRouter();
  const pathname = usePathname();

  const { onLogout } = useLogout();
  const { userData: { id } } = useUserData();

  const sidebarItems = [
    {
      id: 'eye',
      label: 'Visualizar',
      route: '/eye',
      icon: isVisibilityData ? <Eye size={21} color="#eee2e2" /> : <EyeSlash size={24} color="#eee2e2" />,
      action: () => handleToggleVisibilityData(),
    },
    {
      id: 'control',
      label: 'Controle',
      route: '/control',
      icon: <ClipboardText size={21} />,
      action: () => router.push(`/control/${id}`),
    },
    {
      id: 'reports',
      label: 'Relatórios',
      route: '/reports',
      icon: <Archive size={21} />,
      action: () => router.push(`/reports/${id}`),
    },
    {
      id: 'myProfile',
      label: 'Perfil',
      route: '/myProfile',
      disabled: true,
      icon: <User size={21} />,
      action: () => router.push(`/myProfile/${id}`),
    },
    {
      id: 'logout',
      label: 'Logout',
      route: '/logout',
      icon: <SignOut size={21} />,
      action: () => onLogout(),
    },
  ];

  return (
    <div className="h-[100vh] flex">
      <aside id="default-sidebar" className="w-auto h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full flex flex-col px-2.5 py-3.5 dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            {
       sidebarItems.map((item) => (
         <React.Fragment key={item.id}>
           <button
             data-tooltip-target="tooltip-default"
             className={`focus:outline-none font-medium rounded-lg text-md dark:transparent dark:focus:ring-gray-600 dark:border-gray-600 w-[100%] flex items-center justify-center ${item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
             onClick={item.action}
             disabled={item.disabled}
           >
             <div className={`flex gap-0.5 flex-col justify-center items-center ${pathname.startsWith(item?.route) ? 'text-cyan-500' : '#eee2e2'} dark:hover:opacity-75`}>
               {item.icon}
               <p className="text-[11px]">
                 {item.label}
               </p>
             </div>
           </button>
         </React.Fragment>

       ))
      }
          </div>
        </div>
      </aside>
      <div className="flex-auto">
        {children}
      </div>
    </div>
  );
}
