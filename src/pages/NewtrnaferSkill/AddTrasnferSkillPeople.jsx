import React, { useContext, useEffect, useState } from "react";

import axios from "../../axios";

import { useNavigate } from "react-router-dom";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { phoneFormater } from "../lib/helper";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { downloadCombinedPDF, downloadSendCombinedPDF } from "../../lib/utils";
import { AuthContext } from "../../context/AuthContext";

const AddTrasnferSkillPeople = ({
  showModal,
  handleClick,
  setShowPeopleModal,
  resumeData,
  formData,
  setFormData,
  supportresumeId,
  transferpdfId,
  transferId,
  InputDataSupport,
  gettransferableskill,
}) => {
  const supportData = InputDataSupport;

  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [inputData, setInputData] = useState({
    fullname: formData.fullname || supportData[0]?.full_name || "",
    email: formData.email || supportData[0]?.email_address || "",
    phone: "",
    fullname_2: formData.fullname_2 || supportData[1]?.full_name || "",
    email_2: formData.email_2 || supportData[1]?.email_address || "",
    phone_2: "",
  });

  const [disableFullname1, setDisableFullname1] = useState(false);
  const [disableFullname2, setDisableFullname2] = useState(false);

  useEffect(() => {
    if (supportData?.support_people?.length > 0) {
      setDisableFullname1(!!supportData.support_people[0]?.full_name);
      setDisableFullname2(!!supportData.support_people[1]?.full_name);
      setSecondSupportActive(true);

      setInputData({
        fullname:
          formData.fullname || supportData.support_people[0]?.full_name || "",
        email:
          formData.email || supportData.support_people[0]?.email_address || "",
        phone: "Default",
        fullname_2:
          formData.fullname_2 || supportData.support_people[1]?.full_name || "",
        email_2:
          formData.email_2 ||
          supportData.support_people[1]?.email_address ||
          "",
        phone_2: "Default",
      });
    }
  }, [supportData]);
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

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "fullname":
        if (!value) errorMessage = "Full name is required.";
        break;
      case "email":
        if (!value) {
          errorMessage = "Email address is required.";
        } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
          // This regex ensures that there is only one "@" symbol and a valid domain format
          errorMessage = "Enter a valid email.";
        }
        break;
     
      

      case "fullname_2":
        if (secondSupportActive && !value)
          errorMessage = "Full name is required.";
        break;
      case "email_2":
        if (secondSupportActive && !value) {
          errorMessage = "Email address is required.";
        } else if (secondSupportActive && !/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
          // Apply the same email validation for second email
          errorMessage = "Enter a valid email .";
        } else if (secondSupportActive && value === inputData.email) {
          errorMessage = "Email addresses cannot be the same.";
        }
        break;

     
      default:
        break;
    }

    return errorMessage;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } });
    }
  };

  const handlePhoneChangetwo = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } });
    }
  };
  const { subscriptionpaid, profilepic, profilename } = useContext(AuthContext);

  const handleSubmit = async (e, filename) => {
    e.preventDefault();

    const newErrors = {};
    const allFields = Object.keys(inputData);

    allFields.forEach((field) => {
      const errorMessage = validateField(field, inputData[field]);

      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const supportPeople = [
      {
        full_name: inputData.fullname,
        email_address: inputData.email,
        phone_number: "Default",
      },
    ];

    if (inputData.fullname_2 && inputData.email_2 && inputData.phone_2) {
      supportPeople.push({
        full_name: inputData.fullname_2,
        email_address: inputData.email_2,
        phone_number: "Default",
      });
    }

    setLoading(true);

    try {
      const element = transferpdfId;

      // Get the PDF blob from the modified function
      const pdfBlob = await downloadSendCombinedPDF(
        InputDataSupport,
        "download-skills",
        filename,
        setDownloading,
        subscriptionpaid,
        profilename
      );

      if (!pdfBlob) {
        console.error("Failed to generate PDF blob");
        return;
      }

      const formData = new FormData();
      formData.append("transferablleSkills", pdfBlob, "Second Shot Report.pdf");
      formData.append("supportPeople", JSON.stringify(supportPeople));

      const response = await axios.post(
        "/api/user/add-support-people-transferablleSkills",
        formData
      );

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setShowPeopleModal(false);
        gettransferableskill();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = ""));
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlenamePress = (e) => {
    if (!/[a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm ">
        <div className="bg-white rounded-xl shadow-lg w-[450px]  h-[640px] py-10 px-2 relative">
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
                  isDisabled={disableFullname1}
                  maxLength={30}
                  onkeypress={handlenamePress}
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
                  isDisabled={disableFullname1}
                  maxLength={254}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mx-2">{errors.email}</p>
                )}
                {/* <div className="w-full ">
                  <AuthInput
                    id={"phone"}
                    name={"phone"}
                    value={phoneFormater(inputData.phone || "")}
                    onChange={handlePhoneChange}
                    onBlur={handleBlur}
                    text={"Phone Number"}
                    placeholder={"Enter Phone Number"}
                    isDisabled={disableFullname1}
                    maxLength={14}
                    onkeypress={handleKeyPress}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mx-2">{errors.phone}</p>
                  )}
                </div> */}
              </div>

              <hr className="my-6 bg-slate-300" />

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
                  isDisabled={disableFullname2}
                  maxLength={30}
                  onkeypress={handlenamePress}
                />
                {errors.fullname_2 && (
                  <p className="text-red-500 text-sm mx-2">
                    {errors.fullname_2}
                  </p>
                )}
                <AuthInput
                  id={"email_2"}
                  name={"email_2"}
                  value={inputData.email_2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  text={"Email Address"}
                  placeholder={"Enter Email"}
                  isDisabled={disableFullname2}
                  maxLength={254}
                />
                {errors.email_2 && (
                  <p className="text-red-500 text-sm mx-2">{errors.email_2}</p>
                )}
                {/* <div className="w-full ">
                  <AuthInput
                    id={"phone_2"}
                    name={"phone_2"}
                    value={phoneFormater(inputData.phone_2 || "")}
                    onChange={handlePhoneChangetwo}
                    onBlur={handleBlur}
                    text={"Phone Number"}
                    placeholder={"Enter Phone Number"}
                    isDisabled={disableFullname2}
                    maxLength={14}
                    onkeypress={handleKeyPress}
                  />
                  {errors.phone_2 && (
                    <p className="text-red-500 text-sm mx-2">
                      {errors.phone_2}
                    </p>
                  )}{" "}
                </div> */}
                {/* <AuthInput
                    id={"phone_2"}
                    name={"phone_2"}
                    value={inputData.phone_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    text={"Phone Number"}
                    placeholder={"Enter Phone Number"}
                    isDisabled={disableFullname2}
                  />
                  {errors.phone_2 && (
                    <p className="text-red-500 text-sm mx-2">
                      {errors.phone_2}
                    </p>
                  )} */}
              </div>

              <div className="mt-2">
                <AuthSubmitBtn
                  text={"Submit"}
                  type={"submit"}
                  loading={loading}
                  disabled={disableFullname1 && disableFullname2}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTrasnferSkillPeople;
