import React, { useEffect, useState } from "react";
import { TickIcon, ForgotLogo } from "../../assets/export";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import AuthInput from "../../components/onboarding/AuthInput";
import BackBtn from "../../components/onboarding/BackBtn";
import { resetValues } from "../../data/authentication";
import { resetSchema } from "../../Schema/signInSchema";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { useFormik } from "formik";

const ResetPassword = () => {
  const navigation = useNavigate();

  const [isTrue, setIsTrue] = useState(false);

  const email = sessionStorage.getItem("email");
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: resetValues,
      validationSchema: resetSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        try {
          const response = await axios.post("/api/auth/reset-password", {
            email: email,
            password: values.password,
            confirm_password: values.Cpassword,
          });

          if (response.status === 200) {
            SuccessToast("OTP Resend successfully!");
            setIsTrue(true);
            localStorage.setItem("forgot", false);
          }
        } catch (error) {
          ErrorToast("OTP verification failed:");
          console.error("OTP verification failed:", error);
        } finally {
          setloading(false);
        }
      },
    });


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
                <AuthSubmitBtn
                  text="Continue"
                  type="button"
                  handleSubmit={() => navigation("/sign-in")}
                />
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
              <form className="space-y-3" onSubmit={handleSubmit}>
                <AuthInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  value={values.password}
                  name="password"
                  type="password"
                  placeholder="New Password"
                />
                {errors.password && touched.password ? (
                  <span className="text-red-700 text-sm font-medium">
                    {errors.password}
                  </span>
                ) : null}
                <AuthInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="Cpassword"
                  value={values.Cpassword}
                  name="Cpassword"
                  type="password"
                  placeholder="Confirm New Password"
                />
                {errors.Cpassword && touched.Cpassword ? (
                  <span className="text-red-700 text-sm font-medium">
                    {errors.Cpassword}
                  </span>
                ) : null}
                <div className="mb-6 pt-2">
                  <AuthSubmitBtn type="submit" text="Save" />
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
