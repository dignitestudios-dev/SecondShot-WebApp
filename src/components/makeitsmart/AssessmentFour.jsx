import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Stars } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";

const AssessmentFour = ({ nextStep, formData, setFormData, setStep }) => {
  const validationSchema = Yup.object({
    relevant: Yup.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
  });

  return (
    <div>
      <Formik
        initialValues={{
          relevant:formData.relevant || formData.achievable || "", // Prefill with formData.achievable
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData((prevData) => ({
            ...prevData,
            relevant: values.relevant, // Update the 'relevant' field in formData
          }));
          nextStep(); // Proceed to the next step
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="relevant">
                Relevant
              </label>
              <p className="text-[14px] text-[#000000] font-[400] w-[503px]">
                When a goal is relevant, it means it’s important to you and fits
                with what you want in life.
              </p>
              <div className="flex items-center gap-4 mt-3 mb-3">
                {[
                  "Can I really do this with what I have?",
                  "Is this something I can work on now?",
                ]?.map((item, index) => (
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
                  Does this goal fit into my life right now?
                </span>
              </div>
              <Field
                as="input"
                id="relevant"
                name="relevant"
                placeholder="Describe Here"
                value={values.relevant}
                onChange={(e) => {
                  // Ensure user can edit the field freely
                  setFieldValue("relevant", e.target.value); // Update the achievable field value
                }}
              
              
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.relevant && touched.relevant
                       ? "border-red-500"
                       : ""
                   }`}
                   maxLength="250" 
              />
              <ErrorMessage
                name="relevant"
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
                <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
                  <div>
                    <IoIosArrowBack className="font-[600]" />
                  </div>
                  <div onClick={() => setStep(3)}>BACK</div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentFour;
