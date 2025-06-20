import React, { useState } from "react";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import AuthInput from "../../components/onboarding/AuthInput";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const PasswordModal = ({ onClose, handleSubmit, loading ,setPassword,password}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 right-0 w-screen h-screen  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FEFEFE] rounded-lg flex  flex-col   p-6 shadow-[22px]">
        <div
          className="flex cursor-pointer justify-end items-end"
          onClick={onClose}
        >
          <RxCross1 />
        </div>
        <h2 className="text-[36px] w-[460px] font-[600] mt-3 text-[#000000] text-center leading-[48.6px] ">
          Password
        </h2>
        <AuthInput
          text={"Enter Current Password"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={50}
        />
        <div className="flex items-center justify-center  mt-6 ">
          <div className=" w-[295px]">
            <AuthSubmitBtn
              text={"Submit"}
              handleSubmit={handleSubmit}
              loading={loading}
              disabled={!password.trim()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
