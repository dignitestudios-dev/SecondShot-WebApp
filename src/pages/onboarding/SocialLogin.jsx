import React, { useContext, useState } from "react";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { FiLoader } from "react-icons/fi";
import { appleProvider, auth, googleProvider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { AppleIcon, GoogleIcon } from "../../assets/export";
import { signInWithPopup } from "firebase/auth";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";

const SocialLogin = () => {
  const navigation = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  const [idToken, setIdToken] = useState(null);
  const { login } = useContext(AuthContext);

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      if (result) {
        const token = await result?.user?.getIdToken();
        const email = result?.user?.email;
        const name = result?.user?.displayName;
        if (token) {
          axios
            .post(`/api/auth/social-login`, {
              idToken: token,
              email: email,
              name: name,
            })
            .then(
              (response) => {
                login(response?.data);
                // if (response?.data?.data?.token) {
                //   if (response?.data?.data?.isSubscribed === true) {
                //     navigate("/welcome-aboard");
                //   } else {
                //     navigate("/select-package");
                //   }
                // }
              },
              (error) => {
                console.log(error);
                if (
                  error?.response?.status == 401 &&
                  error?.response?.data?.message == "No such user found"
                ) {
                  setIdToken(token);
                  setShowModal(true);
                }
                setAppleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      console.log("🚀 ~ handleAppleLogin ~ err:", err);
      setAppleLoading(false);
      //   setError("Cannot open apple signin modal.");
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setGoogleLoading(false);

      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const token = await result?.user?.getIdToken();
        const email = result?.user?.email;
        const name = result?.user?.displayName;

        if (token) {
          try {
            const response = await axios.post(`/api/auth/social-login`, {
              idToken: token,
              email: email,
              name: name,
            });

            if (response.status == 200 || response.status == 201) {
              login(response?.data);

              sessionStorage.setItem("email", email);
             

              const {
                is_profile_completed,
                is_registration_question_completed,
              } = response?.data;
              if (!is_profile_completed) {
                navigation("/profiledetail");
              } else if (!is_registration_question_completed) {
                navigation("/registration-question");
              } else {
                navigation("/home");
              }

              SuccessToast(response?.data?.message);
            }
          } catch (error) {
            console.log(error);
            ErrorToast(
              error?.response?.data?.message || "Something went wrong"
            );
          }
        }
      }
    } catch (err) {
      ErrorToast(err?.message || "Unknown error occured");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className=" flex gap-2 justify-center items-center">
      <button
        className="border border-[#D9D9D9] p-3 rounded-[8px]"
        onClick={handleGoogleLogin}
      >
        {googleLoading ? (
          <div className="flex items-center gap-2">
            <img src={GoogleIcon} alt="Google" className="h-[20px] w-[20px]" />
            <FiLoader className="text-[#1A293D]  animate-spin mx-auto" />
          </div>
        ) : (
          <img src={GoogleIcon} alt="Google" className="h-[20px] w-[20px]" />
        )}
      </button>
      <button
        className="border border-[#D9D9D9] p-3 rounded-[8px]"
        onClick={handleAppleLogin}
      >
        {appleLoading ? (
          <div className="flex items-center gap-2">
            <img src={AppleIcon} alt="Apple" className="h-[20px] w-[20px]" />
            <FiLoader className="text-[#1A293D]  animate-spin mx-auto" />
          </div>
        ) : (
          <img src={AppleIcon} alt="Apple" className="h-[20px] w-[20px]" />
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
