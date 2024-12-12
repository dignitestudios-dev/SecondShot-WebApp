import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
// import { months } from "../../data/DropDownData";

const Licenses = ({ nextStep, setFormData, formData }) => {
  const [checked, setChecked] = useState(false);
  const [licenses, setLicenses] = useState([
    {
      organizationName: "",
      issuingOrganization: "",
      credentialID: "",
      expirationDate: { month: "", year: "" },
      issueDate: { month: "", year: "" },
    },
  ]);

  // Handle field changes for licenses and certifications
  const handleFieldChange = (index, field, value) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index][field] = value;
    setLicenses(updatedLicenses);
    setFormData({ ...formData, licenses: updatedLicenses });
  };

  // Handle date changes (Expiration Date)
  const handleDateChange = (index, field, type, value) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index][field][type] = value;
    setLicenses(updatedLicenses);
    setFormData({ ...formData, licenses: updatedLicenses });
  };

  // Add new license or certification form
  const addNewLicense = () => {
    setLicenses([
      ...licenses,
      {
        organizationName: "",
        issuingOrganization: "",
        credentialID: "",
        expirationDate: { month: "", year: "" },
        issueDate: { month: "", year: "" },
      },
    ]);
  };

  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]">Licenses & Certifications</p>
        <p className="text-sm">
          List Your Professional Licenses and Certifications, Including Issuing
          Organizations, Dates of Achievement, and Relevant Credentials
        </p>
      </div>

      {licenses.map((license, index) => (
        <div key={index} className="">
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput text={"Name"} placeholder={"Enter your Name"} />
          </div>
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput
              text={"Issuing Organization"}
              placeholder={"Enter your Issuing Organization"}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-1 ">
            <AuthInput
              text={" Credential ID"}
              placeholder={"Enter your Field"}
            />
          </div>
          <div className="flex items-center mt-3 mb-3 ">
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
          <div className="w-full mb-5 flex items-end  gap-4">
            <div className="w-1/2">
              <MonthsInput
                name="Country"
                id="city"
                label={"Expiration Date"}
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
            <div className="w-1/2">
              <MonthsInput
                name="Country"
                id="city"
                label={"Year"}
                // value={selectedValue}
                // onChange={handleSelectChange}
                options={[
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                ]}
              />
            </div>
          </div>
        </div>
      ))}
      <div className=" flex gap-10 items-center mt-8 mb-4">
        <div className="w-36">
          <AuthSubmitBtn text={"Next"} handleSubmit={() => nextStep()} />
        </div>
        <div>
          <button
            onClick={addNewLicense}
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

export default Licenses;
