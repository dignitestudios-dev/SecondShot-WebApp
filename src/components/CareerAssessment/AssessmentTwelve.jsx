import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";

const AssessmentTwelve = ({ prevStep, nextStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    buildPlan: Yup.string().required("Please select an option to proceed."),
  });

  const handleBuildPlan = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("buildPlan", true);
    setFieldValue("buildPlan", value);
    setFormData({ ...formData, buildPlan: value });
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
                Would you rather build the plan or execute the plan?
              </label>
              <RecommendatioBtn
                handleBtnSelect={handleBuildPlan}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                formData={formData.buildPlan}
                optionOne={"Build"}
                optionTwo={"Execute"}
              />
              <ErrorMessage
                name="buildPlan"
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

export default AssessmentTwelve;
