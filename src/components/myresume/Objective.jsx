import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const Objective = ({ nextStep, setFormData, formData }) => {
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]"> Objective</p>
        <p className="text-[14px] leading-[21.6px] text-[#000000] font-[400] mt-3 ">
          Writing an objective on a resume is a great way to quickly communicate
          your career goals and how you can contribute to the job you're
          applying for. Keep in mind you can change this for each job that you
          are applying for.
        </p>
        <p className="text-[18px] font-[500] mt-3">
          {" "}
          Keep It Short and Focused
        </p>
        <p className="text-[14px] leading-[21.6px] text-[#000000] font-[400]  ">
          Your resume objective should be brief—about 1-2 sentences long. It
          should clearly state what position you’re aiming for and how you can
          add value to the company.
        </p>
      </div>
      <div className="w-full flex flex-col items-start gap-1 my-8 pr-12">
        <label className="text-[14px] leading-[17.85px] font-[500] text-[#181818] ">
          Description
        </label>
        <textarea
          rows="8"
          name="objective"
          type="text"
          className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
          value={formData.objective}
          placeholder="e.g. Seeking a marketing coordinator position where I can apply my content creation and social media skills to drive brand growth and engagement."
          onChange={(e) => handleFieldChange("objective", e.target.value)}
        />
      </div>
      <div className="w-36">
        <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
      </div>
    </div>
  );
};

export default Objective;
