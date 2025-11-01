"use client";

import React from 'react';
import Sidebar from '@/ui/Sidebar';
import { usePathname } from 'next/navigation';



const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const role: string = pathname.startsWith('/dashboard/admin') ? 'admin' : pathname.startsWith('/dashboard/patient') ? 'patient' : ''
  return (
    <section className="w-full min-h-screen bg-white flex">
      <Sidebar role = {role}/>
      {children}
    </section>
  );
};

export default Layout;

