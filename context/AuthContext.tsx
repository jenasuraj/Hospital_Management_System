"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get("/api/auth/"); // check if user is logged in
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  console.log("in context",authenticated)

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
