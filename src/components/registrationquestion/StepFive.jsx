import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";
import { sportsTags } from "../data/SportsQuestionData";
import TagsInputField from "./TagsInputFeild";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";
import axios from "../../axios";
import { ErrorToast } from "../toaster/ToasterContainer";
const StepFive = ({ nextStep, prevStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    isAthlete: Yup.string().required("Please select an option to proceed."),
    athleteOption:
      formData?.isAthlete == "Yes"
        ? Yup.string().required("This field cannot be left empty")
        : Yup.string(),
  });

  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const handleIsAthlete = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("isAthlete", true);
    setFieldValue("isAthlete", value);
    setFormData({ ...formData, isAthlete: value });
  };

  const [isOpen, setIsOpen] = useState(false);

  const [sports, setSports] = useState([]);
  const [sportsPosition, setSportsPosition] = useState([]);
  const [loading, setLoading] = useState(false);

  const getsports = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/services/get-sports`);

      if (response.status === 200) {
        const sportsOptions = response?.data?.data?.map((item) => ({
          value: item?._id,
          label: item?.sport_name,
        }));
        setSports(sportsOptions);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(err?.response?.data?.message || "Failed to fetch Ranks.");
    } finally {
      setLoading(false);
    }
  };

  const getSportPosition = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/services/get-sport-positions`);

      if (response.status === 200) {
        const rankOptions = response?.data?.data?.map((item) => ({
          value: item?._id,
          label: item?.position_name,
          sportId: item?.sportId?._id,
        }));
        setSportsPosition(rankOptions);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(err?.response?.data?.message || "Failed to fetch Ranks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getsports();
    getSportPosition();
  }, []);

  const handleOptionClick = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("athleteOption", true);
    setFieldValue("athleteOption", value);
    setFormData({ ...formData, athleteOption: value });
    setIsOpen(false);
    setTags([]);
    setSelectedTags([]);
    const filteredSports = sportsPosition
      ?.filter((item) => item?.sportId === value)
      ?.sort((a, b) => a.label.localeCompare(b.label));
    setFilteredTags(filteredSports);
  };

  useEffect(() => {
    if (tags.length > 0) {
      setFormData({ ...formData, sportsOption: tags[0] });
    }
    // else {
    //   setFormData({ ...formData, sportsOption: "" });
    // }
  }, [tags]);
  console.log(formData?.ageValue, "formData?.ageValue");
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
      {({ errors, touched, setFieldValue, setFieldTouched }) => {
        useEffect(() => {
          if (formData?.athleteOption) {
            setFieldValue("athleteOption", formData?.athleteOption);

            const filteredSports = sportsPosition
              ?.filter((item) => item?.sportId === formData?.athleteOption)
              ?.sort((a, b) => a.label.localeCompare(b.label));
            setFilteredTags(filteredSports);
          }

          if (formData?.sportsOption) {
            setSelectedTags(formData?.sportsOption);
            setTags([formData?.sportsOption]);
          }
        }, [sportsPosition]);
        return (
          <Form>
            <div className="mb-4">
              <label
                className="block text-[14px] font-[500] leading-[17.85px] mb-2"
                htmlFor="isAthlete"
              >
                Are you an athlete, former athlete, or consider yourself
                athletic?
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
            {formData?.isAthlete === "Yes" && (
              <div>
                <label className="block font-medium mb-2" htmlFor="university">
                  What is your primary sport and primary position?
                </label>
                <label
                  className="block text-[#181818]  text-[14px] font-[500] leading-[17.85px] mb-3"
                  htmlFor="athleteOption"
                >
                  Primary Sport
                </label>
                <RecommendationDropdown
                  options={sports}
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
                    Primary Position
                  </label>

                  <TagsInputField
                    availableTags={filteredTags}
                    heading={`Select your ${formData?.athleteOption} answer`}
                    tags={tags}
                    setTags={setTags}
                    tagsError={tagsError}
                    setTagsError={setTagsError}
                    setSelectedTags={setSelectedTags}
                    selectedTags={selectedTags}
                  />
                  {tagsError && tags?.length === 0 && (
                    <p className="text-red-500 text-xs italic mt-0">
                      This field cannot be left empty.
                    </p>
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
              <BackBtn
                handleClick={() =>
                  prevStep(
                    formData?.ageValue === "No" ||
                      formData?.university === "School" ||
                      formData?.university === "HighSchool"
                      ? true
                      : false
                  )
                }
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StepFive;
