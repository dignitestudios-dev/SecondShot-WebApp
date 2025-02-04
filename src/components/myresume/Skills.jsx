import React from "react";
import SkillsInputField from "./SkillsInputField";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import { skillsValues } from "../../data/resumefield";
import { skillsSchema } from "../../Schema/resumeSchema";

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
  } = useFormik({
    initialValues: formData.skillsValues,
    validationSchema: skillsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormData({ ...formData, skillsValues: values });
      
      nextStep();
    },
  });

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
        myskills={values.softskills}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />
    
      <hr className="my-6" />
      <form onSubmit={handleSubmit}>
        <div className="">
          <p className="text-[24px] font-[500]">Technical Skills</p>
          <p className="text-[16px] leading-[21.6px] w-[422px] ">
            Add job-specific abilities such as coding, data analysis, or using
            specialized tools.
          </p>
          <div className="w-full flex flex-col items-start gap-1 my-8">
            <AuthInput
              value={values.technicalSkills}
              onChange={handleChange}
              onBlur={handleBlur}
              id="technicalSkills"
              name="technicalSkills"
              placeholder={"Technical Skills"}
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
              onClick={() => {
                setIsSkipped(true);
                nextStep();
              }}
              className="text-[16px] text-[#000000] font-[600] mt-3 "
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
