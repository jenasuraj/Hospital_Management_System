// components/Sidebar.jsx
"use client";
import { useState } from "react";
import { SlHome } from "react-icons/sl";
import { GoChevronRight } from "react-icons/go";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPanelLeftClose,LuPanelRightClose } from "react-icons/lu";

const Sidebar = () => {
  const [sidebarOpen,setSidebarOpen] = useState(true)
  const dashboard_items = [
  {
    id: 1,
    name: "Dashboard",
    icon:<SlHome size={20}/>,
    back:<GoChevronRight size={20}/>,
  },
  {
    id: 2,
    name: "Doctors",
    icon:<MdOutlineLocalHospital size={20}/>,
    back:<GoChevronRight size={20}/>,
  },
  {
    id: 3,
    name: "patients",
    icon:<FaPerson  size={20}/>,
    back:<GoChevronRight size={20}/>,
  },
  {
    id: 4,
    name: "Appointment",
    icon:<FaMobileAlt  size={20}/>,
    back:<GoChevronRight size={20}/>,
  },
  {
    id: 5,
    name: "Account",
    icon:<IoSettingsOutline size={20}/>,
    back:<GoChevronRight size={20}/>,
  },
    {
    id: 6,
    name: "Close",
    icon:<LuPanelLeftClose size={20}/>,
  },
];

  return (
    <aside className={`flex flex-col ${!sidebarOpen ? 'w-20 bg-black':'w-60 bg-gray-100'}  gap-2 h-screen border-r border-gray-300`}>
     {sidebarOpen ? 
      dashboard_items.map((item,index)=>{
      return(
        <div key={index} onClick={item.id == 6 ? ()=>setSidebarOpen(!sidebarOpen) : undefined}
        className={`${item.id == 6 ? 'bg-gray-600 text-white': 'text-gray-600'}
        cursor-pointer w-full h-auto font-bold p-4 flex items-center justify-start gap-2 hover:bg-gray-700 hover:text-white duration-700`}>
          <p>{item.icon}</p>
          <p>{item.name}</p>
          <p>{item.back || " "}</p>
        </div>
      )
     })
     :(
      <div className="w-full flex justify-center items-center">
      <LuPanelRightClose size={25} color="white" className="cursor-pointer mt-5" onClick={()=>setSidebarOpen(!sidebarOpen)}/>
      </div>
     )}
    </aside>
  );
};

export default Sidebar;