import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAuth, ForgotLogo } from "../../assets/export";
import AuthSubmitBtn from "./../../components/onboarding/AuthBtn";
import AuthInput from "../../components/onboarding/AuthInput";
import BackBtn from "../../components/onboarding/BackBtn";
import axios from "../../axios";
import { useFormik } from "formik";
import { forgetSchema } from "../../Schema/signInSchema";
import { forgetValues } from "../../data/authentication";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";

const ForgotPassword = () => {
  const navigation = useNavigate();
  const [loading, setloading] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: forgetValues,
      validationSchema: forgetSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        setloading(true);
        try {
          const response = await axios.post("/api/auth/forget-password", {
            email: values.email,
          });

          if (response.status === 200) {
            sessionStorage.setItem("email", values.email);
            SuccessToast(response?.data?.message);
            localStorage.setItem("forgot", true);
            navigation("/email-otp");
          }
        } catch (error) {
          const backendErrorMessage =
            error.response?.data?.error || error.response?.data?.message;
          if (backendErrorMessage) {
            ErrorToast(backendErrorMessage);
          }
        } finally {
          setloading(false);
        }
      },
    });

  const handleback = () => {
    navigation(-1);
    localStorage.setItem("forgot", false);
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
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="w-[350px]">
                  <AuthInput
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email Address"
                  />
                  {errors.email && touched.email ? (
                    <span className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </span>
                  ) : null}
                </div>
                <div className="mb-6">
                  <AuthSubmitBtn text="Send" type="submit" loading={loading} />
                </div>
                <BackBtn handleClick={() => handleback()} />
              </div>
            </form>
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
