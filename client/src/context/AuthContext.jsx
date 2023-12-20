import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const token = localStorage.getItem("token");
  async function getLoggedIn() {
    const res = await fetch("https://jazzy-mern.onrender.com/api/user/isloggedin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setLoggedIn(data);
  }
// logout ftn
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    getLoggedIn()
  },[]);

  return <AuthContext.Provider  value={{
        
    loggedIn,
    getLoggedIn,
    logout,
    setLoggedIn

  }}>
    
    {children}
  
  </AuthContext.Provider>;
};

export default AuthContext;
