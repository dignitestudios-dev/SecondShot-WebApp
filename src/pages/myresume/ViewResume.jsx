import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dottedvertical,
  Downloadimg,
  Printimg,
  Shareimg,
} from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import Backbutton from "../../components/Global/Backbutton";
import ResumeDownloadModal from "../../components/myresume/ResumeDownloadModal";
import AddSupportModal from "../../components/myresume/AddSupportModal";
import ResumeDeleteModal from "../../components/myresume/DeleteResumeModal";
import PersonalizedCV from "../../components/myresume/PersonalizedCV";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import axios from "../../axios";

const ViewResume = () => {
  const location = useLocation();
  const resumeData = location?.state;
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteloader, setdeleteloader] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    fullname_2: "",
    email_2: "",
    phone_2: "",
  });

  const handleDeleteFunction = async () => {
    setdeleteloader(true);
    try {
      const response = await axios.delete("/api/user/delete-resume", {
        data: { resume_id: resumeData?._id },
      });

      if (response.status === 200) {
        SuccessToast("Resume Deleted Successfully");
        navigate("/myresume");
      }
    } catch (err) {
      ErrorToast(err.message);
    } finally {
      setdeleteloader(false);
    }
  };

  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [showModalDownload, setShowModalDownload] = useState(false);
  const handleDownloadModal = () => {
    setShowModalDownload(!showModalDownload);
  };

  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const handleShowPeopleModal = () => {
    setShowPeopleModal(!showPeopleModal);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handlePrint = () => {
    const content = document.getElementById("download-resume").innerHTML;
    const originalContent = document.body.innerHTML;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Resume</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  const supportresumeId = document.getElementById("download-resume");
  
  const handleDownload = async (e, elementId, filename, email) => {
    e.preventDefault();
    setLoading(true);

    const element = document.getElementById("download-resume");
    if (!element) {
      console.error("Element not found");
      setLoading(false);
      return;
    }

    try {
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = "none"));

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();

      formData.append("resume", pdfBlob, filename);

      await axios.post("/api/user/send-to-email", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      SuccessToast("Resume emailed successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      ErrorToast("Failed to send email.");
    } finally {
      document
        .querySelectorAll(".pdf-exclude")
        .forEach((el) => (el.style.display = ""));

      setLoading(false);
      // onclick();
    }
  };

  return (
    <div className="">
      <Backbutton />
      <div className="flex justify-between items-start mb-8 mt-3">
        <ResumeDownloadModal
          showModal={showModalDownload}
          onclick={handleDownloadModal}
        />
        <AddSupportModal
          showModal={showPeopleModal}
          handleClick={handleShowPeopleModal}
          resumeData={resumeData}
          supportresumeId={supportresumeId}
          setShowPeopleModal={setShowPeopleModal}
          formData={formData}
          setFormData={setFormData}
        />
        <ResumeDeleteModal
          showModal={showDelete}
          onclick={handleDeleteModal}
          resumeId={resumeData?._id}
          handleDelete={handleDeleteFunction}
          deleteloader={deleteloader}
        />

        <div>
          <h1 className="text-[32px] font-[500] text-[#000000]">
            Your Personalized Resume
          </h1>
        </div>
        <div className="flex items-center">
          <div
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
            onClick={() => handlePrint()}
          >
            <img className="w-[27.61px] h-[23px] " src={Printimg} />
          </div>
          <div
            onClick={handleDownloadModal}
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
          >
            <img className="w-[12px] h-[18.38px] " src={Downloadimg} />
          </div>
          <div
            onClick={handleShowPeopleModal}
            className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer"
          >
            <img className="w-[21px] h-[17px] " src={Shareimg} />
          </div>
          <div className="w-[189px]">
            <AuthSubmitBtn
              text={"Email It To Yourself"}
              handleSubmit={handleDownload}
              loading={loading}
            />
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <img
              src={Dottedvertical}
              className="w-[20px] h-[20px]  cursor-pointer"
              alt=""
              onClick={toggleDropdown}
            />
            {isOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1" role="none">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 text-[14px] cursor-pointer"
                      onClick={() =>
                        navigate(`/edit-resume/${resumeData?._id}`)
                      }
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 text-[14px] cursor-pointer"
                      onClick={handleDeleteModal}
                    >
                      Delete
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 text-[14px] cursor-pointer"
                      onClick={() => navigate("/create-resume")}
                    >
                      Create New
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="download-resume">
        <PersonalizedCV resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ViewResume;
