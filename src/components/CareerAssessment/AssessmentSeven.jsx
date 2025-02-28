import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentSeven = ({ prevStep, nextStep, formData, setFormData,carrerQuestion,
  loading, }) => {
  const validationSchema = Yup.object({
    preferScience: Yup.string().required("Please select an option to proceed."),
  });

  const handlePreferScience = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("preferScience", true);
    setFieldValue("preferScience", value);
    setFormData({ ...formData, preferScience: value });
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
                  carrerQuestion[6]?.question
                )}
              </label>
            
              <RecommendatioBtn
                handleBtnSelect={handlePreferScience}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                formData={formData.preferScience}
                optionOne={"Science"}
                optionTwo={"History"}
              />
             <ErrorMessage
                name="preferScience"
                component="div"
                className="text-red-500 text-xs italic "
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

export default AssessmentSeven;
