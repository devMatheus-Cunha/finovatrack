/* eslint-disable react/button-has-type */

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  Archive, ClipboardText, Eye, EyeSlash, SignOut,
} from '@phosphor-icons/react';
import React, { ReactNode } from 'react';
import { useLogout } from '../../hooks/auth';
import { useIsVisibilityDatas } from '../../hooks/globalStates';

interface SideBarProps {
  children: ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
  const { isVisibilityData, handleToggleVisibilityData } = useIsVisibilityDatas();
  const { logout } = useLogout();

  const id = '3gy9V810PwXjVpAABBi8bZN6JkO2';

  const { mutate: onLogout } = useMutation(logout, {
    onSuccess: () => {
      console.log('/login');
    },
  });

  const sidebarItems = [
    {
      id: 'eye',
      label: 'Visualizar',
      icon: isVisibilityData ? <Eye size={24} color="#eee2e2" /> : <EyeSlash size={24} color="#eee2e2" />,
      action: () => handleToggleVisibilityData(),
    },
    {
      id: 'control',
      label: 'Controle',
      icon: <ClipboardText size={24} />,
      action: () => console.log(`/control/${id}`),
    },
    {
      id: 'reports',
      label: 'Relatrios',
      icon: <Archive size={24} />,
      action: () => console.log(`/reports/${id}`),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <SignOut size={24} />,
      action: () => onLogout(),
    },
  ];

  return (
    <div className="h-[100vh] flex">
      <aside id="default-sidebar" className="w-auto h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full flex flex-col px-3 py-4 dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            {
       sidebarItems.map((item) => (
         <React.Fragment key={item.id}>
           <button
             data-tooltip-target="tooltip-default"
             className="focus:outline-none font-medium rounded-lg text-md dark:tansparent dark:focus:ring-gray-600 dark:border-gray-600 w-[100%] flex items-center justify-center"
             onClick={item.action}
           >
             <div className={`flex gap-0.5 flex-col justify-center items-center ${item.id === 'oi' ? 'text-cyan-500' : '#eee2e2'} dark:hover:opacity-75`}>
               {item.icon}
               <p className="text-xs">
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
