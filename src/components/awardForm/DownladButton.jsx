import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import { Downloadimg, Printimg } from "../../assets/export";
import {
  createPDFWithUserDataAndResume,
  downloadSendReportPDF,
} from "../../lib/idpUtils";
import AuthSubmitBtn from "../onboarding/AuthBtn";
const DownladButton = ({ idpData }) => {
  const [getSKill, setGetSkill] = useState(false);
  const [resume, setResume] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const pdf = createPDFWithUserDataAndResume(getSKill, resume, idpData);
    pdf.save("skills_and_resume.pdf");
  };

  const handleEmailSend = async () => {
    setEmailLoading(true);
    try {
      // Get the PDF blob from the modified function
      const pdfBlob = await downloadSendReportPDF(getSKill, resume, idpData);

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

  return (
    <div className="flex">
      <div
        onClick={() => handlePdf()}
        className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
      >
        <img
          className="w-[27.61px] h-[23px] "
          src={Printimg}
          title="Print Resume"
        />
      </div>
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
    </div>
  );
};

export default DownladButton;
