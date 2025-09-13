import React, { useEffect } from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from "formik";
import { objectiveSchema } from "../../Schema/resumeSchema";

const Objective = ({ nextStep, setFormData, formData, prevStep }) => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: formData?.objetiveValues,
    validationSchema: objectiveSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormData({ ...formData, objetiveValues: values });
   
      nextStep();
    },
  });
  
  const updateData = async (data) => {
    if (data) {
      setFieldValue("description", data?.description || "");
    }
  };

  useEffect(() => {
    formData?.objetiveValues && updateData(formData.objetiveValues);
  }, [formData]);

  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]"> Objective</p>
        <p className="text-[14px] leading-[21.6px] text-[#000000] font-[400] mt-3 ">
          Writing an objective on a resume is a great way to quickly communicate
          your career goals and how you can contribute to the job you're
          applying for. Keep in mind you can change this for each job that you
          are applying for.
        </p>
        <p className="text-[18px] font-[500] mt-3">
          {" "}
          Keep It Short and Focused
        </p>
        <p className="text-[14px] leading-[21.6px] text-[#000000] font-[400]  ">
          Your resume objective should be brief—about 1-2 sentences long. It
          should clearly state what position you’re aiming for and how you can
          add value to the company.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-start gap-1 my-8 pr-12">
          <label className="text-[14px] leading-[17.85px] font-[500] text-[#181818] ">
            Description
          </label>
          <textarea
            rows="8"
            name="description"
            type="text"
            className={`w-full border rounded-lg px-3 py-3 text-sm bg-transparent border-gray-700  focus:ring-gray-700 focus:border-gray-700 outline-gray-700`}
            value={values?.description}
            placeholder="e.g. Seeking a marketing coordinator position where I can apply my content creation and social media skills to drive brand growth and engagement."
            onChange={handleChange}
            onBlur={handleBlur}
            id="description"
           
          />
          {errors.description && touched.description ? (
            <span className="text-red-700 text-sm font-medium">
              {errors.description}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1 mb-3 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
          <div>
            <IoIosArrowBack className="font-[600]" onClick={prevStep} />
          </div>
          <div onClick={prevStep}>BACK</div>
        </div>
        <div className="w-36">
          <AuthSubmitBtn text={"Next"} type={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default Objective;
