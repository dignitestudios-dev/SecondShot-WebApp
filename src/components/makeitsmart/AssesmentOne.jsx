import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Stars } from "../../assets/export";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import Backbutton from "../Global/Backbutton";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AssessmentOne = ({
  nextStep,
  formData,
  setFormData,
  showModal,
  inputData,
}) => {
  const navigate = useNavigate();
  const validationSchema = Yup?.object({
    specific: Yup?.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
    specificedit: Yup?.string().required(
      "Please respond before moving forward to proceed with the next step."
    ),
  });

  return (
    <Formik
      initialValues={{
        specific: inputData.main_goal_name || formData.specific || "",
        specificedit: formData.specificedit || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData({
          ...formData,
          specific: values.specific,
          specificedit: values.specificedit,
        });
        nextStep();
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="specific"
            >
              Specific
            </label>
            <p className="text-[14px] text-[#000000] font-[400] w-[503px]">
              When a goal is specific, it's like drawing a clear picture in your
              mind of what you want to do. You can make your goal specific by
              answering the following questions:
            </p>
            <div className="flex items-center gap-4 mt-3 mb-3">
              {[
                "What do I want to do?",
                "Why do I want to do it?",
                "How will I do it?",
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <img src={Stars} className="w-[15.89px] h-[12.93px]" alt="" />
                  <span className="text-[14px] leading-[18.9px] text-[#012C57] font-[500]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <Field
              as="input"
              id="specific"
              name="specific"
              placeholder="Revise Goal Here"
              className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
               bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                 errors.specific && touched.specific ? "border-red-500" : ""
               }`}
              maxLength="250"
              disabled={!!inputData.main_goal_name} // Disable if main_goal_name exists
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue("specific", value);
                if (!inputData.main_goal_name) {
                  setFieldValue("specificedit", value);
                }
              }}
            />
            <ErrorMessage
              name="specific"
              component="div"
              className="text-red-500 text-xs italic"
            />
            <div className="mt-3">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="specificedit"
              >
                Make it Specific
              </label>
              <Field
                as="input"
                id="specificedit"
                name="specificedit"
                placeholder="Revise Goal Here"
                className={`border border-gray-400 rounded-lg w-full py-2 px-3 placeholder-gray-900 text-sm
               bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                 errors.specificedit && touched.specificedit
                   ? "border-red-500"
                   : ""
               }`}
                maxLength="250"
              />
              <ErrorMessage
                name="specificedit"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>
          <div className="flex justify-center pt-4 gap-3">
            <div className="w-[343px]">
              <button
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    specific: prev.specific || inputData.main_goal_name || "",
                    specificedit: "",
                  }));
                  nextStep();
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
            <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
              <div>
                <IoIosArrowBack
                  className="font-[600]"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div
                onClick={() =>
                  navigate("/create-goals", {
                    state: { modalback: true },
                  })
                }
              >
                BACK
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AssessmentOne;
