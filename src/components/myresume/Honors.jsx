import React, { useEffect, useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import MonthsInput from "../Global/MonthsInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { honorsSchema } from "../../Schema/resumeSchema";
import { getStartYearsArray } from "../../pages/lib/helper";
const Honors = ({
  nextStep,
  setFormData,
  formData,
  prevStep,
  setIsSkipped,
}) => {
  const formik = useFormik({
    initialValues: { honorsList: formData.honorsList },
    validationSchema: honorsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setFormData({ ...formData, honorsList: values?.honorsList });

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

  const handleAwardNameChange = (e, index) => {
    let input = e.target.value;

    input = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    formik.setFieldValue(`honorsList[${index}].awardName`, input);
  };
  const handleawardingChange = (e, index) => {
    let input = e.target.value;

    input = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    formik.setFieldValue(`honorsList[${index}].awardingOrganization`, input);
  };
  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-[500]">Honors & Awards</p>
        <p className="text-[16px] font-[400] ">
          Highlight your recognition and awards to showcase your achievements,
          distinguish your expertise, and demonstrate your professional
          excellence.
        </p>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name="honorsList"
            render={(arrayHelpers) => (
              <>
                {values?.honorsList?.map((education, index) => (
                  <div key={index} className="space-y-4 mt-4">
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
                    <div className="w-full flex flex-col items-start gap-1">
                      <AuthInput
                        text={"Award Name"}
                        id={`honorsList[${index}].awardName`}
                        name={`honorsList[${index}].awardName`}
                        value={values.honorsList[index].awardName}
                        onChange={(e) => handleAwardNameChange(e, index)}
                        onBlur={handleBlur}
                        placeholder={
                          "Enter Award Name (e.g., Employee of the Year, Academic Excellence Award)"
                        }
                        maxLength={50}
                      />
                      {errors.honorsList?.[index]?.awardName &&
                        touched.honorsList?.[index]?.awardName && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.honorsList[index].awardName}
                          </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col items-start gap-1">
                      <AuthInput
                        id={`honorsList[${index}].awardingOrganization`}
                        name={`honorsList[${index}].awardingOrganization`}
                        value={values.honorsList[index].awardingOrganization}
                        text={"Awarding Organization or Institution"}
                        onChange={(e) => handleawardingChange(e, index)}
                        onBlur={handleBlur}
                        placeholder={"ABC Company"}
                        maxLength={50}
                      />
                      {errors.honorsList?.[index]?.awardingOrganization &&
                        touched.honorsList?.[index]?.awardingOrganization && (
                          <span className="text-red-700 text-sm font-medium">
                            {errors.honorsList[index].awardingOrganization}
                          </span>
                        )}
                    </div>

                    <div className="w-full flex items-end gap-4 mt-4">
                      <div className="w-1/2">
                        <div className="">
                          <MonthsInput
                            label={"Date Received"}
                            id={`honorsList[${index}].receivedmonth`}
                            name={`honorsList[${index}].receivedmonth`}
                            value={values.honorsList[index].receivedmonth}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="">
                          <MonthsInput
                            id={`honorsList[${index}].receivedyear`}
                            name={`honorsList[${index}].receivedyear`}
                            value={values.honorsList[index].receivedyear}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={getStartYearsArray(1990)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        {errors.honorsList?.[index]?.receivedmonth &&
                          touched.honorsList?.[index]?.receivedmonth && (
                            <span className="text-red-700 text-sm font-medium block">
                              {errors.honorsList[index].receivedmonth}
                            </span>
                          )}
                      </div>
                      <div className="w-1/2">
                        {errors.honorsList?.[index]?.receivedyear &&
                          touched.honorsList?.[index]?.receivedyear && (
                            <span className="text-red-700 text-sm font-medium block">
                              {errors.honorsList[index].receivedyear}
                            </span>
                          )}
                      </div>
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
                        awardName: "",
                        awardingOrganization: "",
                        receivedmonth: "",
                        receivedyear: "",
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
        </Form>
      </FormikProvider>
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
  );
};

export default Honors;
