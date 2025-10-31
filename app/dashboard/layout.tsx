import React from 'react'
import Sidebar from '@/ui/Sidebar'

const layout = ({children}:Readonly<{children: React.ReactNode;}>) => {
return (
<>
   <section className='w-full min-h-screen bg-white flex'>
     <Sidebar/>    
     {children}
   </section>
</>
  )
}

export default layout