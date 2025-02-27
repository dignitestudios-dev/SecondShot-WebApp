import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendationCountBtn from "../careerrecommendation/RecommendationCountBtn";

function AssessmentEighteen({ prevStep, nextStep, formData, setFormData,carrerQuestion,
  loading, }) {
  const validationSchema = Yup.object({
    teachOthers: Yup.string().required("A rating is required to proceed."),
  });

  const handleTeachOthers = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("teachOthers", true);
    setFieldValue("teachOthers", value);
    setFormData({ ...formData, teachOthers: value });
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
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="skill"
              >
             {loading ? (
                  <span className="text-gray-500">Loading.....</span>
                ) : (
                  carrerQuestion[17]?.question
                )}
              </label>
              <RecommendationCountBtn
                handleCountBtn={handleTeachOthers}
                formData={formData.teachOthers}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <ErrorMessage
                name="teachOthers"
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
}

export default AssessmentEighteen;
