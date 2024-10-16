"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  loginFromContext: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Only access sessionStorage in the browser environment
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  const loginFromContext = (token: string) => {
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginFromContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
