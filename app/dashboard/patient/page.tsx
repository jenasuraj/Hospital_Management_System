import React from 'react'
import { Metadata } from 'next'
import img from '@/public/dashboard-img.jpg'
import Image from 'next/image';
import { MdOutlineMessage } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Patient Dashboard page",
  description: "Welcome to Dashboard",
};

const page = () => {

const items = [
  {id:1,
   name:'Book Appointment',
   icon:<MdOutlineMessage size={25} color='white'/>,
   path:'/dashboard/patient/appointment',
  },
  {id:2,
    name:'Track Healthcare',
   icon:<GiHealthNormal size={25} color='white'/>,
   path:'/dashboard/patient/track_health',
  },
    {id:3,
   name:'History',
   icon:<GoHistory size={25} color='white'/>,
   path:'/dashboard/patient/history', 
  }
]  

return (
<>
<section className='min-h-screen w-full text-gray-700 flex p-2 flex-col gap-5'>

{/**img section */}
<div className='relative w-full h-[40vh] rounded-lg  border border-gray-200 shadow-sm flex items-center justify-center'>
<Image
src={img}
alt='img'
fill
priority
className="object-cover absolute inset-0 rounded-lg"
/>
<div className='w-full h-full bg-black/60 absolute z-10 rounded-lg'></div>
<div className='text-center flex flex-col items-center justify-center gap-4 absolute z-20'>
<p className='text-white text-3xl md:text-5xl '>Welcome to Medicure</p>
<p className='text-white text-xl md:text-3xl'>What are your plans today ?</p>
</div>
</div>


{/**feature section */}
<div className='w-full h-auto flex flex-col md:flex-row gap-5'>
{items.map((item,index)=>{
  return(
    <Link href={item.path} key={index} className='bg-sky-50 w-full md:w-1/3 h-40 border border-gray-300 shadow-sm rounded-sm flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-blue-900 hover:text-white duration-700'>
      <p>{item.name}</p>
      <p className='p-2 bg-blue-900 rounded-md text-white'>{item.icon}</p>
    </Link>
  )
})}
</div>

</section>
</>
  )
}

export default page