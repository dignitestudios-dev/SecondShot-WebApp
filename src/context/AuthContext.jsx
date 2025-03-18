import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { ModalContext } from "./GlobalContext";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [profilepic, setProfilepic] = useState("");
  const [profilename, setProfilename] = useState("");
  const { getnotifications } = useContext(ModalContext);
  const [user, setUser] = useState({
    name: Cookies.get("name") || "",
    email: Cookies.get("email") || "",
    phone: Cookies.get("phone") || "",
  });

  const [token, setToken] = useState(Cookies.get("token"));
  const [regQuestion, setRegQuestion] = useState(Cookies.get("regQuestion"));
  const [subscriptionpaid, setSubscriptionpaid] = useState(false);
  const [registrationQuestion, setregistrationQuestion] = useState(false);
  const [profileCompleted, setprofileCompleted] = useState(false);

  const login = (userData) => {
    Cookies.set("token", userData?.token);
    Cookies.set("subscriptionpaid", userData?.is_subscription_paid);
    Cookies.set("regQuestion", userData.is_registration_question_completed);
    Cookies.set("name", userData?.name);
    Cookies.set("email", userData?.email);
    Cookies.set("phone", userData?.phone);

    setToken(userData?.token);
    getnotifications();
    setRegQuestion(userData?.is_registration_question_completed);
    setSubscriptionpaid(userData?.is_subscription_paid);
    setUser({
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
    });
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
        setProfilename(user?.name);
        setregistrationQuestion(user?.is_registration_question_completed);
        setprofileCompleted(user?.is_profile_completed);
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
    setSubscriptionpaid,
    profileCompleted,
    registrationQuestion,
    getProfile,
    user,
    profilename
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
