import React, { useEffect, useRef, useState } from "react";
import { BgAuth, OtpScreen } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import Cookies from "js-cookie";
import VerifiedScreen from "./VerifedScreen";

const OtpEmail = () => {
  const navigation = useNavigate();
  const onForgot = localStorage.getItem("forgot");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setloading] = useState(false);
  const email = sessionStorage.getItem("email");

  const inputs = useRef([]);

    const handleChange = (e, index) => {
      const { value } = e.target;

      if (/^\d$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < otp.length - 1) {
          inputs.current[index + 1].focus();
        }
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);

        if (index > 0) {
          inputs.current[index - 1].focus();
        }
      }
    };

  const getOtpValue = () => {
    return parseInt(otp.join(""), 10);
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    setloading(true)
    try {
      const response = await axios.post("/api/auth/verify-otp", {
        email: email,
        otp: otpValue,
        type: "signup",
      });

      if (response.status === 200) {
        if (onForgot === "true") {
          SuccessToast("OTP verified successfully");
          navigation("/reset-password"); 
        } else {
          const token = response?.data?.token;
          Cookies.set("token", token);
          SuccessToast("OTP verified successfully!");
          setIsVerified(true);
        }
      }
    } catch (error) {
      ErrorToast("OTP verification failed:");
      console.error("OTP verification failed:", error);
    }finally{
    setloading(false)

    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("/api/auth/resend-email-otp", {
        email: email,
      });

      if (response.status === 200) {
        SuccessToast("OTP Resend successfully!");
      }
    } catch (error) {
      ErrorToast("OTP verification failed:");
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="bg-slate-200 p-3">
      {isVerified === true ? (
        <VerifiedScreen />
      ) : (
        <div className="grid grid-cols-12 py-4 h-screen">
          <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
          <div className="col-span-12 md:col-span-8 flex justify-center items-center rounded lg:rounded-r-[20px] bg-white pb-4 relative overflow-hidden">
            <div className="w-full max-w-md p-7">
              <div className="flex justify-center mb-6">
                <img
                  src={OtpScreen}
                  alt="OTP Illustration"
                  className="h-[120px] w-[120px]"
                />
              </div>

              <h2 className="text-[32px] font-[600] leading-[43.2px] text-center mb-2">
                Verify OTP
              </h2>
              <p className="text-center text-[16px] text-[#181818] mb-6 leading-[25.68px] ">
                The code was sent to{" "}
                <span className="text-[#181818] text-nowrap font-[500]">
                  {email}
                </span>
              </p>

              <div className="flex justify-center space-x-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputs.current[index] = el)}
                    className="w-[49px] h-[49px] border border-gray-300 rounded-[12px] text-center text-lg font-medium focus:outline-none focus:ring-1 focus:ring-[#0E73D0]"
                  />
                ))}
              </div>

              <AuthSubmitBtn
                text={"Verify"}
                type={"button"}
                handleSubmit={handleSubmit}
                loading={loading}
              />

              <p className="text-center flex justify-center  text-[16px] text-[#181818] font-[500] mt-4">
                Didn’t receive the code yet?{" "}
                <div
                  className="font-medium text-[#012C57] hover:underline cursor-pointer"
                  onClick={() => handleResendOtp()}
                >
                  Resend
                </div>
              </p>
            </div>
            <img
              src={BgAuth}
              alt="logo"
              className="absolute -bottom-8 -right-8 w-[30%]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpEmail;
