import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentFive = ({
  prevStep,
  nextStep,
  formData,
  setFormData,
  carrerQuestion,
  loading,
  selectedLabels,
  setSelectedLabels
}) => {
  const validationSchema = Yup.object({
    topSkill: Yup.string().required("Please select an option to proceed."),
  });

  const options = [
    { label: "Leadership", value: "leaderShip" },
    { label: "Communication", value: "communication" },
    { label: "Strategy", value: "strategy" },
    { label: "Hard-work", value: "hard-work" },
    { label: "Team-work", value: "team-work" },
  ];

  const [isOpen, setIsOpen] = useState(false);
// for visual selection

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option, setFieldValue, setFieldTouched) => {
    setFieldTouched("topSkill", true);

    let updatedSelection = [...selectedLabels];

    if (updatedSelection.includes(option.label)) {
      updatedSelection = updatedSelection.filter((label) => label !== option.label);
    } else if (updatedSelection.length < 2) {
      updatedSelection.push(option.label);
    }

    setSelectedLabels(updatedSelection);

    // Save only first selected value to Formik
    if (updatedSelection.length > 0) {
      const selectedValue = options.find(opt => opt.label === updatedSelection[0])?.value || "";
      setFormData({ ...formData, topSkill: selectedValue });
      setFieldValue("topSkill", selectedValue);
    } else {
      setFormData({ ...formData, topSkill: "" });
      setFieldValue("topSkill", "");
    }
  };

  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={nextStep}
      >
        {({ errors, touched, setFieldValue, setFieldTouched }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="topSkill">
                {loading ? (
                  <span className="text-gray-500">Loading.....</span>
                ) : (
                  carrerQuestion[4]?.question
                )}
              </label>

              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className={`border flex justify-between px-4 py-2 rounded cursor-pointer bg-white ${
                    errors.topSkill && touched.topSkill ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {selectedLabels.length > 0
                    ? selectedLabels.join(", ")
                    : "Select up to 2 skills"}
                    <div>
                    <svg
            className={`w-5 h-5 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
                    </div>
                </div>
                {isOpen && (
  <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded shadow z-10 max-h-40 overflow-y-auto">
    {options.map((option) => {
      const isSelected = selectedLabels.includes(option.label);
      return (
        <div
          key={option.value}
          onClick={() =>
            handleOptionClick(option, setFieldValue, setFieldTouched)
          }
          className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${
            isSelected ? "bg-blue-200 font-semibold" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className="mr-2"
          />
          {option.label}
        </div>
      );
    })}
  </div>
)}

              </div>

              <ErrorMessage
                name="topSkill"
                component="div"
                className="text-red-500 text-xs italic mt-1"
              />
            </div>

            <div className="flex justify-center pt-4">
              <div className="w-[60%]">
                <AuthSubmitBtn text={"Next"} type={"submit"} />
              </div>
            </div>

            <div
              onClick={prevStep}
              className="mt-2 w-full flex justify-center items-center cursor-pointer"
            >
              <IoIosArrowDropleftCircle />
              <p className="text-[10px] font-semibold text-blue-950 pl-1">Back</p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentFive;
