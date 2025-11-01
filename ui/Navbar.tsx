"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { BiUser, BiMenu, BiX } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IoLogoFirefox } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboard,setIsDashboard] = useState(false)
  const [authenticated,setAuthenticated] = useState(false)

  useEffect(() => {
    setAuthenticated(pathname.startsWith("/dashboard"))
    setIsDashboard(pathname.startsWith("/dashboard"));
  }, [pathname]);


  const handleLogout = async () => {
    try{
      const response = await axios.get('/api/auth/logout/')
      if(response){
        //its  a manual token
      await axios.post('/api/auth/logout')  
      window.location.reload()
      }
    }
    catch(err){
      //its a google token
      console.log(err)
      signOut({ callbackUrl: "/login" })
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section className={`${!isDashboard ? 'fixed z-50' : "border-b bg-sky-50 border-gray-200"} w-full h-20 bg-black-20 text-white flex items-center justify-between`}>
        {/* Logo */}
        <h1 className="ml-5 text-2xl flex items-center justify-center gap-2 ">
          {!isDashboard ? (
            <Link href="/" className="flex gap-2 text-white items-center">
              <IoLogoFirefox color="white" size={35}/><p>Medicure</p>
            </Link>
          ):(
            <div className="flex gap-2  text-black items-center">
              <IoLogoFirefox color="blue" size={35}/><p>Medicure</p>
            </div>
          )}
        </h1>

       {!isDashboard && (
        <ul className="hidden md:flex gap-10  justify-center items-center text-sm">
          <li>Services</li>
          <li>About us</li>
          <li>Contact</li>
          <li>How it works</li>
        </ul>
       )}

        {/* Desktop Auth Section */}
        <div className="hidden md:flex justify-center items-center gap-2">
          <FaUser size={23} color="black"/>
          <div className="flex items-center justify-center p-2 gap-5 mr-5">
            {!authenticated && (
              <button className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-gray-400 font-medium">
                <div className="inline-flex h-12 translate-y-0 items-center justify-center px-4 text-white transition duration-500 group-hover:-translate-y-[150%]">
                  <Link href="/login">Login</Link>
                </div>
                <div className="absolute inline-flex h-9 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                  <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-blue-700 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                  <span className="z-10"><Link href="/login">Login</Link></span>
                </div>
              </button>
            )} 
            {authenticated && (
              <button onClick={handleLogout} className="cursor-pointer group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-neutral-200 font-medium">
                <div className={`inline-flex ${isDashboard ? 'bg-red-600': ''} h-12 translate-y-0 items-center justify-center px-4 text-white transition duration-500 group-hover:-translate-y-[150%]`}>Logout</div>
                <div className="absolute inline-flex h-9 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                  <span className="cursor-pointer absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-red-800 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                  <span className="z-10">Log out</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center mr-5">
          <button 
            onClick={toggleMenu}
            className={`${isDashboard ? 'text-black': 'text-white'} focus:outline-none`}
          >
            {isMenuOpen ? <BiX size={30} /> : <BiMenu size={30}  />}
          </button>
        </div>
      </section>

      {/* Mobile Menu */}
      <div className={`fixed top-20 left-0 w-full bg-black z-40 transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center py-6 space-y-6 text-white">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 items-center text-sm">
            <li>Services</li>
            <li>About us</li>
            <li>Contact</li>
            <li>How it works</li>
          </ul>

          {/* Mobile Auth Section */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <BiUser size={20} color="white"/>
              <span>Account</span>
            </div>
            <div className="flex flex-col gap-4 items-center">
              {!authenticated && (
                <button className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-gray-400 font-medium">
                  <div className="inline-flex h-12 translate-y-0 items-center justify-center px-4 text-white transition duration-500 group-hover:-translate-y-[150%]">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </div>
                  <div className="absolute inline-flex h-9 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                    <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-blue-700 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                    <span className="z-10">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </span>
                  </div>
                </button>
              )} 
              {authenticated && (
                <button onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }} className="cursor-pointer group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-neutral-200 font-medium">
                  <div className="inline-flex h-12 translate-y-0 items-center justify-center px-4 text-white transition duration-500 group-hover:-translate-y-[150%]">Logout</div>
                  <div className="absolute inline-flex h-9 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                    <span className="cursor-pointer absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-red-800 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                    <span className="z-10">Log out</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;