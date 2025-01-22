import React from "react";

const RecommendationDropdown = ({
  options,
  isOpen,
  handleOptionClick,
  setIsOpen,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  formData
}) => {
  return (
    <div>
      <div className="relative w-full  ">
        <div
          className={`border ${
            errors && touched
              ? "border-red-500"
              : "border-gray-300"
          } bg-transparent py-2 px-3 rounded-lg cursor-pointer flex justify-between items-center`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {formData
              ? options.find((option) => option.value === formData)
                  ?.label
              : "Select your answer"}
          </span>
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
        {isOpen && (
          <ul className="absolute z-10 w-full h-[150px] overflow-auto bg-gray-50 border border-gray-300 rounded-lg mt-2">
            {options.map((option) => (
              <React.Fragment key={option.value}>
                <li
                  className="flex justify-between items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleOptionClick(
                      option.value,
                      setFieldValue,
                      setFieldTouched
                    );
                  }}
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="custom-select"
                    className="form-radio h-4 w-4 text-blue-900"
                    checked={formData === option.value}
                    readOnly
                  />
                </li>
                <hr className="py-px" />
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecommendationDropdown;
