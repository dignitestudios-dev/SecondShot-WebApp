import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { militaryTags } from "../data/MilitaryQuestionData";
import RecommendatioBtn from "../careerrecommendation/RecommendatioBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import RecommendationDropdown from "../careerrecommendation/RecommendationDropdown";
import TagsInputField from "../registrationquestion/TagsInputFeild";
import axios from "../../axios";
import { ErrorToast } from "../toaster/ToasterContainer";
const StepFour = ({ nextStep, prevStep, formData, setFormData }) => {
  const validationSchema = Yup.object({
    militaryService: Yup.string().required(
      "Please select an option to proceed."
    ),
    militaryOption:
      formData?.militaryService == "Yes"
        ? Yup.string().required("This field cannot be left empty")
        : Yup.string(),
  });

  const [tagsError, setTagsError] = useState(false);
  const [loading, steLoading] = useState(false);
  const [rankData, setRankData] = useState([]);

  const [servicesData, setServices] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleMilitaryService = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("militaryService", true);
    setFieldValue("militaryService", value);
    setFormData({ ...formData, militaryService: value });
  };

  const getServices = async () => {
    steLoading(true);

    try {
      const response = await axios.get(`/api/services/get-services`);

      if (response.status === 200) {
        const servicesOptions = response?.data?.data?.map((item) => ({
          value: item?._id,
          label: item?.service_name,
        }));
        setServices(servicesOptions);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(err?.response?.data?.message || "Failed to fetch Ranks.");
    } finally {
      steLoading(false);
    }
  };

  const getRank = async () => {
    steLoading(true);

    try {
      const response = await axios.get(`/api/services/get-ranks`);

      if (response.status === 200) {
        const rankOptions = response?.data?.data?.map((item) => ({
          value: item?._id,
          label: item?.rank_name,
          serviceId: item?.serviceId?._id,
        }));
        setRankData(rankOptions);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      steLoading(false);
    }
  };

  useEffect(() => {
    getServices();
    getRank();
  }, []);

  const handleOptionClick = (value, setFieldValue, setFieldTouched) => {
    setFieldTouched("militaryOption", true);
    setFieldValue("militaryOption", value);
    setFormData({
      ...formData,
      militaryOption: value,
    });
    setIsOpen(false);
    setTags([]);
    setSelectedTags([]);
    const filteredRanks = rankData?.filter((item) => item?.serviceId === value);
    setFilteredTags(filteredRanks);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(e) => {
        if (formData?.militaryService == "Yes" && tags.length <= 0) {
          setTagsError("This field cannot be left empty.");
        } else {
          setFormData({
            ...formData,
            rankOptions: selectedTags,
          });
          nextStep();
        }
      }}
    >
      {({ errors, touched, setFieldValue, setFieldTouched }) => {
        useEffect(() => {
          if (formData.militaryOption) {
            setFieldValue("militaryOption", formData.militaryOption);
            const filteredRanks = rankData?.filter(
              (item) => item?.serviceId === formData?.militaryOption
            );
            setFilteredTags(filteredRanks);
          }

          if (formData?.rankOptions) {
            console.log(formData?.rankOptions, "formData?.rankOptionsuni");
            setTags([
              {
                label: formData?.rankOptions?.label,
                value: formData?.rankOptions?.value,
              },
            ]);

            setSelectedTags({
              label: formData?.rankOptions?.label,
              value: formData?.rankOptions?.value,
            });
          }
        }, [formData?.rankOptions, rankData]);

        return (
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
                formData={formData?.militaryService}
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
                    options={servicesData}
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
                    <label className="block text-sm font-medium mb-1">
                      Rank
                    </label>
                    <TagsInputField
                      availableTags={filteredTags}
                      heading={`Select Your ${formData.militaryOption} Answer`}
                      formData={formData}
                      setFormData={setFormData}
                      tags={tags}
                      setTags={setTags}
                      tagsError={tagsError}
                      setTagsError={setTagsError}
                      setSelectedTags={setSelectedTags}
                      selectedTags={selectedTags}
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
        );
      }}
    </Formik>
  );
};

export default StepFour;
