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

  const [token, setToken] = useState(Cookies.get("token"));
  const [regQuestion, setRegQuestion] = useState(Cookies.get("regQuestion"));

  const login = (userData) => {
    console.log(userData, "ajjaja");
    // Cookies.set("name", userData.name);
    // Cookies.set("email", userData.email);
    // Cookies.set("phone", userData.phone);
    // Cookies.set("idToken", userData.idToken);
    Cookies.set("token", userData?.token);
    Cookies.set("regQuestion", userData?.is_registration_question_completed);

    // setUser(userData);
    setToken(userData?.token);
    setRegQuestion(userData?.is_registration_question_completed);
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
    regQuestion,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
