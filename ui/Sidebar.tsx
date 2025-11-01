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
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
import { TbHealthRecognition } from "react-icons/tb";


const Sidebar = ({ role }: { role: string}) => {
  const [sidebarOpen,setSidebarOpen] = useState(true)
  const dashboard_items = [
  {
    id: 1,
    name: "Dashboard",
    icon:<SlHome size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 2,
    name: "Employees",
    icon:<MdOutlineLocalHospital size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 3,
    name: "patients",
    icon:<FaPerson  size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 4,
    name: "Appointment",
    icon:<FaMobileAlt  size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 5,
    name: "Account",
    icon:<IoSettingsOutline size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 6,
    name: "Charges",
    icon:<RiMoneyRupeeCircleLine size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 7,
    name: "Medicine",
    icon:<AiOutlineMedicineBox size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'admin'
  },
  {
    id: 8,
    name: "Dashboard",
    icon:<SlHome size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'patient'
  },
    {
    id: 9,
    name: "Appointment",
    icon:<FaMobileAlt  size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'patient'
  },
  {
    id: 10,
    name: "History",
    icon:<GoHistory size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'patient'
  },
  {
    id: 11,
    name: "Health Track",
    icon:<TbHealthRecognition size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'patient'
  },
  {
    id: 12,
    name: "Account",
    icon:<IoSettingsOutline size={20}/>,
    back:<GoChevronRight size={20}/>,
    genre:'patient'
  },
  {
    id: 13,
    name: "Close",
    icon:<LuPanelLeftClose size={20}/>,
  },
];


  return (
    <aside className={`flex flex-col ${!sidebarOpen ? 'w-20 bg-black':'w-60 bg-sky-50'}  gap-2 h-screen border-r border-gray-100`}>
{sidebarOpen
  ? dashboard_items.map((item, index) => {
      // Only render the item if genre matches role or if genre is undefined (like Close button)
      if (item.genre && item.genre !== role) return null;

      return (
        <div
          key={index}
          onClick={item.id === 13 ? () => setSidebarOpen(!sidebarOpen) : undefined}
          className={`${
            item.id === 13 ? 'bg-blue-600 text-white' : 'text-gray-700'
          } cursor-pointer w-full h-auto p-4 flex items-center text-sm justify-start gap-2 hover:bg-blue-600 hover:text-white duration-700`}
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