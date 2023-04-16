import router from "next/router";
import { useMutation } from "react-query";
import Button from "../Button";
import { logout } from "@/pages/lib/login";

const sidebarItems = [
 {
  href: "/control",
  children: "Controle",
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
    <div className="h-full flex flex-col justify-between	 px-3 py-4 overflow-y-auto dark:bg-gray-800">
     <ul className="space-y-2 font-medium">
      {
       sidebarItems.map((item) => (<>
        <li key={item.href}>
         <a href={item.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
          <span className="ml-3">{item.children}</span>
         </a>
        </li>
       </>))
      }
     </ul>
     <div>

      <button
       onClick={() => onLogout()}
       type="button"
       className="focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:border-gray-600 w-[100%]"
      >
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
