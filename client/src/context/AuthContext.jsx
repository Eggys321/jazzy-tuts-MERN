import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [shown, setShown] = useState(false);
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

  // show ftn for closing and opening the dropdown for bag

  useEffect(() => {
    getLoggedIn()
  },[]);

  return <AuthContext.Provider  value={{
        
    loggedIn,
    getLoggedIn,
    logout,
    setLoggedIn,
    shown,
    setShown

  }}>
    
    {children}
  
  </AuthContext.Provider>;
};

export default AuthContext;
