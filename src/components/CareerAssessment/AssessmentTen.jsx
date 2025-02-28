import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentTen = ({ prevStep, nextStep, formData, setFormData ,carrerQuestion,
  loading,}) => {
  const validationSchema = Yup.object({
    mathGame: Yup.string().required("Please select an option to proceed."),
  });

  const handleMathGame = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("mathGame", true);
    setFieldValue("mathGame", value);
    setFormData({ ...formData, mathGame: value });
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
              <label className="block text-sm font-medium mb-2" htmlFor="skill">
              {loading ? (
                  <span className="text-gray-500">Loading.....</span>
                ) : (
                  carrerQuestion[9]?.question
                )}
              </label>
              <div className="flex md:justify-evenly">
                <button
                  type="button"
                  onClick={() =>
                    handleMathGame("Math", setFieldValue, setFieldTouched)
                  }
                  className={`w-full mx-1 my-2 py-2.5 px-4 text-sm font-semibold rounded-lg ${
                    formData.mathGame === "Math"
                      ? "bg-[#56EC17]"
                      : "bg-[#E9E9E9]"
                  } hover:bg-opacity-85 focus:outline-none`}
                >
                  Math
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleMathGame("Word", setFieldValue, setFieldTouched)
                  }
                  className={`w-full mx-1 my-2 py-2.5 px-4 text-sm font-semibold rounded-lg ${
                    formData.mathGame === "Word"
                      ? "bg-[#56EC17]"
                      : "bg-[#E9E9E9]"
                  } hover:bg-opacity-85 focus:outline-none`}
                >
                  Word
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleMathGame("Strategy", setFieldValue, setFieldTouched)
                  }
                  className={`w-full mx-1 my-2 py-2.5 px-4 text-sm font-semibold rounded-lg ${
                    formData.mathGame === "Strategy"
                      ? "bg-[#56EC17]"
                      : "bg-[#E9E9E9]"
                  } hover:bg-opacity-85 focus:outline-none`}
                >
                  Strategy
                </button>
              </div>
              {errors.mathGame && touched.mathGame && (
                <div className="text-red-500 text-xs italic ">
                  {errors.mathGame}
                </div>
              )}
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
              <p className="text-[10px] font-semibold text-blue-950 pl-1">
                Back
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentTen;
