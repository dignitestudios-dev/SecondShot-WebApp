import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import TagsInputField from "./TagsInputFeild";
import axios from "../../axios";
import { ErrorToast } from "../toaster/ToasterContainer";

const StepEight = ({ nextStep, prevStep, formData, setFormData }) => {
  // const validationSchema = Yup.object({
  //     isAthlete: Yup.string().required('This field is required'),
  //   });

  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [availableTags] = useState([
    "English",
    "Math",
    "Science",
    "Social Studies",
    "Foreign Language",
    "Arts",
    "Home Economics",
    "Music",
    "Computer Science",
    "Health Education",
    "Business",
    "Psychology",
  ]);

  const getsubjects = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/services/get-subjects`);

      if (response.status === 200) {
        const subjectsOptions = response?.data?.data?.map((item) => ({
          value: item?._id,
          label: item?.subject_name,
        }));
        setSubjects(subjectsOptions);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(err?.response?.data?.message || "Failed to fetch Ranks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getsubjects();
  }, []);

  useEffect(() => {
    if (tags.length > 0) {
      setFormData({ ...formData, subjectOptions: tags[0]?.value });
    }
  }, [tags]);

  return (
    <Formik
      initialValues={{}}
      //   validationSchema={validationSchema}
      onSubmit={(e) => {
        if (tags.length <= 0) {
          setTagsError("This field is required.");
        } else {
          nextStep();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-4">
            <div className="mt-4">
              <label className="block text-[14px] font-[500] mb-2">
                Please select your favorite subject from when you were in middle
                school.
              </label>
              <TagsInputField
                availableTags={subjects}
                heading={"Select your subject"}
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

export default StepEight;
