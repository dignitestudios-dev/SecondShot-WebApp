import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import { Downloadimg, Printimg, Shareimg } from "../../assets/export";
import {
  createPDFWithUserDataAndResume,
  downloadSendReportPDF,
} from "../../lib/idpUtils";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import AddSupportIdp from "./AddSupportIdp";
import { AuthContext } from "../../context/AuthContext";
const DownladButton = ({ idpData, getMyIdp }) => {
  const [getSKill, setGetSkill] = useState(false);
  const [resume, setResume] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const { profilename } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    fullname_2: "",
    email_2: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    fullname_2: "",
    email_2: "",
  });
  const gettransferableskill = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/my-transferable-skills");
      if (response.status === 200) {
        setGetSkill(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const getResume = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/get-my-resumes");
      if (response?.status === 200) {
        setResume(response?.data?.data);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gettransferableskill();
    getResume();
  }, []);

  const handlePdf = async () => {
    const pdf = createPDFWithUserDataAndResume(
      getSKill,
      resume,
      idpData,
      profilename
    );
    pdf.save("Second Shot Full Report.pdf");
  };

  const handleEmailSend = async () => {
    setEmailLoading(true);
    try {
      // Get the PDF blob from the modified function
      const pdfBlob = await downloadSendReportPDF(
        getSKill,
        resume,
        idpData,
        profilename
      );

      if (!pdfBlob) {
        console.error("Failed to generate PDF blob");
        return;
      }

      const formData = new FormData();
      formData.append("idp-awards", pdfBlob, "Report.pdf");

      const response = await axios.post("/api/user/send-idp-form", formData);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
      }
    } catch (error) {
      console.log(error, "errorerror");
      ErrorToast(error?.response?.data?.message);
    } finally {
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = ""));
      setEmailLoading(false);
    }
  };
  const handleShowPeopleModal = () => {
    setShowPeopleModal(true);
  };

  return (
    <div className="flex">
      <div
        onClick={() => handleShowPeopleModal()}
        className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer  "
      >
        <img
          className="h-[20px] w-[20px] object-contain "
          src={Shareimg}
          title="Share"
        />
      </div>
      {/* <div
        onClick={() => handlePdf()}
        className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
      >
        <img
          className="w-[27.61px] h-[23px] "
          src={Printimg}
          title="Print"
        />
      </div> */}
      <div
        onClick={() => handlePdf()}
        className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
      >
        <img
          className="w-[12px] h-[18.38px] "
          src={Downloadimg}
          title="Download"
        />
      </div>
      <div className="w-[189px]">
        <AuthSubmitBtn
          text={"Email It To Yourself"}
          handleSubmit={() => handleEmailSend()}
          loading={emailLoading}
        />
      </div>
      <AddSupportIdp
        showModal={showPeopleModal}
        handleClick={() => setShowPeopleModal(false)}
        setShowModalsupport={setShowPeopleModal}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        goalDetail={idpData}
        idpData={idpData}
        resume={resume}
        getSKill={getSKill}
        isUpdate={true}
        getMyIdp={getMyIdp}
      />
    </div>
  );
};

export default DownladButton;
