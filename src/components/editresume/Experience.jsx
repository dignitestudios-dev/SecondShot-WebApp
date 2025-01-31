import React, { useEffect, useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { experienceSchema } from "../../Schema/resumeSchema";

const Experience = ({ nextStep, setFormData, formData, prevStep }) => {
  const [customErrors, setCustomErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    values.experienceList.forEach((experience, index) => {
      if (!experience.isCurrent) {
        if (!experience.endmonth) {
          errors[`experienceList[${index}].endmonth`] =
            "Please select a end month";
        }
        if (!experience.endyear) {
          errors[`experienceList[${index}].endyear`] =
            "Please select a end month";
        }
      }
    });
    setCustomErrors(errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: { experienceList: formData.experienceList },
    validationSchema: experienceSchema,
    validate,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      setFormData({ ...formData, experienceList: values?.experienceList });
      setCustomErrors({});
      console.log("Form Submitted", values);
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
  console.log(values, "valuesvalues");
  console.log(errors, "errors errors");
  errors;

  const updateData = async (data) => {
    if (data && Array.isArray(data)) {
      console.log("Received Data:", data);

      formik.setValues({
        experienceList: data?.map((item) => ({
          isCurrent: item?.jobTitle || "",
          company: item?.company || "",
          endmonth: item?.endmonth || "",
          endyear: item?.endyear || "",
          startyear: item?.startyear || "",
          startmonth: item?.startmonth || "",
          description: item?.description || "",
          isCurrent: item?.isCurrent || "",
        })),
      });
    }
  };

  useEffect(() => {
    if (formData?.experienceValues) {
      updateData(formData.experienceValues);
    }
  }, [formData.experienceValues]);

  const [checked, setChecked] = useState(true);

  const [inputValue, setInputValue] = useState("");

  const handleInput = (event, index) => {
    const bullet = "\u2022";
    const newValue = event.target.value;
    const newLength = newValue.length;
    const characterCode = newValue.substr(-1).charCodeAt(0);

    // If the user pressed Enter (newline)
    if (newValue.endsWith("\n") && !newValue.endsWith(bullet + " \n")) {
      formik.setFieldValue(
        `experienceList[${index}].description`,
        newValue + bullet + " "
      );
    }
    // If it's the first character typed, prepend a bullet
    else if (
      newLength === 1 &&
      newValue !== values.experienceList[index].description
    ) {
      formik.setFieldValue(
        `experienceList[${index}].description`,
        `${bullet} ${newValue}`
      );
    }
    // Update state for regular typing
    else {
      formik.setFieldValue(`experienceList[${index}].description`, newValue);
    }
  };
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
        <p className="text-[32px] font-[500]">Work Experience</p>
        <p className="text-sm  ">
          Narrate your professional endeavours and milestones to showcase your
          skills, achievements, and career progress.
        </p>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name="experienceList"
            render={(arrayHelpers) => (
              <>
                {values?.experienceList?.map((_, index) => (
                  <div key={index} className="">
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
                    <div className="w-full flex flex-col items-start gap-1 my-8">
                      <AuthInput
                        name={`experienceList[${index}].jobTitle`}
                        id={`experienceList[${index}].jobTitle`}
                        value={values.experienceList[index].jobTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"Enter Job Title"}
                        text={"Job Title"}
                      />
                      {errors.experienceList?.[index]?.jobTitle &&
                        touched.experienceList?.[index]?.jobTitle && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.experienceList[index].jobTitle}
                          </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col items-start gap-1 my-8">
                      <AuthInput
                        name={`experienceList[${index}].company`}
                        id={`experienceList[${index}].company`}
                        value={values.experienceList[index].company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"Enter Company Name"}
                        text={"Company"}
                      />
                      {errors.experienceList?.[index]?.company &&
                        touched.experienceList?.[index]?.company && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.experienceList[index].company}
                          </span>
                        )}
                    </div>

                    <div className="w-full flex gap-4">
                      <div className="w-1/2">
                        <MonthsInput
                          name={`experienceList[${index}].startmonth`}
                          id={`experienceList[${index}].startmonth`}
                          value={values.experienceList[index].startmonth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label={"Start date"}
                          options={[
                            { value: "January", label: "January" },
                            { value: "February", label: "February" },
                            { value: "March", label: "March" },
                            { value: "April", label: "April" },
                            { value: "May", label: "May" },
                            { value: "June", label: "June" },
                            { value: "July", label: "July" },
                            { value: "August", label: "August" },
                            { value: "September", label: "September" },
                            { value: "October", label: "October" },
                            { value: "November", label: "November" },
                            { value: "December", label: "December" },
                          ]}
                        />
                        {errors.experienceList?.[index]?.startmonth &&
                          touched.experienceList?.[index]?.startmonth && (
                            <span className="text-red-700 text-sm font-medium">
                              {errors.experienceList[index].startmonth}
                            </span>
                          )}
                      </div>
                      <div className="w-1/2 mt-6">
                        <MonthsInput
                          name={`experienceList[${index}].startyear`}
                          id={`experienceList[${index}].startyear`}
                          value={values.experienceList[index].startyear}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={getYearsArray()}
                        />
                        {errors.experienceList?.[index]?.startyear &&
                          touched.experienceList?.[index]?.startyear && (
                            <span className="text-red-700 text-sm font-medium">
                              {errors.experienceList[index].startyear}
                            </span>
                          )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center my-2">
                        <input
                          type="checkbox"
                          name={`experienceList[${index}].isCurrent`}
                          id={`experienceList[${index}].isCurrent`}
                          value={values.experienceList[index].isCurrent}
                          checked={values.experienceList[index].isCurrent}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFieldValue(
                              `experienceList[${index}].isCurrent`,
                              isChecked
                            );
                            if (isChecked) {
                              setCustomErrors((prevErrors) => {
                                const updatedErrors = { ...prevErrors };
                                delete updatedErrors[
                                  `experienceList[${index}].endmonth`
                                ];
                                delete updatedErrors[
                                  `experienceList[${index}].endyear`
                                ];
                                return updatedErrors;
                              });
                            }
                          }}
                          className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-sm checked:bg-blue-900 
      checked:border-transparent focus:outline-none transition duration-300 ease-in-out relative"
                        />
                        <label htmlFor="some_id" className="ml-2 text-gray-600">
                          I am currently in this role
                        </label>

                        <style jsx>{`
                          input[type="checkbox"]:checked::before {
                            content: "\\2714";
                            color: white;
                            position: absolute;
                            top: 0px;
                            left: 0px;
                            font-size: 10px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                          }
                        `}</style>
                      </div>
                    </div>

                    {!values.experienceList[index].isCurrent && (
                      <div className="w-full flex gap-4 mt-4">
                        <div className="w-1/2">
                          <MonthsInput
                            label={"End Date"}
                            name={`experienceList[${index}].endmonth`}
                            id={`experienceList[${index}].endmonth`}
                            value={values.experienceList[index].endmonth}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={[
                              { value: "January", label: "January" },
                              { value: "February", label: "February" },
                              { value: "March", label: "March" },
                              { value: "April", label: "April" },
                              { value: "May", label: "May" },
                              { value: "June", label: "June" },
                              { value: "July", label: "July" },
                              { value: "August", label: "August" },
                              { value: "September", label: "September" },
                              { value: "October", label: "October" },
                              { value: "November", label: "November" },
                              { value: "December", label: "December" },
                            ]}
                          />
                          {customErrors[
                            `experienceList[${index}].endmonth`
                          ] && (
                            <span className="text-red-700 text-sm font-medium">
                              {
                                customErrors[
                                  `experienceList[${index}].endmonth`
                                ]
                              }
                            </span>
                          )}
                        </div>
                        <div className="w-1/2 mt-6">
                          <MonthsInput
                            name={`experienceList[${index}].endyear`}
                            id={`experienceList[${index}].endyear`}
                            value={values.experienceList[index].endyear}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={getYearsArray()}
                          />
                          {customErrors[`experienceList[${index}].endyear`] && (
                            <span className="text-red-700 text-sm font-medium">
                              {customErrors[`experienceList[${index}].endyear`]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="w-full flex flex-col items-start gap-1 my-8">
                      <label className="text-sm font-medium">Description</label>
                      <textarea
                        rows="4"
                        name={`experienceList[${index}].description`}
                        className="w-full border rounded-xl px-3 py-3 text-sm bg-transparent border-gray-700 focus:ring-gray-700 focus:border-gray-700 outline-gray-700"
                        placeholder="Describe your role"
                        value={values.experienceList[index].description}
                        onChange={(e) => handleInput(e, index)}
                        onBlur={handleBlur}
                      />
                      {errors.experienceList?.[index]?.description &&
                        touched.experienceList?.[index]?.description && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.experienceList[index].description}
                          </span>
                        )}
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
                          jobTitle: "",
                          company: "",
                          startmonth: "",
                          startyear: "",
                          endmonth: "",
                          endyear: "",
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
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Experience;
