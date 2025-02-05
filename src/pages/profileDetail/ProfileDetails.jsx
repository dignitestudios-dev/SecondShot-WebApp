import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BgAuth, Cameraicon, logo } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import SelectInput from "../../components/onboarding/SelectInput";
import PhoneInputs from "../../components/onboarding/PhoneInputs";
import GrayBtn from "../../components/onboarding/grayBtn";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useFormik } from "formik";
import { profileValues } from "../../data/authentication";
import { profileSchema } from "../../Schema/profileSchema";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { ModalContext } from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
const ProfileDetails = () => {
  const navigation = useNavigate();
  const { setProfilepic } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const fullname = sessionStorage.getItem("fullname");
  const email = sessionStorage.getItem("email");
  const phoneNumber = sessionStorage
    .getItem("phoneNumber")
    ?.replace(/^\+1/, "");

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: profileValues,
    validationSchema: profileSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();

        formData.append("state", values.state);
        formData.append("city", values.country);
        formData.append("address", values.address);

        if (values.profilePicture) {
          formData.append("profile_img", values.profilePicture);
        }

        const response = await axios.post("/api/user/set-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          SuccessToast("Profile Created successfully");

          navigation("/registration-question");
          if (values.profilePicture) {
            const profileImageUrl = URL.createObjectURL(values.profilePicture);
            sessionStorage.setItem("profilePicture", profileImageUrl);
            setProfilepic(profileImageUrl);
          }
        }
      } catch (err) {
        ErrorToast(err?.response?.data?.message || "Failed to submit form");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePicture", file);
    }
  };

  return (
    <div className=" bg-transparent lg:h-screen h-full px-6 py-4">
      <form
        className="grid grid-cols-12 gap-2 md:gap-8 bg-white rounded-xl lg:px-32 lg:h-full h-screen relative"
        onSubmit={handleSubmit}
      >
        <div className="col-span-12 md:col-span-12 pt-8">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="object-cover w-[14%] lg:w-[10%]"
            />
          </div>
          <div className="mb-3">
            <h1 className="text-[40px] font-[600] leading-[54px] text-center">
              Complete Profile Details
            </h1>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 gap-y-4 px-12 md:px-36 md:-mr-32 lg:px-28 lg:-mr-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative flex items-center justify-center w-[89px] h-[89px] border border-[#1F3A52] rounded-full overflow-hidden">
                {values?.profilePicture ? (
                  <img
                    src={URL.createObjectURL(values?.profilePicture)}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={Cameraicon}
                    alt="Camera Icon"
                    className="w-[28px] h-[28px]"
                  />
                )}
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              <p className="text-[16px] font-[500] text-[#181818] leading-[20.4px]">
                Profile Picture
              </p>
            </div>
            <button className="text-[#0E73D0] hover:text-blue-700 font-medium relative">
              <input
                type="file"
                className="absolute mt-2 w-12 h-8 inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />
              Upload
            </button>
          </div>
          {errors.profilePicture && touched.profilePicture && (
            <span className="text-red-700 text-sm font-medium">
              {errors.profilePicture}
            </span>
          )}

          <div className="mt-3">
            <AuthInput
              type={"text"}
              placeholder={"First Name"}
              value={fullname}
              // isDisabled
            />
          </div>
          {/* <div className="mt-3">
            <AuthInput
              value={fullname}
              type={"text"}
              placeholder={"Last Name"}
              isDisabled
            />
          </div> */}
          <div className="mt-3">
            <AuthInput
              type={"email"}
              value={email}
              placeholder={"Email"}
              isDisabled
            />
          </div>
        </div>
        <div className="hidden md:block w-[1px] h-[70%] bg-gray-200 -ml-4 mt-10"></div>
        <div className="col-span-12 md:col-span-5 gap-y-4 px-12 md:px-36 md:-ml-52 lg:px-28 lg:-ml-48">
          <div className=" mt-5">
            <PhoneInputs value={phoneNumber} isDisabled />
          </div>
          <div className="relative w-full mt-3 ">
            <SelectInput
              name="country"
              id="country"
              value={values.country}
              onChange={handleChange}
              options={[
                { value: "", label: "Select State" },
                { value: "London", label: "London" },
              ]}
            />

            {errors.country && touched.country ? (
              <span className="text-red-700 text-sm font-medium">
                {errors.country}
              </span>
            ) : null}
          </div>
          <div className="relative w-full mt-3">
            <SelectInput
              name="state"
              id="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              options={[
                { value: "", label: "Select City" },
                { value: "Europe ", label: "Europe " },
              ]}
            />
            {errors.state && touched.state ? (
              <span className="text-red-700 text-sm font-medium">
                {errors.state}
              </span>
            ) : null}
          </div>
          <div className="mt-3">
            <AuthInput
              id="address"
              name="address"
              value={values.address}
              onBlur={handleBlur}
              type={"text"}
              placeholder={"Address"}
              onChange={handleChange}
            />
            {errors.address && touched.address ? (
              <span className="text-red-700 text-sm font-medium">
                {errors.address}
              </span>
            ) : null}
          </div>
        </div>
        <div className="col-span-12">
          <div className=" flex justify-center space-x-2 mb-6">
            {/* <div className="w-[169px] h-[49px]">
              <GrayBtn
                text={"Skip Now"}
                handleSubmit={() => navigation("/registration-question")}
              />
            </div> */}
            <div className="w-[169px]">
              <AuthSubmitBtn text={"Next"} type={"submit"} loading={loading} />
            </div>
          </div>
        </div>
      </form>
      <img
        src={BgAuth}
        alt="logo"
        className="absolute -bottom-4 -right-0 w-[24%]"
      />
    </div>
  );
};

export default ProfileDetails;
