import React from "react";
import {
  AppleIcon,
  BgAuth,
  FacebookIcon,
  GoogleIcon,
  logo,
  ORimg,
} from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import ToolboxSection from "../../components/ToolboxSection/ToolboxSection ";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  return (
    <div className=" bg-gradient-to-br from-[#F4F7FC] to-[#E9F5E5] p-4 ">
      <div className=" flex flex-col md:flex-row min-h-screen ">
        <div className="auth-bg hidden rounded-l-[20px] w-full md:w-1/2 items-center justify-center p-10  md:flex">
          <ToolboxSection />
        </div>

        <div className="w-full bg-white md:w-1/2 flex rounded md:rounded-r-[20px]  justify-center relative">
          <div className="w-full max-w-md p-7 ">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Logo" className="h-[196px] w-[182px]" />
            </div>

            <h2 className="text-[32px] font-[600] text-center leading-[43.2px] mb-4">
              Sign In
            </h2>
            <p className="text-center text-[16px] leading-[21.6px] font-[500] mb-6">
              Please enter the details below to continue
            </p>

            <form className="space-y-3">
              <AuthInput type="email" placeholder="Email" />

              <AuthInput type="password" placeholder="Password" />
              <p
                onClick={() => navigation("/forgot")}
                className="text-[12px] text-[#181818] font-[500] text-right cursor-pointer leading-[16.2px] "
              >
                Forget Password
              </p>
              <AuthSubmitBtn
                text="Sign In"
                handleSubmit={() => navigation("/forgot")}
                type="button"
              />
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

            <p className="text-center text-[16px] leading-[21.6px] font-medium relative z-10">
              Don’t have an account?
              <span className="text-blue-900">
                <Link to="/sign-up"> Sign up</Link>
              </span>
            </p>
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

export default Login;
