import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const AssessmentTwo = ({
  prevStep,
  nextStep,
  formData,
  setFormData,
  carrerQuestion,
  loading,
}) => {
  const validationSchema = Yup.object({
    excelSkill: Yup.string().required("Please select an option to proceed."),
  });

  const options = [
    { label: "Leadership", value: "leaderShip" },
    { label: "Communication", value: "communication" },
    { label: "Strategy", value: "strategy" },
    { label: "Hard-work", value: "hard-work" },
    { label: "Team-work", value: "team-work" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("excelSkill", true);
    setFieldValue("excelSkill", value);
    setFormData({ ...formData, excelSkill: value });
    setIsOpen(false);
  };

  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={nextStep}
      >
        {({ errors, touched, setFieldValue, setFieldTouched }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="excelSkill"
              >
                {loading ? (
                  <span className="text-gray-500">Loading....</span>
                ) : (
                  carrerQuestion[1]?.question
                )}
              </label>
              <RecommendationDropdown
                options={options}
                errors={errors.excelSkill}
                touched={touched.excelSkill}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                isOpen={isOpen}
                handleOptionClick={handleOptionClick}
                setIsOpen={setIsOpen}
                formData={formData.excelSkill}
              />

              <ErrorMessage
                name="excelSkill"
                component="div"
                className="text-red-500 text-xs italic "
              />
            </div>
            <div className="flex justify-center pt-4">
              <div className="w-[60%]">
                <AuthSubmitBtn text={"Next"} type={"submit"} />
              </div>
            </div>
            <div
              onClick={prevStep}
              className=" mt-2 w-full flex justify-center items-center cursor-pointer"
            >
              <IoIosArrowDropleftCircle />
              <p className="text-[10px] font-semibold text-blue-950 pl-1">
                Back
              </p>
              
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentTwo;
