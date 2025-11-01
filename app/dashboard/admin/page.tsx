import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Admin Dashboard page",
  description: "Welcome to Dashboard",
};

const page = () => {
  return (
<>
<section className='min-h-screen w-full text-black flex items-center justify-center'>
 hello admin
</section>
</>
  )
}

export default page