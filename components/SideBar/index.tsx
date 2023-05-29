import router, { useRouter } from "next/router";
import { useMutation } from '@tanstack/react-query';
import { logout } from "@/pages/lib/login";
import { Archive, ChartPie, ClipboardText, Eye, EyeSlash, SignOut } from "@phosphor-icons/react";
import useIsVisibilityDatas from "../../hooks/useIsVisibilityDatas"
import React from "react";

export default function SideBar({ children }: any) {
 const { isVisibilityData, handleToggleVisibilityData } = useIsVisibilityDatas()
 const routeName = useRouter().pathname.replace('/', '')

 const sidebarItems = [
  {
   id: "eye",
   label: "Visualizar",
   icon: isVisibilityData ? <Eye size={24} color="#eee2e2" /> : <EyeSlash size={24} color="#eee2e2" />,
   action: () => handleToggleVisibilityData(),
  },
  {
   id: "control",
   label: "Controle",
   icon: <ClipboardText size={24} color={routeName === "control" ? "#06b6d4" : "#eee2e2"} />,
   action: () => router.push("/control"),
  },
  {
   id: "reports",
   label: "Relatrios",
   icon: <Archive size={24} color={routeName === "reports" ? "#06b6d4" : "#eee2e2"} />,
   action: () => router.push("/reports"),
  },
  {
   id: "statistics",
   label: "Relatrios",
   icon: <ChartPie size={24} color={routeName === "statistics" ? "#06b6d4" : "#eee2e2"} />,
   action: () => router.push("/statistics"),
  },
 ];

 const { mutate: onLogout } = useMutation(logout, {
  onSuccess: () => {
   router.push('/');
  },
 });
 return (
  <div className="h-[100vh] flex">
   <aside id="default-sidebar" className="w-auto h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full flex flex-col justify-between	px-3 py-4 dark:bg-gray-800">
     <div className="flex flex-col gap-6">
      {
       sidebarItems.map((item) => (
        <React.Fragment key={item.id}>
         <button
          data-tooltip-target="tooltip-default"
          className="focus:outline-none font-medium rounded-lg text-md dark:tansparent dark:focus:ring-gray-600 dark:border-gray-600 w-[100%] flex items-center justify-center"
          onClick={item.action}
         >
          {item.icon}
         </button>
        </React.Fragment>
       ))
      }
     </div>
     <button
      onClick={() => onLogout()}
      type="button"
      className="focus:outline-none font-medium rounded-lg text-md dark:tansparent dark:focus:ring-gray-600 dark:border-gray-600 w-[100%] flex items-center justify-center"
     >
      <SignOut size={24} color="#eee2e2" />
     </button>
    </div>
   </aside >
   <div className='flex-auto'>
    {children}
   </div>
  </div >
 )
}
