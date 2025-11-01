"use client";
import { useState } from "react";
import { dashboard_items } from "@/data/Doctor";
import {LuPanelRightClose } from "react-icons/lu";

const Sidebar = ({ role }: { role: string}) => {
  const [sidebarOpen,setSidebarOpen] = useState(true)

return (
<aside className={`flex flex-col ${!sidebarOpen ? 'w-20 bg-blue-900':'w-60 bg-sky-50'}  gap-2 h-screen border-r border-gray-100`}>
{sidebarOpen ? dashboard_items.map((item, index) => {
      if (item.genre && item.genre !== role) return null;
      return (
        <div
          key={index}
          onClick={item.id === 13 ? () => setSidebarOpen(!sidebarOpen) : undefined}
          className={`${
            item.id === 13 ? 'bg-blue-900 text-white' : 'text-gray-700'
          } cursor-pointer w-full h-auto p-4 flex items-center text-sm justify-start gap-2 hover:bg-blue-900 hover:text-white duration-700`}
        >
          <p>{item.icon}</p>
          <p>{item.name}</p>
          <p>{item.back || ' '}</p>
        </div>
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