import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";
const StepThree = ({ nextStep, prevStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    ageValue: Yup.string().required("Please select an option to proceed."),
  });

  const handleAgeValue = (value, setFieldValue, setFieldTouched) => {
    // Save the selected value to formData state
    setFieldTouched("ageValue", true);
    setFieldValue("ageValue", value);
    setFormData({ ...formData, ageValue: value });

    // Log the selected value (optional)
    console.log("Selected value:", value);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted Age Value:", values.ageValue);
        nextStep(values);
      }}
    >
      {({ errors, touched, setFieldValue, setFieldTouched }) => (
        <Form>
          <div className="mb-4">
            <label
              className="block text-[14px] font-[500] leading-[17.85px] mb-0"
              htmlFor="ageValue"
            >
              Are you 18 years or older?
            </label>
            <RecommendatioBtn
              handleBtnSelect={handleAgeValue}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              formData={formData.ageValue}
              optionOne={"Yes "}
              optionTwo={"No"}
            />

            <ErrorMessage
              name="ageValue"
              component="div"
              className="text-red-500 text-xs italic "
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

export default StepThree;
