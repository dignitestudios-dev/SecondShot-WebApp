import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import TagsInputField from "../registrationquestion/TagsInputFeild";
import { educationTags } from "../data/EducationQuestionData";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";

const StepOne = ({ nextStep, formData, setFormData }) => {
  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  const validationSchema = Yup.object({
    university: Yup.string().required("This field cannot be left empty."),
  });

  const options = [
    { label: "Elementary", value: "Elementary" },
    { label: "Middle School", value: "School" },
    { label: "High School", value: "HighSchool" },
    { label: "College", value: "College" },
    { label: "Masters", value: "early" },
    { label: "PhD", value: "career" },
  ];

  const [filteredTags, setFilteredTags] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("university", true);
    setFieldValue("university", value);
    setFormData({ ...formData, university: value });

    setIsOpen(false);
    setTags([]);
    setSelectedTags([]);
    // const filteredTags = educationTags[value] || [];
    // setFilteredTags(filteredTags);
  };

  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(e) => {
          // if (tags.length <= 0) {
          //   setTagsError("This field is required.");
          // } else {
          //   setFormData({
          //     ...formData,
          //     universityOptions: selectedTags?.label,
          //   });
          if (
            formData?.university === "School" ||
            formData?.university === "HighSchool" ||
            formData?.university === "Elementary"
          ) {
            // Reset military-related fields in formData
            setFormData({
              ...formData,
              militaryOption: "", // Clear militaryOption
              rankOptions: "", // Clear rankOptions
              militaryService: "", // Clear militaryService
            });
          }
          nextStep(
            formData?.university === "School" ||
              formData?.university === "HighSchool" ||
              formData?.university === "Elementary"
              ? true
              : false
          );
        }}
      >
        {({ errors, touched, setFieldValue, setFieldTouched }) => {
          useEffect(() => {
            if (formData?.university) {
              setFieldValue("university", formData?.university);
              // const filteredTags = educationTags[formData?.university] || [];
              // setFilteredTags(filteredTags);
            }

            if (formData?.universityOptions) {
              setTags([{ label: formData?.universityOptions }]);

              const educationalTags = educationTags[
                formData?.university
              ]?.filter((item) => item?.label === formData?.universityOptions);

              setSelectedTags({
                label: formData?.universityOptions,
                // value: educationalTags[0]?.value,
              });
            }
          }, [formData?.universityOptions]);

          return (
            <Form>
              <div className="mb-2">
                <label
                  className="block text-[14px] font-[500] text-[#181818] leading-[17.85px]  mb-1"
                  htmlFor="university"
                >
                  Select the last grade/degree level of completion
                </label>
                <RecommendationDropdown
                  options={options}
                  errors={errors.university}
                  touched={touched.university}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  isOpen={isOpen}
                  handleOptionClick={handleOptionClick}
                  setIsOpen={setIsOpen}
                  formData={formData.university}
                />
                <ErrorMessage
                  name="university"
                  component="div"
                  className="text-red-500 text-xs italic mt-2"
                />
              </div>
              {/* {(formData?.university === "School" ||
                formData?.university === "HighSchool" ||
                formData?.university === "College" ||
                formData?.university === "early" ||
                formData?.university === "career") && (
                <div>
                  <label
                    className="block text-[14px] font-[500] leading-[17.85px] mb-1"
                    htmlFor="university"
                  >
                    {formData.university === "School" ||
                    formData.university === "HighSchool"
                      ? "Choose the major, trade school, or military branch you are most interested in pursuing after high school."
                      : "Select the major that is closely related to the one you pursued or are pursuing in college."}
                  </label>

                  <TagsInputField
                    availableTags={filteredTags}
                    heading={`Select Your ${formData.university} Answer`}
                    tags={tags}
                    setTags={setTags}
                    tagsError={tagsError}
                    formData={formData}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    setTagsError={setTagsError}
                  />
                  {tagsError && tags?.length === 0 && (
                    <p className="text-red-500 text-xs italic mt-0">
                      This field cannot be left empty.
                    </p>
                  )}
                </div>
              )} */}

              <div className="flex justify-center pt-4">
                <div className="w-[343px]">
                  <AuthSubmitBtn text={"Next"} type={"submit"} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StepOne;
