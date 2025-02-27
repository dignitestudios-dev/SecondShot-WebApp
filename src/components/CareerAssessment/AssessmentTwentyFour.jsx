import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendationCountBtn from "../careerrecommendation/RecommendationCountBtn";

const AssessmentTwentyFour = ({
  prevStep,
  handleAssessmentForm,
  formData,
  setFormData,
  carrerQuestion,
  loading,
}) => {
  const validationSchema = Yup.object({
    creative: Yup.string().required("A rating is required to proceed."),
  });
console.log(formData,"formDataCarrer")
  const handleCreative = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("creative", true);
    setFieldValue("creative", value);
    setFormData({ ...formData, creative: value });
  };

  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleAssessmentForm}
      >
        {({ errors, touched, setFieldValue, setFieldTouched }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="skill">
              {loading ? (
                  <span className="text-gray-500">Loading.....</span>
                ) : (
                  carrerQuestion[23]?.question
                )}
              </label>
              <RecommendationCountBtn
                handleCountBtn={handleCreative}
                formData={formData.creative}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <ErrorMessage
                name="creative"
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

export default AssessmentTwentyFour;
