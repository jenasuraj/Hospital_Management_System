/*"use client";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {


  return (
    <AuthContext.Provider value={}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);*/