import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";

const AssessmentTwentyOne = ({ prevStep, nextStep, formData, setFormData,carrerQuestion,
  loading, }) => {
  const validationSchema = Yup.object({
    keepTrying: Yup.string().required("Please select an option to proceed."),
  });

  const handleKeepTrying = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("keepTrying", true);
    setFieldValue("keepTrying", value);
    setFormData({ ...formData, keepTrying: value });
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
                  carrerQuestion[20]?.question
                )}

              </label>
              <RecommendatioBtn
                handleBtnSelect={handleKeepTrying}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                formData={formData.keepTrying}
                optionOne={"Keep trying"}
                optionTwo={" Try something else"}
              />
              <ErrorMessage
                name="keepTrying"
                component="div"
                className="text-red-500 text-xs italic "
              />
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-[60%] bg-gradient-to-r from-[#061523] to-[#012C57] text-white text-xs font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
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

export default AssessmentTwentyOne;
