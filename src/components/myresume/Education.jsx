import React, { useState } from "react";
import { useFormik, FieldArray, FormikProvider, Form } from "formik";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { educationSchema } from "../../Schema/resumeSchema";
import { educationValues } from "../../data/resumefield";
import { getStartYearsArray, getYearsArray } from "../../pages/lib/helper";

const Education = ({
  nextStep,
  prevStep,
  setFormData,
  formData,
  setIsSkipped,
}) => {
  const formik = useFormik({
    initialValues: { educationList: formData.educationList },
    validationSchema: educationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      setFormData({ ...formData, educationList: values?.educationList });
      nextStep();
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  
  
  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]">Education</p>
        <p className="text-sm">List your degrees you have earned.</p>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name="educationList"
            render={(arrayHelpers) => (
              <>
                {values.educationList.map((_, index) => (
                  <div key={index} className="mb-8  pb-4">
                    <div className="flex justify-between items-center mb-4">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="mt-5">
                      <AuthInput
                        text="Educational Institution"
                        id={`educationList[${index}].education`}
                        name={`educationList[${index}].education`}
                        value={values.educationList[index].education}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Educational Institution"
                        maxLength={30}
                      />
                      {errors.educationList?.[index]?.education &&
                        touched.educationList?.[index]?.education && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.educationList[index].education}
                          </span>
                        )}
                    </div>
                    <div className="mt-5">
                      <AuthInput
                        text="Degree"
                        id={`educationList[${index}].degree`}
                        name={`educationList[${index}].degree`}
                        value={values.educationList[index].degree}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your degree"
                        maxLength={30}
                      />

                      {errors.educationList?.[index]?.degree &&
                        touched.educationList?.[index]?.degree && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.educationList[index].degree}
                          </span>
                        )}
                    </div>
                    <div className="mt-5">
                      <AuthInput
                        text="Field of Study"
                        id={`educationList[${index}].fieldofStudy`}
                        name={`educationList[${index}].fieldofStudy`}
                        value={values.educationList[index].fieldofStudy}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your Field of Study"
                        maxLength={30}
                      />
                      {errors.educationList?.[index]?.fieldofStudy &&
                        touched.educationList?.[index]?.fieldofStudy && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.educationList[index].fieldofStudy}
                          </span>
                        )}
                    </div>

                    <div className="w-full flex gap-4 mt-5">
                      <div className="w-1/2">
                        <MonthsInput
                          label="Start Year"
                          id={`educationList[${index}].startYear`}
                          name={`educationList[${index}].startYear`}
                          value={values.educationList[index].startYear}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={getStartYearsArray(1990)}
                        />
                        {errors.educationList?.[index]?.startYear &&
                          touched.educationList?.[index]?.startYear && (
                            <span className="text-red-700 text-sm font-medium">
                              {errors.educationList[index].startYear}
                            </span>
                          )}
                      </div>
                      <div className="w-1/2">
                        <MonthsInput
                          label="End Year"
                          id={`educationList[${index}].endYear`}
                          name={`educationList[${index}].endYear`}
                          value={values.educationList[index].endYear}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={getYearsArray(
                            values.educationList[index].startYear
                          )} 
                          disabled={!values.educationList[index].startYear}

                        />
                        {errors.educationList?.[index]?.endYear &&
                          touched.educationList?.[index]?.endYear && (
                            <span className="text-red-700 text-sm font-medium">
                              {errors.educationList[index].endYear}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1 mb-3 mt-3 text-[12px] font-[600]">
                  <IoIosArrowBack className="font-[600]" onClick={prevStep} />
                  <span onClick={prevStep}>BACK</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-36">
                    <AuthSubmitBtn text="Next" type="submit" />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          education: "",
                          degree: "",
                          fieldOfStudy: "",
                          startYear: "",
                          endYear: "",
                        })
                      }
                      className="text-[16px] text-[#012C57] font-[500] "
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </>
            )}
          />

          <button
            type="button"
            onClick={() => {
              setIsSkipped(true);
              nextStep();
            }}
            className="text-[16px] text-[#000000] font-[600] mt-3"
          >
            Skip
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Education;
