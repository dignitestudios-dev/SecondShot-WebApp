import React, { useState } from "react";
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
  const [tagsError, setTagsError] = useState(false);
  const [ageValue, SetageValue] = useState("");

 
  const handleAgeValue = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("ageValue", true);
    setFieldValue("ageValue", value);
    setFormData({ ...formData, ageValue: value });
    SetageValue(value);
  
  };
  const handleSubmit = (values) => {
    if (values?.ageValue === "No") {
      nextStep(true);
    } else {
      nextStep();
    }
  };
  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
              errors={errors.ageValue}
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
            <BackBtn handleClick={() => prevStep(true)} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepThree;
