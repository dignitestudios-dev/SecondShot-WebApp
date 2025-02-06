import React, { useEffect, useState } from "react";
import { Docblue, Docgray } from "../../assets/export";
import { IoCheckmarkSharp } from "react-icons/io5";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeDownloadModal = ({ showModal, onclick }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Initially no option selected
  const [loading, setloading] = useState(false); // Initially no option selected
  useEffect(() => {
    if (!showModal) {
      setSelectedOption(null); // Reset selected option when modal closes
    }
  }, [showModal]);
  const handleDownload = async (e, elementId, filename) => {
    e.preventDefault();
    setloading(true); // Start loading

    if (!selectedOption) {
      setloading(false); // Stop loading if no option selected
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found");
      setloading(false); // Stop loading on error
      return;
    }

    try {
      // Temporarily hide elements with the class 'pdf-exclude'
      const excludeElements = document.querySelectorAll(".pdf-exclude");
      excludeElements.forEach((el) => (el.style.display = "none"));

      // Capture the element as a canvas
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add remaining pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore visibility of the hidden elements
      document
        .querySelectorAll(".pdf-exclude")
        .forEach((el) => (el.style.display = ""));

      setloading(false); // Stop loading once download completes
      onclick(); // Close the modal
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[471px] p-4 relative">
          <button
            className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
            onClick={onclick}
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-semibold mb-8">
              Choose Your File Format
            </h2>

            <div className="flex space-x-4 mb-6">
              <div
                onClick={() => setSelectedOption("google")}
                className={`border rounded-lg p-4 w-[208px] h-[208px] flex flex-col justify-center items-center cursor-pointer ${
                  selectedOption === "google"
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={selectedOption === "google" ? Docblue : Docgray}
                  alt="Google Icon"
                  className="w-[43.42px] h-[59.37px] mb-2"
                />
                <p
                  className={`text-[16px] font-[400] ${
                    selectedOption === "google"
                      ? "text-[#000000]"
                      : "text-[#858585]"
                  }`}
                >
                  PDF File
                </p>
                <div
                  className={`text-[16px] font-[400] absolute top-24 left-[314px] w-5 h-5 rounded-full ${
                    selectedOption === "google"
                      ? "bg-[#012C57]"
                      : "bg-transparent border-2 border-[#D9D9D9]"
                  }`}
                >
                  {selectedOption === "google" && (
                    <div className="absolute top-[-1px] w-[24px] h-[24px] right-[10px] left-[-1px] flex justify-center items-center">
                      <IoCheckmarkSharp color="white" size={"14px"} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <AuthSubmitBtn
              text={"Confirm"}
              disabled={!selectedOption}
              loading={loading}
              handleSubmit={(e) =>
                selectedOption &&
                handleDownload(e, "download-resume", "my-resume")
              }
            />

            {!selectedOption && (
              <p className="text-red-500 text-sm mt-2">
                Please select a file format before proceeding.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ResumeDownloadModal;
