import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import { AuthContext } from "../../context/AuthContext";
import { downloadSendReportPDF } from "../../lib/idpUtils";

const AddSupportIdp = ({
  showModal,
  handleClick,
  formData,
  getMyIdp,
  getSKill,
  resume,
  idpData,
  setShowModalsupport,

}) => {
  const supportData = idpData?.support_people?.map((item) => item);
  const [secondSupportActive, setSecondSupportActive] = useState(false);
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [inputData, setInputData] = useState({
    fullname: formData.fullname || supportData[0]?.full_name || "",
    email: formData.email || supportData[0]?.email_address || "",

    fullname_2: formData.fullname_2 || supportData[1]?.full_name || "",
    email_2: formData.email_2 || supportData[1]?.email_address || "",
  });

  const [disableFullname1, setDisableFullname1] = useState(false);
  const [disableFullname2, setDisableFullname2] = useState(false);

  useEffect(() => {
    if (supportData.length > 0) {
      setDisableFullname1(!!supportData[0]?.full_name);
      setDisableFullname2(!!supportData[1]?.full_name);
      setSecondSupportActive(true);

      setInputData({
        fullname: formData.fullname || supportData[0]?.full_name || "",
        email: formData.email || supportData[0]?.email_address || "",

        fullname_2: formData.fullname_2 || supportData[1]?.full_name || "",
        email_2: formData.email_2 || supportData[1]?.email_address || "",
      });
    }
  }, []);
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    fullname_2: "",
    email_2: "",
  });

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
      },
    ];

    if (inputData.fullname_2 && inputData.email_2) {
      supportPeople.push({
        full_name: inputData.fullname_2,
        email_address: inputData.email_2,
      });
    }

    setLoading(true);
    try {
      // Get the PDF blob from the modified function
      const pdfBlob = await downloadSendReportPDF(getSKill, resume, idpData);

      if (!pdfBlob) {
        console.error("Failed to generate PDF blob");
        return;
      }

      const formData = new FormData();
      formData.append("idp-awards", pdfBlob, "Report.pdf");
      formData.append("supportPeople", JSON.stringify(supportPeople));
      const response = await axios.post(
        "/api/user/add-support-people-idp",
        formData
      );

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setShowModalsupport(false);
        getMyIdp();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = ""));

      setLoading(false);
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

export default AddSupportIdp;
