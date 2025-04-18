import React, { useEffect } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { informationSchema } from "../../Schema/resumeSchema";
import { phoneFormater } from "../../pages/lib/helper";

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

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters

    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } }); // Update raw value
      // Pass formatted value to the parent component
    }
  };
  const handleFullnameChange = (e) => {
    let input = e.target.value;

    input = input.replace(/\s{2,}/g, " ");
    input = input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    const regex = /^[A-Za-z\s-"']*$/;

    if (input.length >= 0 && !input.startsWith(" ") && regex.test(input)) {
      setFieldValue("fullname", input);
    } else {
    }
  };
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
            onChange={handleFullnameChange}
            placeholder={"Enter Your Name"}
            text={"Full Name"}
            maxLength={30}
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
            maxLength={254}
          />
          {errors.email && touched.email ? (
            <span className="text-red-700 text-sm font-medium">
              {errors.email}
            </span>
          ) : null}
        </div>
        <div className="w-full flex flex-col items-start gap-1 my-8">
          <div className="w-full">
            <label className="ml-1 text-[14px] font-medium text-[#181818] ">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={phoneFormater(values?.phoneNumber)}
              type="tel"
              maxLength={14}
              placeholder={"Enter Your Phone Number"}
              onBlur={handleBlur}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              className={`w-full p-3 outline-none font-[500] focus:border-[#0E73D0]  border border-[#9A9A9A] rounded-[15px] 
              placeholder:text-[16px] placeholder:font-[400] placeholder:text-[#181818] text-[#181818]
              } h-full px-3 text-sm font-medium`}
            />

            {errors.phoneNumber && touched.phoneNumber ? (
              <span className="text-red-700 text-sm font-medium">
                {errors.phoneNumber}
              </span>
            ) : null}
          </div>
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
            maxLength={50}
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
