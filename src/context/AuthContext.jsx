import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [profilepic, setProfilepic] = useState("");

  //   const [user, setUser] = useState({
  //     name: Cookies.get("name") || "",
  //     email: Cookies.get("email") || "",
  //     phone: Cookies.get("phone") || "",
  //     idToken: Cookies.get("idToken") || "",
  //   });

  const [token, setToken] = useState(Cookies.get("token"));
  const [regQuestion, setRegQuestion] = useState(Cookies.get("regQuestion"));
  const [subscriptionpaid, setSubscriptionpaid] = useState(false);

  const login = (userData) => {
    Cookies.set("token", userData?.token);
    Cookies.set("subscriptionpaid", userData?.is_subscription_paid);
    Cookies.set("regQuestion", userData.is_registration_question_completed);
    setToken(userData?.token);
    setRegQuestion(userData?.is_registration_question_completed);
    setSubscriptionpaid(userData?.is_subscription_paid);
  };

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/user/my-profile");
      if (response.status === 200) {
        const user = response?.data?.data;
        Cookies.set("subscriptionpaid", user?.is_subscription_paid);
        setSubscriptionpaid(user?.is_subscription_paid);
        Cookies.set("profileData", JSON.stringify(user));
        setProfilepic(user?.profile_img);
        console.log(user, "user===>");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    Cookies.get("token") && getProfile();
  }, []);

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
    subscriptionpaid,
    setRegQuestion,
    profilepic,
    setProfilepic,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
