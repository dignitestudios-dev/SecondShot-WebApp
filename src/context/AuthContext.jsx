import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //   const [user, setUser] = useState({
  //     name: Cookies.get("name") || "",
  //     email: Cookies.get("email") || "",
  //     phone: Cookies.get("phone") || "",
  //     idToken: Cookies.get("idToken") || "",
  //   });

  const [token, setToken] = useState("");

  const login = (userData) => {
    console.log(userData, "ajjaja");
    // Cookies.set("name", userData.name);
    // Cookies.set("email", userData.email);
    // Cookies.set("phone", userData.phone);
    // Cookies.set("idToken", userData.idToken);
    Cookies.set("token", userData.token);

    // setUser(userData);
    setToken(userData.token);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    navigate("/sign-in");
  };

  const value = {
    login,
    logout,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
