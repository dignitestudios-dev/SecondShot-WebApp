import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendationCountBtn from "../careerrecommendation/RecommendationCountBtn";

const AssessmentTwentyThree = ({
  prevStep,
  nextStep,
  formData,
  setFormData,
}) => {
  const validationSchema = Yup.object({
    spotLight: Yup.string().required("A rating is required to proceed."),
  });

  const handleSpotLight = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("spotLight", true);
    setFieldValue("spotLight", value);
    setFormData({ ...formData, spotLight: value });
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
                On a scale of 1-5, how comfortable are you being in the
                spotlight? (1 being not comfortable, 5 being very comfortable)
              </label>
              <RecommendationCountBtn
                handleCountBtn={handleSpotLight}
                formData={formData.spotLight}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <ErrorMessage
                name="spotLight"
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

export default AssessmentTwentyThree;
