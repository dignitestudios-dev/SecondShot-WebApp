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
        <p className="text-[16px] leading-[21.6px] text-[#000000] font-[400] mt-3 ">
          Craft Your Comprehensive Personal Profile to Highlight Your Skills,
          Experience, and Achievements
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
          placeholder="Describe your Self"
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
