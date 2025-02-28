import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendationCountBtn from "../careerrecommendation/RecommendationCountBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentSeventeen = ({ prevStep, nextStep, formData, setFormData ,carrerQuestion,
  loading,}) => {
  const validationSchema = Yup.object({
    teamWork: Yup.string().required("A rating is required to proceed."),
  });

  const handleTeamWork = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("teamWork", true);
    setFieldValue("teamWork", value);
    setFormData({ ...formData, teamWork: value });
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
                  carrerQuestion[16]?.question
                )}
              </label>
              <RecommendationCountBtn
                handleCountBtn={handleTeamWork}
                formData={formData.teamWork}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <ErrorMessage
                name="teamWork"
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

export default AssessmentSeventeen;
