import React, { useContext, useState } from "react";
import { BgAuth, logonew, ORimg } from "../../assets/export";
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
import SocialLogin from "./SocialLogin";
import FreeModal from "../../components/Global/FreeModal";

const Login = () => {
  const navigation = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [freeModal, setFreeModal] = useState(false);
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
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
        if (err?.response?.data?.message) {
          ErrorToast(err?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleEmailChange = (e) => {
    let input = e.target.value;

    input = input.toLowerCase();

    input = input.replace(/\s+/g, "");

    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (input.length > 0 && regex.test(input)) {
      setFieldValue("email", input);
    } else {
      setFieldValue("email", input);
    }
  };
  return (
    <div className=" bg-gradient-to-br from-[#F4F7FC] to-[#E9F5E5] p-4 ">
      <div className=" flex flex-col md:flex-row min-h-screen ">
        <div className="auth-bg hidden rounded-l-[20px] w-full md:w-1/2 items-center justify-center p-10  md:flex">
          <ToolboxSection />
        </div>

        <div className="w-full bg-white md:w-1/2 flex flex-col rounded md:rounded-r-[20px]  items-center justify-center relative">
          <div className="w-full max-w-md p-7 ">
            <div className="flex justify-center ">
              <img
                src={logonew}
                alt="Logo"
                className="h-[215px] w-[215px] object-contain"
              />
            </div>

            <h2 className="text-[32px] font-[600] text-center leading-[43.2px] mb-4">
              Sign In
            </h2>
            <div className="flex justify-center mb-3">
              <div className="w-[140px]">
                <AuthSubmitBtn
                  text={"Try It For Free"}
                  handleSubmit={() => setFreeModal(true)}
                />
              </div>
            </div>
            <p className="text-center text-[16px] leading-[21.6px] font-[500] mb-6">
              Please enter the details below to continue
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <AuthInput
                id="email"
                name="email"
                type="text"
                value={values.email}
                placeholder="Email"
                onChange={handleEmailChange}
                onBlur={handleBlur}
                maxLength={254}
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
                maxLength={50}
                onkeypress={(e) => {
                  if (e.key === " " || e.keyCode === 32) {
                    e.preventDefault();
                  }
                }}
              />
              {errors.password && touched.password ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.password}
                </span>
              ) : null}
              <p
                onClick={() => navigation("/forgot")}
                className="text-[12px] relative z-10 text-[#181818] font-[500] text-right cursor-pointer leading-[16.2px] "
              >
                Forgot Password
              </p>
              <AuthSubmitBtn text="Sign In" type="submit" loading={loading} />
            </form>

            <div className="flex justify-center my-6">
              <img src={ORimg} className="h-[22px] w-[350px]" alt="Divider" />
            </div>
            <div className="flex justify-center items-center mb-6">
              <SocialLogin />
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
            className="absolute w-[300px] h-[383px] bottom-0 right-0 z-0 rounded-br-[20px]"
            alt="Auth Background"
          />
        </div>
      </div>
      <FreeModal
        isOpen={freeModal}
        handleClick={() => navigation("/")}
        onClose={() => setFreeModal(false)}
      />
    </div>
  );
};

export default Login;
