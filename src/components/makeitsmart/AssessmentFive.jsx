import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Stars } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AssessmentFive = ({ nextStep, formData, setFormData, setStep }) => {
  const validationSchema = Yup.object({
    timebound: Yup.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
  });
  // const [isSmart, setIsSmart] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          timebound: formData.relevant ? formData.relevant + " " : "", 
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData(values);
          navigate("/create-goals", {
            state: {
              isSmart: true,
              lastStep: values,
            },
          });
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="timebound"
              >
                Time-Bound
              </label>
              <p className="text-[14px] text-[#000000] font-[400] w-[503px]">
                When a goal is time-bound, it means you give yourself a deadline
                or a specific time to finish it.
              </p>
              <div className="flex items-center gap-4 mt-3 mb-3">
                {[
                  "What’s my deadline?",
                  "How long will I work on this each day?",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={Stars}
                      className="w-[15.89px] h-[12.93px]"
                      alt=""
                    />
                    <span className="text-[14px] leading-[18.9px] text-[#012C57] font-[500]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center mb-3">
                <img src={Stars} className="w-[15.89px] h-[12.93px]" alt="" />
                <span className="text-[14px] leading-[18.9px] text-[#012C57] font-[500]">
                  When do I want to finish?
                </span>
              </div>
              <Field
                as="input"
                id="timebound"
                name="timebound"
                placeholder="Describe Here"
                value={values.timebound}
                onChange={(e) => {
                  const updatedValue = e.target.value;
                  setFieldValue(
                    "timebound",
                    formData.relevant +
                      updatedValue.slice(formData.relevant.length)
                  );
                }}
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                  bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.timebound && touched.timebound
                      ? "border-red-500"
                      : ""
                  }`}
              />
              <ErrorMessage
                name="timebound"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex justify-center pt-4">
              <div className="w-[343px]">
                <AuthSubmitBtn text={"Next"} type={"submit"} />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div>
                <div
                  className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer"
                  onClick={() => setStep(4)}
                >
                  <IoIosArrowBack className="font-[600]" />
                  <span>BACK</span>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentFive;
