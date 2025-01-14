import React from "react";
import SkillsInputField from "./SkillsInputField";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";

const Skills = ({ nextStep, setFormData, formData,prevStep }) => {
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="pt-6 px-3">
        <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
              <div>
                <IoIosArrowBack className="font-[600]" onClick={prevStep} />
              </div>
              <div onClick={prevStep}>BACK</div>
            </div>
      <div className="my-6">
        <p className="text-[24px] font-[500]">Soft Skills</p>
        <p className="text-[16px] leading-[21.6px] w-[422px] ">
        Add personal qualities like communication, teamwork, and problem-solving.
        </p>
      </div>
      <SkillsInputField
        selectedSkills={formData.transferableSkills || []}
        setFormData={setFormData}
        formData={formData}
      />
      <hr className="my-6" />
      <div className="">
        <p className="text-[24px] font-[500]">Technical Skills</p>
        <p className="text-[16px] leading-[21.6px] w-[422px] ">
          Add job-specific abilities such as coding, data analysis, or using
          specialized tools.
        </p>
        <div className="w-full flex flex-col items-start gap-1 my-8">
          <AuthInput placeholder={"Technical Skills"} />
        </div>
        <div className="w-full flex flex-col items-start mt-8 mb-4">
          <div className="w-36">
            <AuthSubmitBtn text={"Next"} handleSubmit={()=>nextStep()} />
          </div>
        </div>
        <div>
          <button
            onClick={nextStep}
            className="text-[16px] text-[#000000] font-[600] mt-3 "
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
