"use client";
import { useState } from "react";
import { dashboard_items } from "@/data/Doctor";
import {LuPanelRightClose } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = ({ role }: { role: string}) => {
  const pathname = usePathname()
  const [sidebarOpen,setSidebarOpen] = useState(true)
return (
<aside className={`flex flex-col ${!sidebarOpen ? 'w-20 bg-blue-900':'w-40 md:w-[50vh] bg-sky-50'}   gap-2 h-screen border-r border-gray-300`}>
{sidebarOpen ? dashboard_items.map((item, index) => {
      if (item.genre && item.genre !== role) return null;
      return (
        <Link href={pathname.startsWith('/dashboard/patient') && item.path ? `/dashboard/patient${item.path}`:''} key={index}
          onClick={item.id === 13 ? () => setSidebarOpen(!sidebarOpen) : undefined}
          className={`${item.id === 13 ? 'bg-blue-900 text-white' : pathname.startsWith(`/dashboard/patient${item.path}`) && item.id !=8 ? 'bg-blue-900 text-white'
          : pathname.startsWith(`/dashboard/admin${item.path}`) ? 'bg-blue-900 text-white' : 'text-gray-700'} 
          cursor-pointer w-full h-auto p-4 flex items-center text-sm justify-start gap-2 hover:bg-blue-900 hover:text-white duration-600`}>
          <p>{item.icon}</p>
          <p>{item.name}</p>
          <p>{item.back || ' '}</p>
        </Link>
      );
    })
  : (
    <div className="w-full flex justify-center items-center">
      <LuPanelRightClose
        size={25}
        color="white"
        className="cursor-pointer mt-5"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  )
}  
</aside>
);
};

export default Sidebar;