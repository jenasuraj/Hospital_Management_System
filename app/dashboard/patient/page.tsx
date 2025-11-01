import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Patient Dashboard page",
  description: "Welcome to Dashboard",
};

const page = () => {
    console.log("hello i am in patient page")
  return (
<>
<section className='min-h-screen w-full text-black flex items-center justify-center'>
 hello patient
</section>
</>
  )
}

export default page