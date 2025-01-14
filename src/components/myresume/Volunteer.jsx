import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";

const Volunteer = ({ nextStep, setFormData, formData,prevStep }) => {
  const [volunteer, setVolunteer] = useState([
    {
      orgName: "",
      role: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ]);

  // Handle field changes for education
  const handleFieldChange = (index, field, value) => {
    const updatedVolunteer = [...volunteer];
    updatedVolunteer[index][field] = value;
    setVolunteer(updatedVolunteer);
    setFormData({ ...formData, volunteerData: updatedVolunteer });
  };

  // Add new education form
  const addNewVolunteer = () => {
    setVolunteer([
      ...volunteer,
      {
        orgName: "",
        role: "",
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
        <p className="text-[32px] font-medium">Volunteer Experience</p>
        <p className="text-sm">
          Highlight your volunteer work to show dedication to community service
          and a positive impact, demonstrating your commitment to helping
          others.
        </p>
      </div>

      {volunteer.map((education, index) => (
        <div key={index} className="space-y-4  mt-4 ">
          <div className="w-full flex flex-col items-start gap-1 ">
            <AuthInput
              placeholder={"Enter Organization Name"}
              text={"Organization Name"}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-1 ">
            <AuthInput
              placeholder={"Enter Volunteer Role/Title"}
              text={"Volunteer Role/Title"}
            />
          </div>

          <div className="w-full flex gap-4 mt-5">
            <div className="w-1/2">
              <MonthsInput
                label={"Start Year"}
                name="Company"
                id="Company"
                // value={selectedValue}
                // onChange={handleSelectChange}
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium">
                End Year{" "}
                <span className="text-[#9a9a9a] font-normal">
                  (or expected end)
                </span>
              </label>
              <MonthsInput
                name="Company"
                id="Company"
                // value={selectedValue}
                // onChange={handleSelectChange}
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-start gap-1 my-8">
            <label className="text-sm font-medium">
              Description <span className="text-[#b1b1b2]">(Optional)</span>
            </label>
            <textarea
              rows="4"
              name="description"
              className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
              value={education.description}
              placeholder="Highlight relevant skills acquired or the impact you made during the experience."
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className="w-full flex items-center gap-10 mt-5">
        <div className="w-36">
          <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
        </div>
        <button
          onClick={addNewVolunteer}
          className="text-[16px] text-[#012C57] font-[500] leading-[21.6px]"
        >
          Add More
        </button>
      </div>
    </div>
  );
};

export default Volunteer;
