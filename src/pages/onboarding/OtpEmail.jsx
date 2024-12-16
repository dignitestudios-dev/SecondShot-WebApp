import React from "react";
import { BgAuth, OtpScreen } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/onboarding/AuthInput";

const OtpEmail = () => {
  const navigation = useNavigate("");
  const onForgot = localStorage.getItem("forgot");
  console.log("🚀 ~ OtpEmail ~ onForgot:", onForgot);
  return (
    <div className=" bg-slate-200 p-3">
      <div className="grid grid-cols-12  py-4 h-screen">
        <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
        <div className="col-span-12 md:col-span-8 flex justify-center items-center rounded  lg:rounded-r-[20px] bg-white pb-4 relative overflow-hidden">
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
            <p className="text-center text-[16px]  text-[#181818] mb-6 leading-[25.68px] ">
              The code was sent to{" "}
              <span className=" text-[#181818] font-[500]">
                johndoe@mail.com
              </span>
            </p>

            <div className="flex justify-center space-x-4 mb-6">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-[49px] h-[49px] border border-gray-300 rounded-[12px] text-center text-lg font-medium focus:outline-none focus:ring-1 focus:ring-[#0E73D0]"
                />
              ))}
            </div>
            {onForgot === "true" ? (
              <AuthSubmitBtn
                text={"Verify"}
                handleSubmit={() => navigation("/reset-password")}
              />
            ) : (
              <AuthSubmitBtn
                text={"Verify"}
                handleSubmit={() => navigation("/phone-otp")}
              />
            )}
            <p className="text-center text-[16px] text-[#181818] font-[500] mt-4">
              Didn’t receive the code yet?{" "}
              <a href="#" className=" font-medium text-[#012C57] hover:underline">
                Resend
              </a>
            </p>
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

export default OtpEmail;
