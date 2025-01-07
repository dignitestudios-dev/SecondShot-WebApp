import React from "react";
import {
  AppleIcon,
  BgAuth,
  FacebookIcon,
  GoogleIcon,
  logo,
  logonew,
  ORimg,
} from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import ToolboxSection from "../../components/ToolboxSection/ToolboxSection ";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputs from "../../components/onboarding/PhoneInputs";

const SignUpForm = () => {
  const navigation = useNavigate();
  const handleSignUp = () => {
    localStorage.setItem("forgot", false);
    navigation("/email-otp");
  };

  return (
    <div className=" bg-gradient-to-br from-[#F4F7FC] to-[#E9F5E5] p-4 ">
      <div className=" flex flex-col md:flex-row min-h-screen   ">
        <div className="auth-bg hidden rounded-l-[20px] w-full md:w-1/2 md:flex items-center justify-center p-10  ">
          <ToolboxSection />
        </div>

        <div className="w-full bg-white md:w-1/2 flex rounded md:rounded-r-[20px]  items-center justify-center relative">
          <div className="w-full max-w-md p-7 ">
            <div className="flex justify-center ">
              <img src={logonew} alt="Logo" className="h-[206px] w-[206px]" />
            </div>

            <h2 className="text-[32px] font-[600] text-center leading-[43.2px] mb-4">
              Sign Up
            </h2>
            <p className="text-center text-[16px] leading-[21.6px] font-[500] mb-6">
              Please enter the details below to continue
            </p>

            <form className="space-y-3">
              <AuthInput type="text" placeholder="Full Name" />
              <AuthInput type="email" placeholder="Email" />
              <PhoneInputs />
              <AuthInput type="password" placeholder="Password" />
              <AuthInput type="password" placeholder="Confirm Password" />
              <div className="pt-4">
                <AuthSubmitBtn
                  text="Sign Up"
                  handleSubmit={handleSignUp}
                  type="button"
                />
              </div>
            </form>

            <div className="flex justify-center my-6">
              <img src={ORimg} className="h-[22px] w-[350px]" alt="Divider" />
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button className="border border-[#D9D9D9] p-3 rounded-[8px]">
                <img
                  src={GoogleIcon}
                  alt="Google"
                  className="h-[20px] w-[20px]"
                />
              </button>

              <button className="border border-[#D9D9D9] p-3 rounded-[8px]">
                <img
                  src={AppleIcon}
                  alt="Apple"
                  className="h-[20px] w-[20px]"
                />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2  mt-4 mb-3 relative z-10">
              <p className="text-center text-[16px] leading-[21.6px] font-medium">
                Already have an account?
                <span className="text-blue-900">
                  {" "}
                  <Link to="/sign-in"> Sign in</Link>
                </span>
              </p>
            </div>

            <div className="text-center text-[16px] leading-[21.6px] mt-2">
              I Agree To The{" "}
              <a href="#" className="text-[#28A745] underline">
                Terms & Conditions
              </a>{" "}
              &{" "}
              <a href="#" className="text-[#28A745] underline">
                Privacy Policy
              </a>
            </div>
          </div>

          <img
            src={BgAuth}
            className="absolute w-[300px] h-[383px] bottom-0 right-0 rounded-br-[20px]"
            alt="Auth Background"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
