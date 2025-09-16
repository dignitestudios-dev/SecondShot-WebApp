import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cameraicon, logo } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import PhoneInputs from "../../components/onboarding/PhoneInputs";
import SelectInput from "../../components/onboarding/SelectInput";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import axios from "../../axios";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { useFormik } from "formik";
import { EditProfileSchema } from "../../Schema/profileSchema";
import { AuthContext } from "../../context/AuthContext";
import { data } from "../../components/dataStateCity/data";
import { phoneFormater } from "../lib/helper";
const EditProfileDetails = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const profileData = location.state || {};
  const [loading, setLoading] = useState(false);
  const { setProfilepic } = useContext(AuthContext);
  const [schools, setSchools] = useState("");
  const getSchools = async () => {
    try {
      const response = await axios.get("/api/admin/schools");
      if (response?.status === 200) {
        setSchools(response?.data?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      fullname: profileData?.name || "",
      email: profileData?.email || "",
      phoneNumber: profileData?.phone?.replace(/^\+1/, "") || "",
      state: profileData?.state || "",
      city: profileData?.city || "",
      address: profileData?.address || "",
      profilePicture: null,
    },
    validationSchema: EditProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.fullname);
        formData.append("state", values.state);
        formData.append("city", values.city);
        formData.append("address", values.address || "");

        if (values.profilePicture) {
          formData.append("profile_img", values.profilePicture);
        }

        const response = await axios.put("/api/user/update-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          SuccessToast("Profile Updated Successfully");
          navigation("/my-profile");

          sessionStorage.setItem(
            "profilePicture",
            values.profilePicture
              ? URL.createObjectURL(values.profilePicture)
              : ""
          );
          setProfilepic(URL.createObjectURL(values.profilePicture));
        }
      } catch (err) {
        if (err?.response?.data?.message) {
          ErrorToast(err?.response?.data?.message);
        }
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
  const handleFullnameChange = (e) => {
    let input = e.target.value;

    input = input.replace(/\s{2,}/g, " ");

    const regex = /^[A-Za-z\s-"']*$/;

    if (input.length >= 0 && !input.startsWith(" ") && regex.test(input)) {
      setFieldValue("fullname", input);
    } else {
    }
  };

  useEffect(() => {
    setFieldValue("state", profileData?.state);
    setFieldValue("city", profileData?.city);
  }, [profileData]);

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
              Edit Profile Details
            </h1>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 gap-y-4 px-12 md:px-36 md:-mr-32 lg:px-28 lg:-mr-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative flex items-center justify-center w-[89px] h-[89px] border border-[#1F3A52] rounded-full overflow-hidden">
                {values?.profilePicture ? (
                  <img
                    src={URL.createObjectURL(values.profilePicture)}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={profileData?.profile_img || Cameraicon}
                    alt="Camera Icon"
                    className="object-cover w-full h-full"
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
              value={values.fullname}
              onChange={handleFullnameChange}
              onBlur={handleBlur}
              id={"fullname"}
              name={"fullname"}
            />
            {errors.fullname && touched.fullname && (
              <span className="text-red-700 text-sm font-medium">
                {errors.fullname}
              </span>
            )}
          </div>

          <div className="mt-3">
            <AuthInput
              type={"email"}
              value={values?.email}
              placeholder={"Email"}
              isDisabled
            />
          </div>
        </div>
        <div className="hidden md:block w-[1px] h-[70%] bg-gray-200 -ml-4 mt-10"></div>
        <div className="col-span-12 md:col-span-5 gap-y-4 px-12 md:px-36 md:-ml-52 lg:px-28 lg:-ml-48">
          <div className=" mt-5">
            <PhoneInputs
              name="phoneNumber"
              value={phoneFormater(values?.phoneNumber)}
              onChange={handleChange}
              isDisabled
            />
          </div>
          <div className="relative w-full mt-3 ">
            <SelectInput
              name="state"
              id="state"
              value={values?.state}
              onChange={(e) => {
                handleChange(e);
                // values.city = "";
                setFieldValue("city", "");
                setFieldTouched("state", true);
              }}
              options={[
                { value: "", label: "--Select State--" },
                ...Object.keys(data)
                  .sort()
                  .map((state) => ({
                    value: state,
                    label: state,
                  })),
              ]}
            />

            {errors.state && touched.state && (
              <span className="text-red-700 text-sm font-medium">
                {errors.state}
              </span>
            )}
          </div>
          <div className="relative w-full mt-3">
            <SelectInput
              name="city"
              id="city"
              value={values.city}
              onChange={(e) => {
                handleChange(e);
                setFieldValue("city", e.target.value); // City ka value update karo
                setFieldTouched("city", true);
              }}
              options={[
                { value: "", label: "--Select City--" },
                ...(Array.isArray(data[values.state])
                  ? data[values.state].sort().map((city) => ({
                      value: city,
                      label: city,
                    }))
                  : []),
              ]}
            />

            {errors.city && touched.city ? (
              <span className="text-red-700 text-sm font-medium">
                {errors.city}
              </span>
            ) : null}
          </div>

          <div className="relative mt-3">
            <SelectInput
              name="address"
              id="address"
              value={values.address}
              onChange={(e) => {
                handleChange(e);
              }}
              onBlur={handleBlur}
              options={[
                { value: "", label: "--Select School--" },
                ...(Array.isArray(schools)
                  ? schools.map((school) => ({
                      value: school.name,
                      label: school.name,
                    }))
                  : []),
              ]}
            />

            {errors.schools && touched.schools ? (
              <span className="text-red-700 text-sm font-medium">
                {errors.schools}
              </span>
            ) : null}
          </div>
        </div>
        <div className="col-span-12">
          <div className=" flex justify-center space-x-2 mb-6">
            <div className="w-[169px]">
              <button
                type="button"
                className="bg-gray-300 w-[169px]  h-[49px] rounded-[12px]  font-[500] "
                onClick={() => navigation(-1)}
              >
                Back
              </button>
            </div>
            <div className="w-[169px]">
              <AuthSubmitBtn text={"Save"} type={"submit"} loading={loading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileDetails;
