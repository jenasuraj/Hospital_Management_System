"use client"
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import GoogleLogin from "./GoogleLogin";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";


const LoginPage = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData,setFormData] = useState({email:'',name:'',password:'',hospital_id:'',hospital_password:''}) 
  const [patientPortal,setPatientPortal] = useState(true)
  const errorMsg = searchParams.get("error");


  const [userMsg, setUserMsg] = useState(() => {
  if (errorMsg === "use-local-account") return "Please login using your manual username and password.";
  if (errorMsg === "server-error") return "Server error occurred. Try again later.";
  return "";
  });
  
  if(pathname?.startsWith('/dashboard')) return null;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin && patientPortal) {
      if(!formData.email || !formData.password) return;
      try {
        const serverResponse = await axios.post("/api/auth/login",{formData}) 
        if(serverResponse){
        setUserMsg(serverResponse.data.message)
        auth?.setAuthenticated(true);
        window.location.reload()
        } 
        }
      catch (err:any) {
        setUserMsg(err?.response?.data?.message)
      }
    } else if(!isLogin && patientPortal) {
      if(!formData.email || !formData.password || !formData.name) return;
      try {
        const serverResponse = await axios.post("/api/auth/registration",{formData}) 
        if(serverResponse){
        setUserMsg(serverResponse?.data?.message)
        setIsLogin(true)
        }
      } catch (err:any) {
        setUserMsg(err?.response?.data?.message)
      }
    }
    else{
      //it is a admin request ...
      if(!formData.hospital_id || !formData.hospital_password) return
      try{
        const server_response = await axios.post('/api/auth/login',{formData})
        if(server_response){
          window.location.reload()
        }
      }
      catch(err: any){
        setUserMsg(err?.response?.data?.message)
      }
    }
  };



  
  return (
    <form onSubmit={handleSubmit} className="p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
      <h2 className="text-3xl mb-6 text-center">
        {!patientPortal ? "Admin portal": patientPortal && isLogin ? 'User Login Page' : patientPortal && !isLogin ? 'User Registration': ''}
      </h2>

      {!isLogin && patientPortal && (
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      )}

      {patientPortal && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your password"
              className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </>
      )}

      {!patientPortal && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Hospital ID</label>
            <input
              type="text"
              value={formData.hospital_id}
              name="hospital_id"
              onChange={handleChange}
              placeholder="Enter Hospital ID"
              className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Hospital Password</label>
            <input
              type="password"
              name="hospital_password"
              value={formData.hospital_password}
              onChange={handleChange}
              placeholder="Enter Your password"
              className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-md text-white font-semibold mb-4">
        {!patientPortal ? "Access" : isLogin && patientPortal ? "Login": !isLogin && patientPortal ? 'Register': ''}
      </button>

      {/* ✅ Google Login Button */}
      <GoogleLogin patientPortal = {patientPortal}/>

      {patientPortal && (
        <p className="text-center text-gray-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 font-bold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      )}

      <p className="text-center mt-2 text-sm text-gray-400 gap-2">
        {!patientPortal ? 'Access the user portal':'Access the Admin portal'}
        <span onClick={()=>setPatientPortal(!patientPortal)} className="font-bold cursor-pointer hover:underline ml-2 text-blue-500">
          {!patientPortal ? 'User' : 'Admin'}
        </span>
      </p>

      <p className="text-pink-500 mt-5 text-center">{userMsg}</p>
    </form>
  )
}

export default LoginPage