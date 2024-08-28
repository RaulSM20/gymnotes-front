import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const parsedToken = parseJwt(storedToken);
        if (parsedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to parse token:", error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseJwt = (token: string): any => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
