import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import BackBtn from "../onboarding/BackBtn";
import TagsInputField from "./TagsInputFeild";
import { ErrorToast } from "../toaster/ToasterContainer";
import axios from "../../axios";

const StepSix = ({
  nextStep,
  prevStep,
  formData,
  setFormData,
  setstepsixvalue,
}) => {
  // const validationSchema = Yup.object({
  //     isAthlete: Yup.string().required('This field is required'),
  //   });
  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  // const handleIsAthlete = (value, setFieldValue, setFieldTouched) => {
  //   setFieldValue('isAthlete', value);
  //   setFormData({ ...formData, isAthlete: value });
  //   setFieldTouched("isAthlete", true);
  // }
  const [hobbie, setHobbie] = useState([]);
  const [loading, setLoading] = useState(false);

  const gethobbie = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/services/get-hobbies`);

      if (response.status === 200) {
        const hobbieOptions = response?.data?.data?.map((item) => ({
          value: item?._id,
          label: item?.hobbie_name,
        }));
        setHobbie(hobbieOptions);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(err?.response?.data?.message || "Failed to fetch Ranks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gethobbie();
  }, []);

  useEffect(() => {
    setstepsixvalue(
      hobbie.filter((hobby) => {
        return hobby.label !== (tags[0]?.label || "");
      })
    );
  }, [tags]);

  // useEffect(() => {
  //   if (tags.length > 0) {
  //     setFormData({ ...formData, hobbieOptions: tags[0] });
  //   }
  // }, [tags]);

  useEffect(() => {
    if (tags[0]?.label === formData.hobbieOptions2?.label) {
      setFormData({ ...formData, hobbieOptions2: "" });
    } else {
      setFormData({ ...formData, hobbieOptions: tags[0] });
    }
  }, [tags]);
  useEffect(() => {
    if (formData?.hobbieOptions) {
      setSelectedTags(formData?.hobbieOptions);
      setTags([formData?.hobbieOptions]);
    }
  }, [hobbie]);
  return (
    <Formik
      initialValues={{}}
      //   validationSchema={}
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
                <label className="block text-sm font-medium mb-1">
                  Select your most favorite hobby you enjoy now or during your
                  childhood.
                </label>

                <TagsInputField
                  availableTags={hobbie}
                  heading={"Select Your Favorite Hobby"}
                  tags={tags}
                  setTags={setTags}
                  tagsError={tagsError}
                  setTagsError={setTagsError}
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
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
        );
      }}
    </Formik>
  );
};

export default StepSix;
