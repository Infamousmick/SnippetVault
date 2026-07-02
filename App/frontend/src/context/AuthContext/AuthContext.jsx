import { Children, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsCheckingAuth(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isOauth = Boolean(user?.google_id || user?.github_id);
  const value = {
    user,
    isLoggedIn: !!user,
    isCheckingAuth,
    loginUser,
    logoutUser,
    isOauth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
