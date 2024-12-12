import React from "react";

const RecommendationCountBtn = ({
  formData,
  handleCountBtn,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
}) => {
  return (
    <div>
      <div className="flex md:justify-evenly">
        {["1", "2", "3", "4", "5"]?.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() =>
              handleCountBtn(value, setFieldValue, setFieldTouched)
            }
            className={`w-full mx-1 my-2 py-2.5 px-4 text-sm font-semibold rounded-lg ${
              formData === value ? "bg-[#56EC17]" : "bg-[#E9E9E9]"
            } hover:bg-opacity-85 focus:outline-none`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCountBtn;
