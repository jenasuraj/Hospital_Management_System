"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";


const GoogleLogin = ({ patientPortal,}: { patientPortal: boolean;}) => {


const handleGoogleLogin = async () => {
  await signIn("google");
  
};

  return (
    <>
      {patientPortal && (
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-700 py-2 rounded-md text-white font-semibold mb-4 flex gap-2 items-center justify-center bg-slate-900 cursor-pointer"
        >
          <FcGoogle size={25} /> Continue with Google
        </button>
      )}
    </>
  );
};

export default GoogleLogin;
