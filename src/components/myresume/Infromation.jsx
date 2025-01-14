import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Information = ({ nextStep, setFormData, formData, prevStep }) => {
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const navigate = useNavigate();
  return (
    <div className="pt-6 px-3">
      <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
        <div>
          <IoIosArrowBack
            className="font-[600]"
            ononClick={() => navigate("/create-resume-info")}
          />
        </div>
        <div onClick={() => navigate("/create-resume-info")}>BACK</div>
      </div>
      <div>
        <p className="text-[32px] font-medium"> Personal Information</p>
        <p className="text-sm ">
          We’ve collected your contact information from your profile. Feel free
          to make changes.
        </p>
      </div>
      <div className="w-full flex flex-col items-start gap-1 my-8">
        <AuthInput placeholder={"Enter Your Name"} text={"Full Name"} />
      </div>
      <div className="w-full flex flex-col items-start gap-1 my-8">
        <AuthInput placeholder={"Enter Your Email"} text={"Email Address"} />
      </div>
      <div className="w-full flex flex-col items-start gap-1 my-8">
        <AuthInput
          placeholder={"Enter Your Phone Number"}
          text={"Phone Number"}
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1 my-8">
        <label className="text-sm font-medium">
          Address <span className="text-gray-400">(Optional)</span>{" "}
        </label>
        <AuthInput placeholder={"Enter Your Address"} />
      </div>

      <div className="w-36">
        <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
      </div>
    </div>
  );
};

export default Information;
