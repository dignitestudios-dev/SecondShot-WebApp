import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";

const AssessmentOne = ({
  nextStep,
  formData,
  setFormData,
  carrerQuestion,
  loading,
}) => {
  const validationSchema = Yup.object({
    impSkill: Yup.string().required("Please select an option to proceed."),
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
    setFieldTouched("impSkill", true);
    setFieldValue("impSkill", value);
    setFormData({ ...formData, impSkill: value });
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
                htmlFor="impSkill"
              >
                {loading ? (
                  <span className="text-gray-500">Loading.....</span>
                ) : (
                  carrerQuestion[0]?.question
                )}
              </label>
              <RecommendationDropdown
                options={options}
                errors={errors.impSkill}
                touched={touched.impSkill}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                isOpen={isOpen}
                handleOptionClick={handleOptionClick}
                setIsOpen={setIsOpen}
                formData={formData.impSkill}
              />

              <ErrorMessage
                name="impSkill"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-[60%] bg-gradient-to-r from-[#061523] to-[#012C57] text-white text-xs font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssessmentOne;
