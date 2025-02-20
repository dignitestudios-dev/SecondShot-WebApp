import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";

const StepNine = ({ nextStep, prevStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    jobValue: Yup.string().required("Please select an option to proceed."),

    jobTitle: Yup.string().test(
      "job-title-validation", // Custom test name
      "Please provide the job title of your most recent position.", // Custom error message
      function (value) {
        const { jobValue } = this.parent; // Access other fields (e.g., jobValue)
        // If jobValue is "Yes", jobTitle is required
        if (jobValue === "Yes" && (!value || value.trim() === "")) {
          return false; // Fails validation if jobTitle is empty
        }
        return true; // Passes validation otherwise
      }
    ),
  });

  const handleJobValue = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("jobValue", true);
    setFieldValue("jobValue", value);
    setFormData({ ...formData, jobValue: value });
  };

  const handleJobTitle = (value, setFieldValue, setFieldTouched) => {
    setFieldValue("jobTitle", value);
    setFormData({ ...formData, jobTitle: value });
    setFieldTouched("jobTitle", true);
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
              className="block text-sm font-medium mb-2"
              htmlFor="jobValue"
            >
              Do you have prior work experience?
            </label>
            <RecommendatioBtn
              handleBtnSelect={handleJobValue}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              formData={formData?.jobValue}
              optionOne={"Yes"}
              optionTwo={"No"}
            />
            <ErrorMessage
              name="jobValue"
              component="div"
              className="text-red-500 text-xs italic "
            />
          </div>
          {formData?.jobValue === "Yes" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="highestDegree"
              >
                Please provide the job title of your most recent position.
              </label>
              <Field
                placeholder="Enter your job title"
                id="jobTitle"
                name="jobTitle"
                onBlur={(e) =>
                  handleJobTitle(e.target.value, setFieldValue, setFieldTouched)
                }
                className={`border border-gray-400 rounded-lg w-full h-[49px] py-2 px-3 bg-transparent placeholder-gray-900
                       text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline ${
                         errors.jobTitle && touched.jobTitle
                           ? "border-red-500"
                           : ""
                       }`}
              />
              <ErrorMessage
                name="jobTitle"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
          )}
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

export default StepNine;
