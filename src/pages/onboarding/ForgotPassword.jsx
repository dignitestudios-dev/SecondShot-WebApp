import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { BgAuth, ForgotLogo } from "../../assets/export";
import AuthSubmitBtn from "./../../components/onboarding/AuthBtn";
import AuthInput from "../../components/onboarding/AuthInput";
import BackBtn from "../../components/onboarding/BackBtn";

const ForgotPassword = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgot = () => {
    navigation("/email-otp");
    localStorage.setItem("forgot", true);
  };

  return (
    <div className=" bg-slate-200 p-3">
      <div className="grid grid-cols-12  py-4 h-screen">
        <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
        <div className="col-span-12 md:col-span-8 flex justify-center rounded lg:rounded-r-[20px] items-center bg-white pb-4 relative overflow-hidden">
          <div>
            <div className="flex justify-center mb-3">
              <img
                src={ForgotLogo}
                alt="logo"
                className="object-cover w-[28%]"
              />
            </div>
            <div className="mb-3">
              <h1 className="text-[32px] font-semibold text-center">
                Forgot Password
              </h1>
              <p className="text-[#181818] text-center">
                Enter your registered email address below
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-[350px]">
                <AuthInput type="email" placeholder="Email Address" />
              </div>
              <div className="mb-6">
                <AuthSubmitBtn
                  text="Send"
                  handleSubmit={handleForgot}
                  type="button"
                />
              </div>
              <BackBtn handleClick={() => navigation(-1)} />
            </div>
          </div>
          <img
            src={BgAuth}
            alt="logo"
            className="absolute -bottom-8 -right-8 w-[30%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
