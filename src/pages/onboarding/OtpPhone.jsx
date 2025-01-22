import React, { useRef, useState } from "react";
import { BgAuth, OtpScreen } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const OtpPhone = () => {
  const navigation = useNavigate("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  
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
    const handleSubmit = () => {
      const otpValue = getOtpValue(); 
      console.log("OTP Submitted:", otpValue);

      
      if (onForgot === "true") {
        navigation("/reset-password");
      } else {
        
      }
    };
  return (
    <div className=" bg-slate-200 p-3">
      <div className="grid grid-cols-12  py-4 h-screen">
        <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
        <div className="col-span-12 md:col-span-8 flex justify-center rounded lg:rounded-r-[20px] items-center bg-white pb-4 relative overflow-hidden">
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
              <span className=" text-[#181818] font-[500]">+000 0000 000</span>
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

            <AuthSubmitBtn text={"Verify"} type={"button"}   handleSubmit={handleSubmit} />

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

export default OtpPhone;
