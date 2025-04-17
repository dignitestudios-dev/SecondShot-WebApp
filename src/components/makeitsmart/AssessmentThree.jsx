import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Stars } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";

const AssessmentThree = ({ nextStep, formData, setFormData, setStep }) => {
  const validationSchema = Yup.object({
    achievable: Yup.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
    achievableedit: Yup.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
   
  });

  return (
    <div>
      <Formik
        initialValues={{
          achievable: formData.achievable || formData.measureedit ? formData.measureedit : formData.specificedit 
          || formData.specificedit ?formData.specificedit : formData.specific,
          achievableedit: formData.achievableedit, // Prefill with formData.measure
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData({
            ...formData,
            achievable: values.achievable,
            achievableedit: values.achievableedit,
          });
          nextStep(); // Proceed to the next step
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="achievable"
              >
                Achievable
              </label>
              <p className="text-[14px] text-[#000000] font-[400] w-[503px]">
                When something is achievable, it means it’s something you can
                do. It’s like setting a goal that’s just right—not too easy but
                not too hard. Here’s how to check if a goal is achievable if it
                answers the following questions:
              </p>
              <div className="flex items-center gap-4 mt-3 mb-3">
                {[
                  "Do I have what I need to do this?",
                  "Do I have what I need to do this?",
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
                  Is it too big or too small?
                </span>
              </div>
              <Field
                as="input"
                id="achievable"
                name="achievable"
                value={values.achievable}
                placeholder="Describe Here"
                onChange={(e) => {
                  // Ensure user can edit the field freely
                  setFieldValue("achievable", e.target.value); // Update the achievable field value
                }}
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.achievable && touched.achievable
                       ? "border-red-500"
                       : ""
                   }`}
                maxLength="250"
                disabled
              />
              <ErrorMessage
                name="achievable"
                component="div"
                className="text-red-500 text-xs italic"
              />
              <div className="mt-3">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="specific"
                >
                  Make it Achievable
                </label>

                <Field
                  as="input"
                  id="achievableedit"
                  name="achievableedit"
                  value={values.achievableedit}
                  placeholder="Revise Goal Here"
                  onChange={(e) => {
                    // Ensure user can edit the field freely
                    setFieldValue("achievableedit", e.target.value); // Update the achievable field value
                  }}
                  className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.achievableedit && touched.achievableedit
                       ? "border-red-500"
                       : ""
                   }`}
                  maxLength="250"
                />
                <ErrorMessage
                  name="achievableedit"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            <div className="flex justify-center pt-4 gap-3 " >
            <div className="w-[343px]">
              <button
              
              onClick={() => {
                console.log("Before Skip:", formData);
              
                setFormData((prev) => ({
                  ...prev,
                  achievableedit: "", 
                }));
              
                console.log("After Skip:", formData); 
                nextStep();
              }}
              
                className="w-full text-[#012C57] h-[49px] bg-gray-300  p-3 text-center rounded-[12px] font-[500] leading-[21.6px] text-[16px]"
              >
                Skip
              </button>
            </div>
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
                  <div onClick={() => setStep(2)}>BACK</div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentThree;
