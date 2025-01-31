import React, { useContext, useEffect, useState } from "react";
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
import { auth } from "../../firebase/firebase";

const SignUpForm = () => {
  const navigation = useNavigate();
  const auth = getAuth();
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState("");

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
        ErrorToast("Email Already Exist");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Server error occurred");

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

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signUpValues,
      validationSchema: signUpSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        setLoading(true);
        try {
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
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.fullname && touched.fullname ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.fullname}
                </span>
              ) : null}
              <AuthInput
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <span className="text-red-700 text-sm font-medium">
                  {errors.email}
                </span>
              ) : null}
              <PhoneInputs
                onChange={handleChange}
                onBlur={handleBlur}
                id="phoneNumber"
                name="phoneNumber"
                
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
