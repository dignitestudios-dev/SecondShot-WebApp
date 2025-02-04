import React, { useContext, useState } from "react";
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
import { useFormik } from "formik";
import { signInValues } from "../../data/authentication";
import { signInSchema } from "../../Schema/signInSchema";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";

const Login = () => {
  const navigation = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signInValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        setLoading(true);

        try {
          let obj = {
            email: values.email,
            password: values.password,
          };

          const response = await axios.post("/api/auth/login", obj);

          if (response.status === 200) {
            login(response?.data);
       
            sessionStorage.setItem("email", values?.email);

            const { is_profile_completed, is_registration_question_completed } =
              response?.data;
            if (!is_profile_completed) {
              navigation("/profiledetail");
            } else if (!is_registration_question_completed) {
              navigation("/registration-question");
            } else {
              navigation("/home");
            }

            SuccessToast("Logged in successfully");
          }
        } catch (err) {
          ErrorToast(err?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className=" bg-gradient-to-br from-[#F4F7FC] to-[#E9F5E5] p-4 ">
      <div className=" flex flex-col md:flex-row min-h-screen ">
        <div className="auth-bg hidden rounded-l-[20px] w-full md:w-1/2 items-center justify-center p-10  md:flex">
          <ToolboxSection />
        </div>

        <div className="w-full bg-white md:w-1/2 flex rounded md:rounded-r-[20px]  justify-center relative">
          <div className="w-full max-w-md p-7 ">
            <div className="flex justify-center ">
              <img src={logonew} alt="Logo" className="h-[206px] w-[206px]" />
            </div>

            <h2 className="text-[32px] font-[600] text-center leading-[43.2px] mb-4">
              Sign In
            </h2>
            <p className="text-center text-[16px] leading-[21.6px] font-[500] mb-6">
              Please enter the details below to continue
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <AuthInput
                id="email"
                name="email"
                type="email"
                value={values.email}
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.email}
                </span>
              ) : null}

              <AuthInput
                id="password"
                name="password"
                type="password"
                value={values.password}
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.password}
                </span>
              ) : null}
              <p
                onClick={() => navigation("/forgot")}
                className="text-[12px] text-[#181818] font-[500] text-right cursor-pointer leading-[16.2px] "
              >
                Forgot Password
              </p>
              <AuthSubmitBtn text="Sign In" type="submit" loading={loading} />
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
                <Link to="/"> Sign up</Link>
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
