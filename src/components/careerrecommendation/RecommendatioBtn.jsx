import React from "react";

const RecommendatioBtn = ({
  handleBtnSelect,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  formData,
  optionOne,
  optionTwo,
}) => {
  return (
    <div>
      <div className="flex">
        <button
          type="button"
          onClick={() =>
            handleBtnSelect(optionOne, setFieldValue, setFieldTouched)
          }
          className={`w-full mx-1 my-2 py-2.5 px-4 text-sm font-semibold rounded-lg ${
            formData === optionOne ? "bg-[#56EC17]" : "bg-[#E9E9E9]"
          } hover:bg-opacity-85 focus:outline-none`}
        >
          {optionOne}
        </button>
        <button
          type="button"
          onClick={() =>
            handleBtnSelect(optionTwo, setFieldValue, setFieldTouched)
          }
          className={`w-full mx-1 my-2 py-2.5 px-4 text-sm font-semibold rounded-lg ${
            formData === optionTwo ? "bg-[#56EC17]" : "bg-[#E9E9E9]"
          } hover:bg-opacity-85 focus:outline-none`}
        >
          {optionTwo}
        </button>
      </div>
    </div>
  );
};

export default RecommendatioBtn;
