import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Stars } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import Backbutton from "../Global/Backbutton";

const AssessmentOne = ({ nextStep, formData, setFormData,showModal }) => {
  const validationSchema = Yup?.object({
    specific: Yup?.string().required("Please respond before moving forward to proceed with the next step."),
  });

  return (
    <div>
      <Formik
        initialValues={{
          specific: formData.specific || "", 
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData(values);
          nextStep();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="specific"
              >
                Specific
              </label>
              <p className=" text-[14px] text-[#000000] font-[400] w-[503px] ">
                When a goal is specific, it's like drawing a clear picture in
                your mind of what you want to do. You can make your goal
                specific by answering the following questions:
              </p>
              <div className="flex items-center gap-4 mt-3 mb-3">
                {[
                  "What do I want to do?",
                  "Why do I want to do it?",
                  "How will I do it?",
                ]?.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={Stars}
                      className="w-[15.89px] h-[12.93px] "
                      alt=""
                    />
                    <span className="text-[14px] leading-[18.9px] text-[#012C57] font-[500] ">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Field
                as="input"
                id="specific"
                name="specific"
                placeholder="Describe Here"
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.specific && touched.specific ? "border-red-500" : ""
                   }`}
              />
              <ErrorMessage
                name="specific"
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
              <Backbutton  />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentOne;
