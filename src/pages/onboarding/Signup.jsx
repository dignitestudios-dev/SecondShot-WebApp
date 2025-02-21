import React, { useState } from "react";
import {
  AppleIcon,
  BgAuth,
  GoogleIcon,
  logonew,
  ORimg,
} from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import ToolboxSection from "../../components/ToolboxSection/ToolboxSection ";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputs from "../../components/onboarding/PhoneInputs";
import { useFormik } from "formik";
import { signUpValues } from "../../data/authentication";
import { signUpSchema } from "../../Schema/signUpSchema";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { phoneFormater } from "../lib/helper";
import SocialLogin from "./SocialLogin";

const SignUpForm = () => {
  const navigation = useNavigate();
  const auth = getAuth();
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState("");
  const checkStatus = async () => {
    try {
      const response = await axios.post("/api/auth/check-firebase-user", {
        email: values?.email,
      });
      if (response) {
        return true;
      }
    } catch (error) {
      return true;
    }
  };
  const sendDataToBackend = async (values, token) => {
    if (!token) {
      ErrorToast("Token is missing. Cannot proceed.");
      return;
    }

    setLoading(true);
    try {
      let formattedPhoneNumber = values?.phoneNumber.startsWith("+1")
        ? values?.phoneNumber
        : `+1${values?.phoneNumber}`;

      let obj = {
        name: values?.fullname,
        email: values?.email,
        phone: formattedPhoneNumber,
        password: values?.password,
        confirm_password: values?.Cpassword,
        idToken: token,
      };

      const response = await axios.post("/api/auth/sign-up", obj);

      if (response.status === 201 || response.status === 200) {
        sessionStorage.setItem("email", values?.email);
        sessionStorage.setItem("fullname", values?.fullname);
        sessionStorage.setItem("phoneNumber", formattedPhoneNumber);
        SuccessToast("SignUp Successfully");
        navigation("/email-otp");
      } else {
        const errorMessage = response?.data?.error || "Email Already Exist";
        ErrorToast(errorMessage);
      }
    } catch (err) {
      if (err?.response) {
        const errorMessage =
          err?.response?.data?.message || err?.response?.data?.error;
        ErrorToast(errorMessage || "An error occurred during sign up.");
      } else {
        // Handle other errors (e.g., network or unknown issues)
        ErrorToast("An unexpected error occurred. Please try again.");
      }

      if (newUser?.user) {
        try {
          await newUser.user.delete();
          console.log("Account successfully deleted.");
        } catch (deleteError) {
          console.log("Failed to delete the account:", deleteError);
          ErrorToast("Account cleanup failed.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: signUpValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const status = await checkStatus();
        if (status) {
          const newUserResponse = await createUserWithEmailAndPassword(
            auth,
            values?.email,
            "Test@123"
          );
          const user = newUserResponse.user;
          setNewUser(newUserResponse);

          const token = await getIdToken(user);

          if (token) {
            await sendDataToBackend(values, token);
          } else {
            ErrorToast("Token not found");
          }
        }
      } catch (error) {
        if (error?.message?.includes("auth/email-already-in-use")) {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              values?.email,
              "Test@123"
            );
            const user = userCredential?.user;
            const token = await getIdToken(user);

            if (token) {
              await sendDataToBackend(values, token);
            } else {
              ErrorToast("Token not found");
            }
          } catch (err) {
            ErrorToast("Email is already in use");
          }
        } else {
          ErrorToast("Firebase authentication failed");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFullnameChange = (e) => {
    let input = e.target.value;

    input = input.replace(/\s{2,}/g, " ");

    const regex = /^[A-Za-z\s-"']*$/;

    if (input.length >= 0 && !input.startsWith(" ") && regex.test(input)) {
      setFieldValue("fullname", input);
    } else {
    }
  };

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

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } });
    }
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
            <form className="space-y-3" onSubmit={handleSubmit}>
              <AuthInput
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full Name"
                value={values.fullname}
                onChange={handleFullnameChange}
                onBlur={handleBlur}
                maxLength={30}
              />
              {errors.fullname && touched.fullname ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.fullname}
                </span>
              ) : null}
              <AuthInput
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                maxLength={254}
              />
              {errors.email && touched.email ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.email}
                </span>
              ) : null}
              <PhoneInputs
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                id="phoneNumber"
                name="phoneNumber"
                value={phoneFormater(values?.phoneNumber)}
                autoComplete="off"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.phoneNumber}
                </span>
              ) : null}
              <AuthInput
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onkeypress={(e) => {
                  if (e.key === " " || e.keyCode === 32) {
                    e.preventDefault();
                  }
                }}
                maxLength={50}
              />
              {errors.password && touched.password ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.password}
                </span>
              ) : null}
              <div className="relative z-10">
                <AuthInput
                  type="password"
                  id="Cpassword"
                  name="Cpassword"
                  placeholder="Confirm Password"
                  value={values.Cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onkeypress={(e) => {
                    if (e.key === " " || e.keyCode === 32) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={50}
                />
                {errors.Cpassword && touched.Cpassword ? (
                  <span className="text-red-700 text-sm font-medium">
                    {errors.Cpassword}
                  </span>
                ) : null}
              </div>
              <div className="pt-4">
                <AuthSubmitBtn text="Sign Up" type="submit" loading={loading} />
              </div>
            </form>
            <div className="flex justify-center my-6">
              <img src={ORimg} className="h-[22px] w-[350px]" alt="Divider" />
            </div>
            <div className="flex justify-center items-center mb-6">
              <SocialLogin />
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
            <div className="text-center font-medium text-[16px] leading-[21.6px] mt-2">
              I agree to the{" "}
              <a href="#" className="text-blue-900 font-[500] underline">
                Terms & Conditions
              </a>{" "}
              &{" "}
              <a href="#" className="text-blue-900 font-[500] underline">
                Privacy Policy
              </a>
            </div>
          </div>
          <img
            src={BgAuth}
            className="absolute z-0  w-[300px] h-[383px] bottom-0 right-0 rounded-br-[20px]"
            alt="Auth Background"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
