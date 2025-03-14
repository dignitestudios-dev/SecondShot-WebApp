import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { hobbyTags } from "../data/SportsQuestionData";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import TagsInputField from "./TagsInputFeild";

const StepSeven = ({
  nextStep,
  prevStep,
  formData,
  setFormData,
  stepsixvalue,
}) => {
  // const validationSchema = Yup.object({
  //     isAthlete: Yup.string().required('This field is required'),
  //   });

  // const handleIsAthlete = (value, setFieldValue, setFieldTouched) => {
  //   setFieldValue('isAthlete', value);
  //   setFormData({ ...formData, isAthlete: value });
  //   setFieldTouched("isAthlete", true);
  // }\

  const [tagsError, setTagsError] = useState(false);

  const [tags, setTags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    if (tags.length > 0) {
      setFormData({ ...formData, hobbieOptions2: tags[0] });
    }
    // else {
    //   setFormData({ ...formData, hobbieOptions2: "" });
    // }
  }, [tags]);
  useEffect(() => {
    if (formData?.hobbieOptions2) {
      setSelectedTags(formData?.hobbieOptions2);
      setTags([formData?.hobbieOptions2]);
    }
  }, []);
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
      {({ errors, touched }) => {
        return (
          <Form>
            <div className="mb-4">
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Select your second most favorite hobby or activity you enjoy
                  now or during your childhood.
                </label>
                <TagsInputField
                  availableTags={stepsixvalue}
                  heading={"Select Your Club"}
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

export default StepSeven;
