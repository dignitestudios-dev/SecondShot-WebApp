import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { certificationsValues } from "../../data/resumefield";
import { certificationSchema } from "../../Schema/resumeSchema";
import { getStartYearsArray, getYearsArray } from "../../pages/lib/helper";

const Licenses = ({
  nextStep,
  setFormData,
  formData,
  prevStep,
  setIsSkipped,
}) => {
  const formik = useFormik({
    initialValues: { certificationsList: formData.certificationsList },
    validationSchema: certificationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      setFormData({
        ...formData,
        certificationsList: values?.certificationsList,
      });

      nextStep();
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const handlecertificationChange = (e, index) => {
    let input = e.target.value;

    input = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    formik.setFieldValue(
      `certificationsList[${index}].certificationsname`,
      input
    );
  };
  const handleOrganizationChange = (e, index) => {
    let input = e.target.value;

    input = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    formik.setFieldValue(
      `certificationsList[${index}].issuingOrganization`,
      input
    );
  };

  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]">Licenses & Certifications</p>
        <p className="text-sm">
          List your relevant licenses and certifications to highlight your
          skills and qualifications. Include details like issuing organizations,
          dates, and credentials to strengthen your profile.
        </p>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name="certificationsList"
            render={(arrayHelpers) => (
              <>
                {values?.certificationsList?.map((_, index) => {
                  const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];

                  const getFilteredMonths = (
                    Issuemonth,
                    startYear,
                    selectedYear,
                    currentYear
                  ) => {
                    const startMonthIndex = months.indexOf(Issuemonth);
                    const currentMonthIndex = new Date().getMonth();

                    if (selectedYear > currentYear) {
                      return months;
                    } else if (selectedYear === currentYear) {
                      return months.slice(currentMonthIndex + 1);
                    } else if (selectedYear === startYear) {
                      return months.slice(startMonthIndex);
                    }

                    return months;
                  };

                  const filteredMonths = getFilteredMonths(
                    values.certificationsList[index].Issuemonth,
                    values.certificationsList[index].Issueyear,
                    values.certificationsList[index].expirationyear,
                    new Date().getFullYear()
                  );

                  return (
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
                          text={"Certification Name"}
                          id={`certificationsList[${index}].certificationsname`}
                          name={`certificationsList[${index}].certificationsname`}
                          value={
                            values.certificationsList[index].certificationsname
                          }
                          placeholder={"Enter Certification Name"}
                          onChange={(e) => handlecertificationChange(e, index)}
                          onBlur={handleBlur}
                          maxLength={50}
                        />
                        {errors.certificationsList?.[index]
                          ?.certificationsname &&
                          touched.certificationsList?.[index]
                            ?.certificationsname && (
                            <span className="text-red-700 text-sm font-medium">
                              {
                                errors.certificationsList[index]
                                  .certificationsname
                              }
                            </span>
                          )}
                      </div>
                      <div className="w-full flex flex-col items-start gap-1 my-8">
                        <AuthInput
                          id={`certificationsList[${index}].issuingOrganization`}
                          name={`certificationsList[${index}].issuingOrganization`}
                          value={
                            values.certificationsList[index].issuingOrganization
                          }
                          onChange={(e) => handleOrganizationChange(e, index)}
                          onBlur={handleBlur}
                          text={"Issuing Organization"}
                          placeholder={"Enter Issuing Organization"}
                          maxLength={50}
                        />
                        {errors.certificationsList?.[index]
                          ?.issuingOrganization &&
                          touched.certificationsList?.[index]
                            ?.issuingOrganization && (
                            <span className="text-red-700 text-sm font-medium">
                              {
                                errors.certificationsList[index]
                                  .issuingOrganization
                              }
                            </span>
                          )}
                      </div>

                      <div className="w-full mb-5 flex items-end  mt-8 gap-4">
                        <div className="flex gap-4 w-full">
                          <div className="w-1/2">
                            <MonthsInput
                              id={`certificationsList[${index}].Issuemonth`}
                              name={`certificationsList[${index}].Issuemonth`}
                              value={
                                values.certificationsList[index].Issuemonth
                              }
                              label={"Issue Date"}
                              onChange={handleChange}
                              options={[
                                { value: "", label: "Select Month" },
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
                            {errors.certificationsList?.[index]?.Issuemonth &&
                              touched.certificationsList?.[index]
                                ?.Issuemonth && (
                                <span className="text-red-700 text-sm font-medium">
                                  {errors.certificationsList[index].Issuemonth}
                                </span>
                              )}
                          </div>
                          <div className="w-1/2">
                            <MonthsInput
                              id={`certificationsList[${index}].Issueyear`}
                              name={`certificationsList[${index}].Issueyear`}
                              value={values.certificationsList[index].Issueyear}
                              onChange={handleChange}
                              options={getStartYearsArray(1990)}
                              label="Start Year"
                            />
                            {errors.certificationsList?.[index]?.Issueyear &&
                              touched.certificationsList?.[index]
                                ?.Issueyear && (
                                <span className="text-red-700 text-sm font-medium">
                                  {errors.certificationsList[index].Issueyear}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="w-full mb-5 flex items-end  mt-8 gap-4">
                        <div className="w-1/2">
                          <label htmlFor="">
                            {" "}
                            <span className="text-sm font-medium">
                              Expiration Date
                            </span>{" "}
                            <span className="text-[#9a9a9a] text-[14px] ">
                              (if applicable)
                            </span>{" "}
                          </label>
                          <MonthsInput
                            id={`certificationsList[${index}].expirationmonth`}
                            name={`certificationsList[${index}].expirationmonth`}
                            value={
                              values.certificationsList[index].expirationmonth
                            }
                            onChange={handleChange}
                            options={[
                              { value: "", label: "Select Month" },
                              ...filteredMonths.map((month) => ({
                                value: month,
                                label: month,
                              })),
                            ]}
                          />
                        </div>
                        <div className="w-1/2">
                          <MonthsInput
                            id={`certificationsList[${index}].expirationyear`}
                            name={`certificationsList[${index}].expirationyear`}
                            value={
                              values.certificationsList[index].expirationyear
                            }
                            onChange={handleChange}
                            options={getYearsArray(
                              values.certificationsList[index].Issueyear || 1990
                            )}
                            label="Expiration Year"
                            disabled={
                              !values.certificationsList[index].Issueyear
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center gap-1 mb-3 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
                  <div>
                    <IoIosArrowBack className="font-[600]" onClick={prevStep} />
                  </div>
                  <div onClick={prevStep}>BACK</div>
                </div>
                <div className=" flex gap-10 items-center mb-4">
                  <div className="w-36">
                    <AuthSubmitBtn text={"Next"} type={"submit"} />
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        arrayHelpers.push({
                          certificationsname: "",
                          issuingOrganization: "",
                          credentialId: "",
                          Issuemonth: "",
                          Issueyear: "",
                        })
                      }
                      type="button"
                      className="text-[16px] text-[#012C57] font-[500] leading-[21.6px]"
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </>
            )}
          />
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
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Licenses;
