import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import TagsInputField from "./TagsInputFeild";
import { hobbyTags } from "../data/SportsQuestionData";

const StepSix = ({ nextStep, prevStep, formData, setFormData }) => {
  // const validationSchema = Yup.object({
  //     isAthlete: Yup.string().required('This field is required'),
  //   });
  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);
  // const handleIsAthlete = (value, setFieldValue, setFieldTouched) => {
  //   setFieldValue('isAthlete', value);
  //   setFormData({ ...formData, isAthlete: value });
  //   setFieldTouched("isAthlete", true);
  // }

  return (
    <Formik
      initialValues={{}}
      //   validationSchema={}
      onSubmit={(e) => {
        if (tags.length <= 0) {
          setTagsError("This field is required.");
        } else {
          nextStep(e);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-4">
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Select your most favorite hobby you enjoy now or during your
                childhood.
              </label>

              <TagsInputField
                availableTags={hobbyTags}
                heading={"Select Your Favorite Hobby"}
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

export default StepSix;