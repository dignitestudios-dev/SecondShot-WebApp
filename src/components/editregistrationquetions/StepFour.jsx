import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { militaryTags } from "../data/MilitaryQuestionData";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";
import TagsInputField from "./TagsInputFeild";

const StepFour = ({ nextStep, prevStep, formData, setFormData }) => {
  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);
  const validationSchema = Yup.object({
    militaryService: Yup.string().required(
      "Please select an option to proceed."
    ),
    militaryOption:
      formData?.militaryService == "Yes"
        ? Yup.string().required("This field cannot be left empty")
        : Yup.string(),
  });

  const handleMilitaryService = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("militaryService", true);
    setFieldValue("militaryService", value);
    setFormData({ ...formData, militaryService: value });
  };

  const [filteredTags, setFilteredTags] = useState([]);

  const options = [
    { label: "US. Air Force", value: "AirForce" },
    { label: "US Coast Guard", value: "CoastGuard" },
    { label: "US Army", value: "Army" },
    { label: "US Marine Corps", value: "MarineCorps" },
    { label: "US Navy", value: "Navy" },
    { label: "US National Guard", value: "NationalGuard" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("militaryOption", true);
    setFieldValue("militaryOption", value);
    setFormData({ ...formData, militaryOption: value });
    setIsOpen(false);

    const filteredTags = militaryTags[value] || [];
    setFilteredTags(filteredTags);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(e) => {
        if (formData?.militaryService == "Yes" && tags.length <= 0) {
          setTagsError("This field cannot be left empty.");
        } else {
          nextStep();
        }
      }}
    >
      {({ errors, touched, setFieldValue, setFieldTouched }) => (
        <Form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-0"
              htmlFor="militaryService"
            >
              Have you served in military?
            </label>
            <RecommendatioBtn
              handleBtnSelect={handleMilitaryService}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              formData={formData.militaryService}
              optionOne={"Yes"}
              optionTwo={"No"}
            />
            <ErrorMessage
              name="militaryService"
              component="div"
              className="text-red-500 text-xs italic "
            />
          </div>
          {formData.militaryService === "Yes" && (
            <>
              <label
                className="block text-[18px] font-[500] leading-[22.95px] mb-2"
                htmlFor="military"
              >
                Please select the military branch and rank.
              </label>
              <div>
                <label
                  className="block text-[14px] leading-[17.85px] font-[500] mb-2 mt-5"
                  htmlFor="militaryOption"
                >
                  Branch of Service
                </label>
                <RecommendationDropdown
                  options={options}
                  errors={errors.militaryOption}
                  touched={touched.militaryOption}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  isOpen={isOpen}
                  handleOptionClick={handleOptionClick}
                  setIsOpen={setIsOpen}
                  formData={formData.militaryOption}
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Rank</label>
                  <TagsInputField
                    availableTags={filteredTags}
                    heading={`Select Your ${formData.militaryOption} Answer`}
                    tags={tags}
                    setTags={setTags}
                    tagsError={tagsError}
                    setTagsError={setTagsError}
                  />
                  {tagsError && (
                    <div className="text-red-500 text-xs italic mt-0">
                      This field cannot be left empty
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <div className="flex justify-center pt-4">
            <div className="w-[343px]">
              <AuthSubmitBtn text={"Next"} type={"submit"} />
            </div>
          </div>
          <div className="mt-4">
            <BackBtn handleClick={() => prevStep()} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepFour;
