import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
// import { months } from "../../data/DropDownData";

const Experience = ({ nextStep, setFormData, formData }) => {
  const [checked, setChecked] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      jobTitle: "",
      company: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrent: false,
      description: "",
    },
  ]);

  const handleFieldChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
    setFormData({ ...formData, experience: updatedExperiences });
  };

  // Add new experience form
  const addNewExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        company: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        isCurrent: false,
        description: "",
      },
    ]);
  };

  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]">Professional Experience
        </p>
        <p className="text-sm  ">
          Narrate your professional endeavours and milestones to showcase your
          skills, achievements, and career progress.
        </p>
      </div>

      {experiences?.map((experience, index) => (
        <div key={index} className="">
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput placeholder={"Enter Job Title"} text={"Job Title"} />
          </div>
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput placeholder={"Enter Company Name"} text={"Company"} />
          </div>

          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <MonthsInput
                name="Country"
                id="city"
                label={"Start date"}
                // value={selectedValue}
                // onChange={handleSelectChange}
                options={[
                  { value: "January", label: "January" },
                  { value: "February", label: "February" },
                  { value: "March", label: "March" },
                  { value: "April", label: "April" },
                  { value: "May", label: "May" },
                  { value: "June", label: "June" },
                  { value: "July", label: "July" },
                  { value: "August", label: "August" },
                  { value: "September", label: "September" },
                  { value: "October", label: "October" },
                  { value: "November", label: "November" },
                  { value: "December", label: "December" },
                ]}
              />
            </div>
            <div className="w-1/2 mt-6">
              <MonthsInput
                name="Year"
                id="city"
                // value={selectedValue}
                // onChange={handleSelectChange}
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center my-2">
              <input
                type="checkbox"
                id="some_id"
                checked={checked}
                value={checked}
                onChange={(e) => setChecked((prev) => !prev)}
                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-sm checked:bg-blue-900 
    checked:border-transparent focus:outline-none transition duration-300 ease-in-out relative"
              />
              <label htmlFor="some_id" className="ml-2 text-gray-600">
                I am currently in this role
              </label>

              <style jsx>{`
                input[type="checkbox"]:checked::before {
                  content: "\\2714";
                  color: white;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  font-size: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                }
              `}</style>
            </div>
          </div>
          {/* End Date */}
          {!checked && (
            <div className="w-full flex gap-4 mt-4">
              <div className="w-1/2">
                <MonthsInput
                  label={"End Date"}
                  name="Year"
                  id="city"
                  // value={selectedValue}
                  // onChange={handleSelectChange}
                  options={[
                    { value: "January", label: "January" },
                    { value: "February", label: "February" },
                    { value: "March", label: "March" },
                    { value: "April", label: "April" },
                    { value: "May", label: "May" },
                    { value: "June", label: "June" },
                    { value: "July", label: "July" },
                    { value: "August", label: "August" },
                    { value: "September", label: "September" },
                    { value: "October", label: "October" },
                    { value: "November", label: "November" },
                    { value: "December", label: "December" },
                  ]}
                />
              </div>
              <div className="w-1/2 mt-6">
                <MonthsInput
                  name="Year"
                  id="city"
                  // value={selectedValue}
                  // onChange={handleSelectChange}
                  options={[
                    { value: "2023", label: "2023" },
                    { value: "2024", label: "2024" },
                  ]}
                />
              </div>
            </div>
          )}

          <div className="w-full flex flex-col items-start gap-1 my-8">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows="4"
              name="description"
              className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
              value={experience.description}
              placeholder="Describe your role"
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-10">
        <div className="w-36  ">
          <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
        </div>
        <div>
          <button
            onClick={addNewExperience}
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

export default Experience;
