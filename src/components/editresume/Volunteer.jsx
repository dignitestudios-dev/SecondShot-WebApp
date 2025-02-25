import React, { useEffect, useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { volunteerSchema } from "../../Schema/resumeSchema";

const Volunteer = ({
  nextStep,
  setFormData,
  formData,
  prevStep,
  setIsSkipped,
}) => {
  const formik = useFormik({
    initialValues: { volunteerList: formData.volunteerList },
    validationSchema: volunteerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormData({ ...formData, volunteerList: values?.volunteerList });
      nextStep();
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const updateData = async (data) => {
    if (data && Array.isArray(data)) {
      formik.setValues({
        volunteerList: data?.map((item) => ({
          organizationName: item?.organizationName || "",
          volunteerRules: item?.volunteerRules || "",
          startYear: item?.startYear || "",
          endYear: item?.endYear || "",
          description: item?.description || "",
        })),
      });
    }
  };
  console.log(
    "formData.volunteerValues==> ",
    formData.volunteerValues,
    "formData.volunteerValues-->",
    formData?.volunteerList
  );

  useEffect(() => {
    if (formData?.volunteerList.length > 0) {
      updateData(formData.volunteerList);
    } else {
      formik.setValues({
        volunteerList: [
          {
            organizationName: "",
            volunteerRules: "",
            startYear: "",
            endYear: "",
            description: "",
          },
        ],
      });
    }
  }, [formData.volunteerList]);

  const getYearsArray = () => {
    const startYear = 1990;
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = startYear; year <= currentYear; year++) {
      years.push({ value: `${year}`, label: `${year}` });
    }
    return years;
  };
  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-medium">Volunteer Experience</p>
        <p className="text-sm">
          Highlight your volunteer work to show dedication to community service
          and a positive impact, demonstrating your commitment to helping
          others.
        </p>
      </div>
      <FormikProvider value={formik}>
        <Form>
          <FieldArray
            name="volunteerList"
            render={(arrayHelpers) => (
              <>
                {values?.volunteerList?.map((_, index) => (
                  <div key={index} className="space-y-4  mt-4 ">
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
                    <div className="w-full flex flex-col items-start gap-1 ">
                      <AuthInput
                        placeholder={"Enter Organization Name"}
                        value={values.volunteerList[index].organizationName}
                        id={`volunteerList[${index}].organizationName`}
                        name={`volunteerList[${index}].organizationName`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        text={"Organization Name"}
                        maxLength={30}
                      />
                      {errors.volunteerList?.[index]?.organizationName &&
                        touched.volunteerList?.[index]?.organizationName && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.volunteerList[index].organizationName}
                          </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col items-start gap-1 ">
                      <AuthInput
                        value={values.volunteerList[index].volunteerRules}
                        id={`volunteerList[${index}].volunteerRules`}
                        name={`volunteerList[${index}].volunteerRules`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"Enter Volunteer Role/Title"}
                        text={"Volunteer Role/Title"}
                        maxLength={30}
                      />
                      {errors.volunteerList?.[index]?.volunteerRules &&
                        touched.volunteerList?.[index]?.volunteerRules && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.volunteerList[index].volunteerRules}
                          </span>
                        )}
                    </div>

                    <div className="w-full flex gap-4 mt-5">
                      <div className="w-1/2">
                        <MonthsInput
                          label={"Start Year"}
                          value={values.volunteerList[index].startYear}
                          id={`volunteerList[${index}].startYear`}
                          name={`volunteerList[${index}].startYear`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={getYearsArray()}
                        />
                        {errors.volunteerList?.[index]?.startYear &&
                          touched.volunteerList?.[index]?.startYear && (
                            <span className="text-red-700 text-sm font-medium">
                              {errors.volunteerList[index].startYear}
                            </span>
                          )}
                      </div>
                      <div className="w-1/2">
                        <label className="text-sm font-medium">
                          End Year{" "}
                          <span className="text-[#9a9a9a] font-normal">
                            (or expected end)
                          </span>
                        </label>
                        <MonthsInput
                          value={values.volunteerList[index].endYear}
                          id={`volunteerList[${index}].endYear`}
                          name={`volunteerList[${index}].endYear`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={getYearsArray()}
                        />
                        {errors.volunteerList?.[index]?.endYear &&
                          touched.volunteerList?.[index]?.endYear && (
                            <span className="text-red-700 text-sm font-medium">
                              {errors.volunteerList[index].endYear}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="w-full flex flex-col items-start gap-1 my-8">
                      <label className="text-sm font-medium">
                        Description{" "}
                        <span className="text-[#b1b1b2]">(Optional)</span>
                      </label>
                      <textarea
                        rows="4"
                        id={`volunteerList[${index}].description`}
                        name={`volunteerList[${index}].description`}
                        className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
                        placeholder="Highlight relevant skills acquired or the impact you made during the experience."
                        onChange={handleChange}
                        value={values.volunteerList[index]?.description}
                        maxLength={250}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-[12px] mb-3 mt-3 font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
                  <div>
                    <IoIosArrowBack className="font-[600]" onClick={prevStep} />
                  </div>
                  <div onClick={prevStep}>BACK</div>
                </div>
                <div className=" flex gap-10 items-center  mb-4">
                  <div className="w-36">
                    <AuthSubmitBtn text={"Next"} type={"submit"} />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        organizationName: "",
                        volunteerRules: "",
                        startYear: "",
                        endYear: "",
                        description: "",
                      })
                    }
                    className="text-[16px] text-[#012C57] font-[500] "
                  >
                    Add More
                  </button>
                </div>
              </>
            )}
          />

          <button
            type="button"
            onClick={() => {
              formik.setValues({
                volunteerList: [
                  {
                    organizationName: "",
                    volunteerRules: "",
                    startYear: "",
                    endYear: "",
                    description: "",
                  },
                ],
              });

              setFormData({ ...formData, volunteerList: [] });

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

export default Volunteer;
