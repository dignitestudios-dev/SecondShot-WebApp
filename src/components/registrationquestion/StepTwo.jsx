import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BackBtn from "../onboarding/BackBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const StepTwo = ({ nextStep, prevStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    highestDegree: Yup.string().required("This field cannot be left empty"),
  });

  const handleHighestDegreeValue = (value, setFieldValue, setFieldTouched) => {
    setFieldValue("highestDegree", value);
    setFormData({ ...formData, highestDegree: value });
    setFieldTouched("highestDegree", true);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={() => nextStep()}
    >
      {({ errors, touched, setFieldValue, setFieldTouched }) => (
        <Form>
          <div className="mb-4">
            <label
              className="block text-[14px] font-[500] leading-[17.85px] mb-1"
              htmlFor="highestDegree"
            >
              What is your highest level of degree completion?
            </label>
            <Field
              as="textarea"
              id="highestDegree"
              name="highestDegree"
              placeholder="Describe Here"
              rows="4"
              maxLength="250"
              onBlur={(e) =>
                handleHighestDegreeValue(
                  e.target.value,
                  setFieldValue,
                  setFieldTouched
                )
              }
              className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.highestDegree && touched.highestDegree
                       ? "border-red-500"
                       : ""
                   }`}
            />
            <ErrorMessage
              name="highestDegree"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className="flex justify-center pt-4">
            <div className="w-[343px]">
              <AuthSubmitBtn text={"Next"} type={"submit"} />
            </div>
          </div>
          <div className="mt-4">
            <BackBtn handleClick={() => prevStep()} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepTwo;
