import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const Honors = ({ nextStep, setFormData, formData }) => {
  const [honor, setHonor] = useState([
    {
      Name: "",
      issuer: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ]);

  // Handle field changes for education
  const handleFieldChange = (index, field, value) => {
    const updatedHonor = [...honor];
    updatedHonor[index][field] = value;
    setHonor(updatedHonor);
    setFormData({ ...formData, honorData: updatedHonor });
  };

  // Add new education form
  const addNewHonor = () => {
    setHonor([
      ...honor,
      {
        Name: "",
        issuer: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]">Honors & Awards</p>
        <p className="text-[16px] font-[400] ">
          Highlight your recognition and awards to showcase your achievements,
          distinguish your expertise, and demonstrate your professional
          excellence.
        </p>
      </div>

      {honor.map((education, index) => (
        <div key={index} className="space-y-4 mt-4">
          <div className="w-full flex flex-col items-start gap-1">
            <AuthInput
              text={"Award Name"}
              placeholder={
                "Enter Award Name (e.g., Employee of the Year, Academic Excellence Award)"
              }
            />
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <AuthInput
              text={"Awarding Organization or Institution"}
              placeholder={"ABC Company"}
            />
          </div>

          <div className="w-full flex items-end gap-4 mt-4">
            <div className="w-1/2">
              <div className="">
                <MonthsInput
                  label={"Date Received"}
                  name="Company"
                  id="Company"
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
            </div>
            <div className="w-1/2">
              <div className="">
                <MonthsInput
                  name="Company"
                  id="Company"
                  // value={selectedValue}
                  // onChange={handleSelectChange}
                  options={[
                    { value: "2021", label: "2021" },
                    { value: "2022", label: "2022" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start gap-1 my-8">
            <label className="text-sm font-medium">Description <span className="text-[#b1b1b2]" >(Optional)</span> </label>
            <textarea
              rows="4"
              name="description"
              className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
              value={education.description}
              placeholder="A brief description of the award, highlighting its significance, criteria, or relevance to your field (e.g., 'Awarded to the top 5% of students for academic excellence')."
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className=" flex gap-10 items-center mt-8 mb-4">
        <div className="w-36">
          <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
        </div>
        <button
          onClick={addNewHonor}
          className="text-[16px] text-[#012C57] font-[500] leading-[21.6px]"
        >
          Add More
        </button>
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

export default Honors;
