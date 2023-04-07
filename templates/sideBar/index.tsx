import { Label, Sidebar } from 'flowbite-react'
import { SidebarItemProps } from 'flowbite-react/lib/esm/components/Sidebar';

const sidebarItems: SidebarItemProps[] = [
 {
  href: "/",
  children: "Controle",
 },
 {
  href: "/dashboard",
  children: "Dashboard",
 }
];

export default function SideBar({ children }: any) {
 return (
  <div className="h-[100vh] flex">
   <Sidebar aria-label="Default sidebar example">
    <Sidebar.Items>
     <Sidebar.ItemGroup>
      {
       sidebarItems.map((item) => <Sidebar.Item key={item.href} {...item} />)
      }
     </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
   <div className='flex-auto'>
    {children}
   </div>
  </div>
 )
}
