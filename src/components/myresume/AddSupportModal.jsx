import React, { useEffect, useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";

const AddSupportModal = ({
  showModal,
  handleClick,
  setShowPeopleModal,
  resumeId,
}) => {
  const [loading, setLoading] = useState(false);

  // State to track input values temporarily
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });
  const [secondSupportActive, setSecondSupportActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullname_2" && value) {
      setSecondSupportActive(true);
    } else if (name === "fullname_2" && !value) {
      setSecondSupportActive(false);
    }

    setInputData({
      ...inputData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "fullname":
        if (!value) errorMessage = "Full name is required.";
        break;
      case "email":
        if (!value) errorMessage = "Email address is required.";
        else if (!/\S+@\S+\.\S+/.test(value))
          errorMessage = "Enter a valid email.";
        break;
      case "phone":
        if (!value) errorMessage = "Phone number is required.";
        else if (!/^\d{10}$/.test(value))
          errorMessage = "Enter a valid phone number.";
        break;

      case "fullname_2":
        if (secondSupportActive && !value)
          errorMessage = "Full name for 2nd Support Person is required.";
        break;
      case "email_2":
        if (secondSupportActive && !value)
          errorMessage = "Email address for 2nd Support Person is required.";
        else if (secondSupportActive && !/\S+@\S+\.\S+/.test(value))
          errorMessage = "Enter a valid email for 2nd Support Person.";
        // Check if email and email_2 are the same
        else if (secondSupportActive && value === inputData.email) {
          errorMessage = "Email addresses cannot be the same.";
        }
        break;
      case "phone_2":
        if (secondSupportActive && !value)
          errorMessage = "Phone number for 2nd Support Person is required.";
        else if (secondSupportActive && !/^\d{10}$/.test(value))
          errorMessage = "Enter a valid phone number for 2nd Support Person.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFields = Object.keys(inputData);
    allFields.forEach((field) => validateField(field, inputData[field]));

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    const formattedData = {
      resumeId: resumeId,
      supportPeople: [
        {
          full_name: inputData.fullname,
          email_address: inputData.email,
          phone_number: inputData.phone,
        },
        {
          full_name: inputData.fullname_2,
          email_address: inputData.email_2,
          phone_number: inputData.phone_2,
        },
      ],
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/user/add-support-people",
        formattedData
      );

      if (response.data.success) {
        SuccessToast("Support people added successfully!");
        setShowPeopleModal(false);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="w-full flex flex-col items-start space-y-1 gap-1 my-2">
                <AuthInput
                  id={"fullname"}
                  name={"fullname"}
                  value={inputData.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  text={"Full Name"}
                  placeholder={"Enter Name"}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mx-2">{errors.fullname}</p>
                )}

                <AuthInput
                  id={"email"}
                  name={"email"}
                  value={inputData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  text={"Email Address"}
                  placeholder={"Enter Email"}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mx-2">{errors.email}</p>
                )}

                <AuthInput
                  id={"phone"}
                  name={"phone"}
                  value={inputData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  text={"Phone Number"}
                  placeholder={"Enter Phone Number"}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mx-2">{errors.phone}</p>
                )}
              </div>

              <hr className="my-6 bg-slate-300" />

              {/* 2nd Support Person */}
              <p className="text-[18px] font-[600] leading-[24.3px] ">
                2nd Support Person
              </p>
              <div className="w-full flex flex-col items-start space-y-4 gap-1 my-2">
                <AuthInput
                  id={"fullname_2"}
                  name={"fullname_2"}
                  value={inputData.fullname_2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  text={"Full Name"}
                  placeholder={"Enter Name"}
                />
                {errors.fullname_2 && (
                  <p className="text-red-500 text-sm mx-2">
                    {errors.fullname_2}
                  </p>
                )}

                <>
                  <AuthInput
                    id={"email_2"}
                    name={"email_2"}
                    value={inputData.email_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    text={"Email Address"}
                    placeholder={"Enter Email"}
                  />
                  {errors.email_2 && (
                    <p className="text-red-500 text-sm mx-2">
                      {errors.email_2}
                    </p>
                  )}

                  <AuthInput
                    id={"phone_2"}
                    name={"phone_2"}
                    value={inputData.phone_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    text={"Phone Number"}
                    placeholder={"Enter Phone Number"}
                  />
                  {errors.phone_2 && (
                    <p className="text-red-500 text-sm mx-2">
                      {errors.phone_2}
                    </p>
                  )}
                </>
              </div>

              <div className="mt-2">
                <AuthSubmitBtn
                  text={"Send"}
                  type={"submit"}
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddSupportModal;
