import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";
import { sportsTags } from "../data/SportsQuestionData";
import TagsInputField from "./TagsInputFeild";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";

const StepFive = ({ nextStep, prevStep, formData, setFormData }) => {
  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);

  const validationSchema = Yup.object({
    isAthlete: Yup.string().required("Please select an option to proceed."),
 
    athleteOption:
      formData?.isAthlete == "Yes"
        ? Yup.string().required("This field cannot be left empty")
        : Yup.string(),
  });

 

  const handleIsAthlete = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("isAthlete", true);
    setFieldValue("isAthlete", value);
    setFormData({ ...formData, isAthlete: value });
  };

  const [filteredTags, setFilteredTags] = useState([]);

  const options = [
    { label: "Badminton", value: "Badminton" },
    { label: "Baseball/Softball", value: "Baseball" },
    { label: "Basketball", value: "Basketball" },
    { label: "Bowling", value: "Bowling" },
    { label: "Hockey", value: "Hockey" },
    { label: "CheerLeading", value: "Cheerleading" },
    { label: "Cross Country", value: "Cross_Country" },
    { label: "Dance", value: "Dance" },
    { label: "Field Hockey", value: "Field_Hockey" },
    { label: "Football", value: "Football" },
    { label: "Golf", value: "Golf" },
    { label: "Gymnastics", value: "Gymnastics" },
    { label: "Lacrosse", value: "Lacrosse" },
    { label: "Skiing", value: "Skiing" },
    { label: "Soccer", value: "Soccer" },
    { label: "Swimming", value: "Swimming" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value, setFieldValue, setFieldTouched) => {
    setFieldValue("athleteOption", value);
    setFieldTouched("athleteOption", true);
    setFormData({ ...formData, athleteOption: value });
    setIsOpen(false);

    // Next level logic
    const filteredTags = sportsTags[value] || [];
    setFilteredTags(filteredTags);
  };

  const handleOptionClickSports = (value, setFieldValue, setFieldTouched) => {
    setFieldValue("sport", value);
    setFieldTouched("sport", true);
    setFormData({ ...formData, sport: value });
    setIsOpen(false);

    // Next level logic
    const filteredTags = sportsTags[value] || [];
    setFilteredTags(filteredTags);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(e) => {
        if (formData?.isAthlete === "Yes" && tags?.length <= 0) {
          setTagsError("This field is required.");
        } else {
          nextStep();
        }
      }}
    >
      {({ errors, touched, setFieldValue, setFieldTouched }) => (
        <Form>
          <div className="mb-4">
            <label
              className="block text-[14px] font-[500] leading-[17.85px] mb-2"
              htmlFor="isAthlete"
            >
              Are you an athlete?
            </label>

            <RecommendatioBtn
              handleBtnSelect={handleIsAthlete}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              formData={formData.isAthlete}
              optionOne={"Yes"}
              optionTwo={"No"}
            />
            <ErrorMessage
              name="isAthlete"
              component="div"
              className="text-red-500 text-xs italic "
            />
          </div>
          {formData.isAthlete === "Yes" && (
            <div>
              <label className="block font-medium mb-2" htmlFor="university">
                What is your primary sport and position?
              </label>
              <label
                className="block text-[#181818]  text-[14px] font-[500] leading-[17.85px] mb-3"
                htmlFor="athleteOption"
              >
                Primary Sport
              </label>
              <RecommendationDropdown
                options={options}
                errors={errors.athleteOption}
                touched={touched.athleteOption}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                isOpen={isOpen}
                handleOptionClick={handleOptionClick}
                setIsOpen={setIsOpen}
                formData={formData.athleteOption}
              />
              <ErrorMessage
                name="athleteOption"
                component="div"
                className="text-red-500 text-xs italic "
              />
              <div className="mt-4">
                <label className="block text-[#181818] text-[14px] font-[500] leading-[17.85px] mb-3">
                  Sport Position
                </label>

                <TagsInputField
                  availableTags={filteredTags}
                  heading={`Select your ${formData?.athleteOption} answer`}
                  tags={tags}
                  setTags={setTags}
                  tagsError={tagsError}
                  setTagsError={setTagsError}
                />
                {tagsError && (
                  <div className="text-red-500 text-xs italic mt-0">
                    This field cannot be left empty.
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-center pt-4">
            <div className="w-[343px]">
              <AuthSubmitBtn text={"Next"} type={"submit"} />
            </div>
          </div>
          <div className="mt-4">
            <BackBtn handleClick={() => prevStep(true)} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepFive;
