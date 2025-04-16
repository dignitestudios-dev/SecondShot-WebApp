import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Stars } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import Backbutton from "../Global/Backbutton";
import { IoIosArrowBack } from "react-icons/io";

const AssessmentTwo = ({ nextStep, formData, setFormData, setStep }) => {
  console.log(formData, "formData");

  const validationSchema = Yup.object({
    measure: Yup.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
  
  });
console.log(formData.specific)
  return (
    <div>
      <Formik
        initialValues={{
          measure: formData.measure ||formData.specificedit ? formData.specificedit : formData.specific || "",
          measureedit: formData.measureedit || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData({
            ...formData,
            measure: values.measure,
            measureedit: values.measureedit,
          });

          nextStep(); // Proceed to the next step
        }}
      >
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="measure"
              >
                Measurable
              </label>
              <p className="text-[14px] text-[#000000] font-[400] w-[503px]">
                When something is measurable, it means you can count or track it
                to see how well you’re doing. You can make your goal measurable
                by answering the following questions:
              </p>
              <div className="flex items-center gap-4 mt-3 mb-3">
                {["How much?", "How many?", "How will I know I did it?"].map(
                  (item, index) => (
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
                  )
                )}
              </div>
              <Field
                as="input"
                id="measure"
                name="measure"
                value={values.measure}
                onChange={(e) => {
                  const updatedValue = e.target.value;
                  setFieldValue("measure", updatedValue);
                }}
                placeholder="Describe Here"
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.measure && touched.measure ? "border-red-500" : ""
                   }`}
                maxLength="250"
                disabled
              />
              <ErrorMessage
                name="measure"
                component="div"
                className="text-red-500 text-xs italic"
              />
              <div className="mt-3">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="specific"
              >
               Make it Measure
              </label>
                <Field
                  as="input"
                  id="measureedit"
                  name="measureedit"
                  value={values.measureedit}
                  onChange={(e) => {
                    const updatedValue = e.target.value;
                    setFieldValue("measureedit", updatedValue);
                  }}
                  placeholder="Revise Goal Here"
                  className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                   bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                     errors.measureedit && touched.measureedit
                       ? "border-red-500"
                       : ""
                   }`}
                  maxLength="250"
                />
                <ErrorMessage
                  name="measureedit"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
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
                  <div onClick={() => setStep(1)}>BACK</div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentTwo;
