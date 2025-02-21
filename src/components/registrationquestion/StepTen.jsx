import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import { useNavigate } from "react-router-dom";

const StepTen = ({ handleRegistration, prevStep, formData, setFormData,loading }) => {

  const validationSchema = Yup.object({
    desireCareer: Yup.string().required("This field cannot be left empty."),
  });

  const handleDesireCareer = (value, setFieldValue, setFieldTouched) => {
    setFieldValue("desireCareer", value);
    setFormData({ ...formData, desireCareer: value });
    setFieldTouched("desireCareer", true);
  };
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleRegistration}
    >
      {({ errors, touched, setFieldValue, setFieldTouched }) => (
        <Form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="desireCareer"
            >
              Please list your desired career.
            </label>
            <Field
              placeholder="Describe Here"
              as="textarea"
              id="desireCareer"
              name="desireCareer"
              rows="4"
              onBlur={(e) =>
                handleDesireCareer(
                  e.target.value,
                  setFieldValue,
                  setFieldTouched
                )
              }

              maxLength="250" 
              className={`border border-gray-400 rounded-xl w-full py-2 px-3 bg-transparent text-gray-700
                    text-sm leading-tight placeholder-gray-900 focus:outline-none focus:shadow-outline ${
                      errors.desireCareer && touched.desireCareer
                        ? "border-red-500"
                        : ""
                    }`}
            />
            <ErrorMessage
              name="desireCareer"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className="flex justify-center pt-4">
            <div className="w-[343px]">
              <AuthSubmitBtn
                text={"Next"}
                type={"submit"} 
                loading={loading}
                // handleSubmit={() => navigate("/congrats-message")}
              />
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

export default StepTen;
