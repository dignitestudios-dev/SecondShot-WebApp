import React from "react";
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
    timeboundedit: Yup.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
  });
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          timebound:
            formData.timebound || formData.relevantedit
              ? formData.relevantedit
              : formData.relevant || formData.achievableedit
              ? formData.achievableedit
              : formData.measureedit
              ? formData.measureedit
              : formData.measure || formData.specificedit
              ? formData.specificedit
              : formData.specific,
          timeboundedit: formData.timeboundedit,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormData({
            ...formData,
            timebound: values.timebound,
            timeboundedit: values.timeboundedit,
          });
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
                  // Ensure user can edit the field freely
                  setFieldValue("timebound", e.target.value); // Update the achievable field value
                }}
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                  bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.timebound && touched.timebound
                      ? "border-red-500"
                      : ""
                  }`}
                maxLength="250"
                disabled
              />
              <ErrorMessage
                name="timebound"
                component="div"
                className="text-red-500 text-xs italic"
              />
              <div className="mt-3">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="timebound"
                >
                  Make it Timebound
                </label>
                <Field
                  as="input"
                  id="timeboundedit"
                  name="timeboundedit"
                  placeholder="Describe Here"
                  value={values.timeboundedit}
                  onChange={(e) => {
                    // Ensure user can edit the field freely
                    setFieldValue("timeboundedit", e.target.value); // Update the achievable field value
                  }}
                  className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
                  bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.timeboundedit && touched.timeboundedit
                      ? "border-red-500"
                      : ""
                  }`}
                  maxLength="250"
                />
                <ErrorMessage
                  name="timeboundedit"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            <div className="flex justify-center pt-4 gap-3 ">
              <div className="w-[343px]">
                <button
                  onClick={() => {
                    console.log("Before Skip:", formData);

                    setFormData((prev) => ({
                      ...prev,
                      timeboundedit: "",
                    }));

                    console.log("After Skip:", formData);
                    navigate("/create-goals", {
                      state: {
                        isSmart: true,
                        lastStep: values,
                      },
                    });
                  }}
                  className="w-full text-[#012C57] h-[49px] bg-gray-300  p-3 text-center rounded-[12px] font-[500] leading-[21.6px] text-[16px]"
                >
                        Do Not Revise
                </button>
              </div>
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
