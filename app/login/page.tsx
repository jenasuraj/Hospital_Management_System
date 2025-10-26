"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const auth = useAuth();
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const [formData,setFormData] = useState({email:'',name:'',password:''}) 
  const [userMsg,setUserMsg] = useState('')

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = event.target;
   setFormData(prev => ({ ...prev, [name]: value }));
   };

  const handleSubmit = async (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
       if(!formData.email || !formData.password) return
      try {
        const response = await axios.post("/api/auth/login",{formData}) 
        if(response.data.data){
        auth?.setAuthenticated(true);
        router.push("/")
        }
        else{
          setUserMsg(response.data.message)
        }
      } catch (err) {
        console.error(err);
        setUserMsg("server error")
      }
    } else {
      if(!formData.email || !formData.password || !formData.name) return
      try {
        const data = await axios.post("/api/auth/registration",{formData}) 
        console.log(data)
        setUserMsg(data.data.message)
        setIsLogin(true)
      } catch (err) {
        setUserMsg("server error")
      }
    }
  };


  return (
    <section className="flex items-center justify-center min-h-screen text-white">
      <form onSubmit={handleSubmit} className=" p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-800">
        <h2 className="text-3xl mb-6  text-center">
          {isLogin ? "LogIn Portal" : "Registration Portal"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 rounded-md border border-gray-700  focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}

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
          <label className="block  mb-2">Password</label>
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

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-md text-white font-semibold mb-4">
          {isLogin ? "Log In" : "Register"}
        </button>

        <p className="text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 font-bold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
        <p className="text-red-500 mt-5 text-center">{userMsg}</p>
      </form>
    </section>
  );
};

export default Page;