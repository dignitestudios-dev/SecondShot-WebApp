import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { useFormik } from "formik";
import { supportPeopleValues } from "../../data/gola";
import { supportPeopleSchema } from "../../Schema/goalSchema";

const AddSupportModal = ({
  showModal,
  handleClick,
  setFormData,
  formData,
  setShowModalsupport,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: supportPeopleValues,
    validationSchema: supportPeopleSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormData(values);
      setShowModalsupport(false);
    },
  });

  return (
    showModal && (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm ">
        <div className="bg-white rounded-xl shadow-lg w-[450px] h-[640px] py-10 px-2 relative">
          <button
            className="absolute top-0 right-2 text-[20px] text-gray-500 hover:text-gray-600"
            onClick={handleClick}
          >
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            <div className="h-[570px] px-3 overflow-auto">
              <div className="flex justify-center mt-3">
                <div>
                  <p className="text-[24px] text-center text-[#000000] font-[600]">
                    Add Support People
                  </p>
                  <p className="text-[16px] w-[376px] text-center font-[400] text-[#000000] leading-[21.6px] mt-2 mb-2 ">
                    Connect with individuals who can support you on your journey
                    towards achieving your goals.
                  </p>
                </div>
              </div>
              <p className="text-[18px] font-[600] leading-[24.3px] ">
                1st Support Person
              </p>
              <div className="w-full flex flex-col items-start space-y-4 gap-1 my-2">
                <AuthInput
                  id={"fullname"}
                  name={"fullname"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  text={"Full Name"}
                  placeholder={"Enter Name"}
                  error={errors.fullname || touched.fullname}
                />

                <AuthInput
                  id={"email"}
                  name={"email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  text={"Email Address"}
                  error={errors.email || touched.email}
                  placeholder={"Enter Email"}
                />
                <AuthInput
                  id={"phone"}
                  name={"phone"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  text={"Phone Number"}
                  placeholder={"Enter Phone Number"}
                  error={errors.phone || touched.phone}
                />
              </div>
              <div className="w-full flex flex-col items-start gap-1 my-2"></div>

              <hr className="my-6 bg-slate-300" />
              <p className="text-[18px] font-[600] leading-[24.3px] ">
                2nd Support Person
              </p>
              <div className="w-full flex flex-col items-start space-y-4 gap-1 my-2">
                <AuthInput
                  id={"fullname_2"}
                  name={"fullname_2"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname_2}
                  text={"Phone Number"}
                  placeholder={"Enter Phone Number"}
                  error={errors.fullname_2 || touched.fullname_2}
                />
                <AuthInput
                 id={"email_2"}
                 name={"email_2"}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.email_2}
                 text={"Phone Number"}
                 placeholder={"Enter Phone Number"}
                 error={errors.email_2 || touched.email_2}
                />
                <AuthInput
                  id={"phone_2"}
                  name={"phone_2"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_2}
                  text={"Phone Number"}
                  placeholder={"Enter Phone Number"}
                  error={errors.phone_2 || touched.phone_2}
                />
              </div>
              <div className="mt-2">
                <AuthSubmitBtn text={"Send"} type={"submit"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddSupportModal;
