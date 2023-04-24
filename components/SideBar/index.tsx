import router from "next/router";
import { useMutation } from '@tanstack/react-query';
import { logout } from "@/pages/lib/login";
import { Archive, ChartPie, SignOut } from "@phosphor-icons/react";

const sidebarItems = [
 {
  href: "/control",
  children: "Controle",
  icon: <ChartPie size={24} color="#eee2e2" />
 },
 {
  href: "/report",
  children: "Relatrios",
  icon: <Archive size={24} color="#eee2e2" />
 },
];

export default function SideBar({ children }: any) {

 const { mutate: onLogout, isLoading } = useMutation(logout, {
  onSuccess: () => {
   router.push('/');
  },
 });
 return (
  <div className="h-[100vh] flex">
   <aside id="default-sidebar" className="w-[15%] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full flex flex-col justify-between	px-3 py-4 overflow-y-auto dark:bg-gray-800">
     <ul className="space-y-2 font-medium">
      {
       sidebarItems.map((item) => (<>
        <li key={item.href}>
         <a href={item.href} className="flex items-center gap-2  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          {item.icon}
          {item.children}
         </a>
        </li>
       </>))
      }
     </ul>
     <div>

      <button
       onClick={() => onLogout()}
       type="button"
       className="focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:border-gray-600 w-[100%] flex gap-2 items-center justify-center"
      >
       <SignOut size={24} color="#eee2e2" />
       {!isLoading ? "Sair" : "Saindo..."}
      </button>
     </div>
    </div>
   </aside >
   <div className='flex-auto'>
    {children}
   </div>
  </div >
 )
}
