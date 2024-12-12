import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const Information = ({ nextStep, setFormData, formData }) => {
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-medium"> Personal Information</p>
        <p className="text-sm ">
          We’ve collected your basic from the sign-up. If you’d like to make any
          changes, feel free to do so.
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
