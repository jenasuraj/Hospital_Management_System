
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dashboard page",
  description: "Welcome to Dashboard",
};

const page = () => {
  return (
     <section className='min-h-screen w-full text-white flex items-center justify-center text-center'>
      <h1 className=' text-5xl'>Hello Welcome to the dashboard ...</h1>
     </section>
  )
}

export default page