import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendationCountBtn from "../careerrecommendation/RecommendationCountBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentEleven = ({ prevStep, nextStep, formData, setFormData,carrerQuestion,
  loading, }) => {
  const validationSchema = Yup.object({
    workAlone: Yup.string().required("A rating is required to proceed."),
  });

  const handleWorkAlone = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("workAlone", true);
    setFieldValue("workAlone", value);
    setFormData({ ...formData, workAlone: value });
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
                  carrerQuestion[10]?.question
                )}
              </label>
              <RecommendationCountBtn
                handleCountBtn={handleWorkAlone}
                formData={formData.workAlone}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />

              <ErrorMessage
                name="workAlone"
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

export default AssessmentEleven;
