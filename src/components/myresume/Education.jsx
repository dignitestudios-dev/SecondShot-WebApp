import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";

const Education = ({ nextStep, setFormData, formData,prevStep }) => {
  const [educations, setEducations] = useState([
    {
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ]);

  // Handle field changes for education
  const handleFieldChange = (index, field, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
    setFormData({ ...formData, education: updatedEducations });
  };

  // Add new education form
  const addNewEducation = () => {
    setEducations([
      ...educations,
      {
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  return (
    <div className="pt-6 px-3">
        <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
              <div>
                <IoIosArrowBack className="font-[600]" onClick={prevStep} />
              </div>
              <div onClick={prevStep}>BACK</div>
            </div>
      <div>
        <p className="text-[32px] font-[500]">Education</p>
        <p className="text-sm">List your degrees you have earned.</p>
      </div>
      {educations.map((education, index) => (
        <div key={index} className="">
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput
              text={"Educational Institution "}
              placeholder={"Enter  Educational Institution"}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput text={"Degree "} placeholder={"Enter your degree"} />
          </div>
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput
              text={"Field of Study"}
              placeholder={"Enter your Field of Study"}
            />
          </div>
          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <MonthsInput
                label={"Start Year"}
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
            <div className="w-1/2 mb-5">
              <label className="text-sm font-medium">
                End Year{" "}
                <span className="text-[#9a9a9a] font-normal">
                  (or expected end)
                </span>
              </label>
              <MonthsInput
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
          </div>
          {/* Description */}
          {/* <div className="w-full flex flex-col items-start gap-1 my-8">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows="4"
              name="description"
              className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
              value={education.description}
              placeholder="Describe your achievements or relevant coursework"
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />
          </div> */}
        </div>
      ))}

      {/* Buttons: Add More and Next */}
      <div className=" flex items-center gap-10">
        <div className="w-36">
          <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
        </div>
        <div>
          <button
            onClick={addNewEducation}
            className="text-[16px] text-[#012C57] font-[500] leading-[21.6px]"
          >
            Add More
          </button>
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
  );
};

export default Education;
