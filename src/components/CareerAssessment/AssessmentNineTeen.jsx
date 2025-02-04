import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";

const AssessmentNineTeen = ({ prevStep, nextStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    physicalChallenge: Yup.string().required(
      "Please select an option to proceed."
    ),
  });

  const handlePhysicalChallenge = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("physicalChallenge", true);
    setFieldValue("physicalChallenge", value);
    setFormData({ ...formData, physicalChallenge: value });
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
                Do you prefer physical challenges or mental challenges?
              </label>
              <RecommendatioBtn
                handleBtnSelect={handlePhysicalChallenge}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                formData={formData.physicalChallenge}
                optionOne={"Physical challenge"}
                optionTwo={"Mental challenge"}
              />
              <ErrorMessage
                name="physicalChallenge"
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

export default AssessmentNineTeen;
