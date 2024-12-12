import React, { useEffect, useState } from "react";
import { TickIcon, ForgotLogo } from "../../assets/export";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AuthInput from "../../components/onboarding/AuthInput";
import BackBtn from "../../components/onboarding/BackBtn";

const ResetPassword = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({ password: "", confPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const [isTrue, setIsTrue] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSuccess = () => {
    setIsTrue(true);
    setTimeout(() => {
      navigation("/sign-in");
      setIsTrue(false);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("forgot", false);
  }, []);
  return (
    <div className=" bg-slate-200 p-3 ">
      <div className="grid grid-cols-12  py-4 h-screen">
        <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
        <div className="col-span-12 md:col-span-8 flex justify-center items-center rounded lg:rounded-r-[20px] bg-white pb-4">
          {isTrue ? (
            <div>
              <div className="flex justify-center mb-3">
                <img
                  src={TickIcon}
                  alt="logo"
                  className="object-cover w-[28%]"
                />
              </div>
              <div className="mb-3">
                <h1 className="text-[32px] font-semibold text-center">
                  Password Updated
                </h1>
                <p className="text-[16px] text-center">
                  Your password has been reset.
                </p>
              </div>
              <div className="mb-6 px-28">
                <AuthSubmitBtn text="Continue" type="button" />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center mb-3">
                <img
                  src={ForgotLogo}
                  alt="logo"
                  className="object-cover w-[28%]"
                />
              </div>
              <div className="mb-3 px-12">
                <h1 className="text-[32px] font-semibold text-center">
                  Set New Password
                </h1>
              </div>
              <form className="space-y-3">
                <AuthInput type="password" placeholder="New Password" />
                <AuthInput type="password" placeholder="Confirm New Password" />
                <div className="mb-6 pt-2">
                  <AuthSubmitBtn
                    type="button"
                    text="Save"
                    handleSubmit={handleSuccess}
                  />
                </div>
                <BackBtn handleClick={() => navigation(-1)} />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
