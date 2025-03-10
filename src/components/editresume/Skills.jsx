import React, { useEffect, useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import SkillsInputField from "../myresume/SkillsInputField";
import axios from "../../axios";

const Skills = ({
  nextStep,
  setFormData,
  formData,
  prevStep,
  setIsSkipped,
}) => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: formData.skillsValues,
    // validationSchema: skillsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormData({
        ...formData,
        skillsValues: {
          technicalSkills: skills,
          softskills: values.softskills,
        },
      });
      nextStep();
    },
  });

  const [skills, setSkills] = useState(
    Array.isArray(values.technicalSkills) ? values.technicalSkills : []
  );

  const updateData = async (data) => {
    if (data) {
      setFieldValue("softskills", data?.softskills || []);
      setFieldValue("technicalSkills", data?.technicalSkills || []);
    }
  };

  useEffect(() => {
    formData?.skillsValues && updateData(formData.skillsValues);
  }, [formData]);

  const [library, setLibrary] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [loading, setLoading] = useState(true);

  const getLibrary = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/user/get-user-transferable-skills"
      );
      if (response.status === 200) {
        setLibrary(response?.data?.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLibrary();
  }, []);
  const handletechSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default behaviors
      const value = e.target.value.trim();

      // Ensure that the value is not empty and is not already in the list of skills
      if (value && !skills.includes(value)) {
        const updatedSkills = [...skills, value]; // Add the new skill to the list
        setSkills(updatedSkills); // Update local state
      }
      e.target.value = ""; // Clear the input field after adding the skill
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setFieldValue("technicalSkills", updatedSkills);
  };

  useEffect(() => {
    if (
      Array.isArray(values.technicalSkills) &&
      values.technicalSkills.length > 0
    ) {
      setSkills(values.technicalSkills);
    }
  }, [values.technicalSkills]);

  useEffect(() => {
    if (Array.isArray(values.softskills) && values.softskills.length > 0) {
      setSkills(values.technicalSkills);
    }
  }, [values.softskills]);
  

  return (
    <div className="pt-6 px-3">
      <div className="my-6">
        <p className="text-[24px] font-[500]">Soft Skills</p>
        <p className="text-[16px] leading-[21.6px] w-[422px] ">
          Add personal qualities like communication, teamwork, and
          problem-solving.
        </p>
      </div>

      <SkillsInputField
        myskills={library}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        loading={loading}
        transferableSkills={values.softskills}
        setTransferableSkills={setFieldValue}
      />

      <hr className="my-6" />
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-[24px] font-[500]">Technical Skills</p>
          <p className="text-[16px] leading-[21.6px] w-[422px] ">
            Add job-specific abilities such as coding, data analysis, or using
            specialized tools.
          </p>
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-600 font-bold hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Input field for typing skills */}
            <AuthInput
              value={values.technicalSkills} // This will show the current value in the input field
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handletechSkill} // Capture key events (comma, space, Enter)
              id="technicalSkills"
              name="technicalSkills"
              placeholder={"Enter Technical Skills, separated by commas"}
            />
            {errors.technicalSkills && touched?.technicalSkills && (
              <span className="text-red-700 text-sm font-medium">
                {errors.technicalSkills}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-3 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
            <div>
              <IoIosArrowBack className="font-[600]" onClick={prevStep} />
            </div>
            <div onClick={prevStep}>BACK</div>
          </div>
          <div className="w-full flex flex-col items-start  mb-4">
            <div className="w-36">
              <AuthSubmitBtn text={"Next"} type="submit" />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setValues({
                  technicalSkills: [],
                  softskills: [],
                });

                setFormData({
                  ...formData,
                  skillsValues: {
                    technicalSkills: [],
                    softskills: [],
                  },
                });

                setIsSkipped(true);

                nextStep();
              }}
              className="text-[16px] text-[#000000] font-[600] mt-3"
            >
              Skip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Skills;
