"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { PiTreeEvergreenThin } from "react-icons/pi";
import { BiUser } from "react-icons/bi";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const auth = useAuth();
  if (!auth) return null;
  const { authenticated } = auth;

  const handleLogout = async () => {
    try{
      const response = await axios.get('/api/auth/logout/')
      if(response){
        //its  a mannual token
      await axios.post('/api/auth/logout')  
      window.location.reload()
      }
    }
    catch(err){
      //its a google token
      signOut({ callbackUrl: "/login" })
    }
  };


  return (
    <section className="fixed z-50 w-full h-20 bg-black-20  text-white flex items-center justify-between">
        <h1 className="ml-5 text-2xl flex items-center justify-center gap-2 font-extrabold">
          <Link href="/"><PiTreeEvergreenThin color="white" size={35}/></Link>
        </h1>

      <ul className="flex gap-10 ml-5 justify-center items-center text-sm">
        <li>Services</li>
        <li>About us</li>
        <li>Contact</li>
        <li>How it works</li>
      </ul>

    <div className="flex justify-center items-center gap-2">
     <div><BiUser size={25} color="white"/></div>
      <div className="flex items-center justify-center p-2 gap-5 mr-5">

      {!authenticated && (
          <button className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-gray-400  font-medium">
          <div className="inline-flex h-12 translate-y-0 items-center justify-center px-4 text-white transition duration-500 group-hover:-translate-y-[150%]"><Link href="/login">Login</Link></div>
          <div className="absolute inline-flex h-9 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
          <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-blue-700 transition duration-500 group-hover:translate-y-0 group-hover:scale-150">
          </span><span className="z-10"><Link href="/login">Login</Link></span></div></button>
      )} 
        {authenticated && (
        <button onClick={handleLogout}className="cursor-pointer group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-neutral-200  font-medium">
          <div className="inline-flex h-12 translate-y-0 items-center justify-center px-4 text-white transition duration-500 group-hover:-translate-y-[150%]">Logout</div>
          <div className="absolute inline-flex h-9 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
            <span className="cursor-pointer absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-red-800 transition duration-500 group-hover:translate-y-0 group-hover:scale-150">
            </span><span className="z-10">Log out</span></div></button>
        )}
      </div>
    </div> 
    </section>
  );
};

export default Navbar;
