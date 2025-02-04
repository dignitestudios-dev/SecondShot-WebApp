import React, { useEffect } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { informationSchema } from "../../Schema/resumeSchema";

const Information = ({ nextStep, setFormData, formData }) => {
  const navigate = useNavigate();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: formData?.informationValues || {},
    validationSchema: informationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormData({ ...formData, informationValues: values });
  
      nextStep();
    },
  });

  const updateData = async (data) => {
    if (data) {
      setFieldValue("fullname", data?.fullname || "");
      setFieldValue("email", data?.email || "");
      setFieldValue("phoneNumber", data?.phoneNumber || "");
      setFieldValue("address", data?.address || "");
    }
  };

  useEffect(() => {
    formData?.informationValues && updateData(formData.informationValues);
  }, [formData]);

  return (
    <div className="pt-6 px-3">
      <div>
        <p className="text-[32px] font-medium"> Personal Information</p>
        <p className="text-sm ">
          We’ve collected your contact information from your profile. Feel free
          to make changes.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-start gap-1 my-8">
          <AuthInput
            id="fullname"
            name="fullname"
            value={values.fullname}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={"Enter Your Name"}
            text={"Full Name"}
          />
          {errors.fullname && touched.fullname ? (
            <span className="text-red-700 text-sm font-medium">
              {errors.fullname}
            </span>
          ) : null}
        </div>
        <div className="w-full flex flex-col items-start gap-1 my-8">
          <AuthInput
            id="email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={"Enter Your Email"}
            text={"Email Address"}
          />
          {errors.email && touched.email ? (
            <span className="text-red-700 text-sm font-medium">
              {errors.email}
            </span>
          ) : null}
        </div>
        <div className="w-full flex flex-col items-start gap-1 my-8">
          <AuthInput
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={"Enter Your Phone Number"}
            text={"Phone Number"}
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <span className="text-red-700 text-sm font-medium">
              {errors.phoneNumber}
            </span>
          ) : null}
        </div>
        <div className="w-full flex flex-col items-start gap-1 my-8">
          <label className="text-sm font-medium">
            Website <span className="text-gray-400">(Optional)</span>{" "}
          </label>
          <AuthInput
            id="address"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder={"Enter Your Website"}
          />
        </div>
        <div className="flex items-center mb-3 gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
          <div>
            <IoIosArrowBack
              className="font-[600]"
              onClick={() => navigate("/create-resume-info")}
            />
          </div>
          <div onClick={() => navigate("/create-resume-info")}>BACK</div>
        </div>
        <div className="w-36">
          <AuthSubmitBtn text={"Next"} type={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default Information;
