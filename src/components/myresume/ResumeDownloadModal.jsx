import React, { useEffect, useState } from "react";
import { Docblue, Docgray } from "../../assets/export";
import { IoCheckmarkSharp } from "react-icons/io5";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

const ResumeDownloadModal = ({ showModal, onclick, resumeData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showModal) setSelectedOption(null);
  }, [showModal]);

  // 📄 PDF DOWNLOAD FUNCTION
  const handleDownloadPDF = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) return console.error("Element not found");

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
    const paddingTop = 10;
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + paddingTop;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename || "resume.pdf");
    excludeElements.forEach((el) => (el.style.display = ""));
  };

  // 🟦 WORD DOWNLOAD FUNCTION
  const handleDownloadWord = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // ===== HEADER =====
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: resumeData?.full_name || "Your Name",
                    bold: true,
                    size: 36,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: `${resumeData?.email || ""}  |  ${
                      resumeData?.phone || ""
                    }  |  ${resumeData?.address || ""}`,
                    size: 22,
                  }),
                ],
              }),

              // ===== OBJECTIVE =====
              new Paragraph({
                text: "OBJECTIVE",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
                bold: true,
              }),
              new Paragraph({
                text: resumeData?.objective?.description || "",
                spacing: { after: 200 },
              }),

              // ===== EDUCATION =====
              ...(resumeData?.education?.length
                ? [
                    new Paragraph({
                      text: "EDUCATION",
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 200, after: 100 },
                      bold: true,
                    }),
                    ...resumeData.education.map(
                      (edu) =>
                        new Paragraph({
                          spacing: { after: 150 },
                          children: [
                            new TextRun({
                              text: `${edu.institution}`,
                              bold: true,
                              size: 26,
                            }),
                            new TextRun({
                              text: ` (${edu.start_year} - ${
                                edu.end_year || "Present"
                              })`,
                              italics: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: `\n${edu.degree}`,
                              size: 22,
                            }),
                          ],
                        })
                    ),
                  ]
                : []),

              // ===== CERTIFICATIONS =====
              ...(resumeData?.licenses_and_certifications?.length
                ? [
                    new Paragraph({
                      text: "CERTIFICATIONS",
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 200, after: 100 },
                      bold: true,
                    }),
                    ...resumeData.licenses_and_certifications.map(
                      (ctr) =>
                        new Paragraph({
                          spacing: { after: 100 },
                          children: [
                            new TextRun({
                              text: `• ${ctr.certification_name} `,
                              bold: true,
                            }),
                            new TextRun({
                              text: `(${
                                ctr.issue_date?.split("T")[0].split("-")[0]
                              }${
                                ctr.expiration_date
                                  ? " - " +
                                    ctr.expiration_date
                                      ?.split("T")[0]
                                      .split("-")[0]
                                  : ""
                              })`,
                              italics: true,
                            }),
                          ],
                        })
                    ),
                  ]
                : []),

              // ===== SKILLS =====
              ...(resumeData?.soft_skills?.length ||
              resumeData?.technical_skills?.length
                ? [
                    new Paragraph({
                      text: "SKILLS",
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 200, after: 100 },
                      bold: true,
                    }),
                    ...(resumeData?.soft_skills?.length
                      ? [
                          new Paragraph({
                            text: "Soft Skills:",
                            bold: true,
                            spacing: { after: 100 },
                          }),
                          new Paragraph({
                            text: resumeData.soft_skills.join("  •  "),
                            spacing: { after: 200 },
                          }),
                        ]
                      : []),
                    ...(resumeData?.technical_skills?.length
                      ? [
                          new Paragraph({
                            text: "Technical Skills:",
                            bold: true,
                            spacing: { after: 100 },
                          }),
                          new Paragraph({
                            text: resumeData.technical_skills.join("  •  "),
                            spacing: { after: 200 },
                          }),
                        ]
                      : []),
                  ]
                : []),

              // ===== WORK EXPERIENCE =====
              ...(resumeData?.experience?.length
                ? [
                    new Paragraph({
                      text: "WORK EXPERIENCE",
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 200, after: 100 },
                      bold: true,
                    }),
                    ...resumeData.experience.map(
                      (exp) =>
                        new Paragraph({
                          spacing: { after: 200 },
                          children: [
                            new TextRun({
                              text: `${exp.company} `,
                              bold: true,
                              size: 26,
                            }),
                            new TextRun({
                              text: `(${
                                exp.start_date?.split("T")[0].split("-")[0]
                              } - ${
                                exp.end_date
                                  ? exp.end_date?.split("T")[0].split("-")[0]
                                  : "Present"
                              })`,
                              italics: true,
                              size: 22,
                            }),
                            new TextRun({
                              text: `\n${exp.job_title}`,
                              bold: true,
                              size: 24,
                            }),
                            new TextRun({
                              text: `\n${exp.description}`,
                              size: 22,
                            }),
                          ],
                        })
                    ),
                  ]
                : []),

              // ===== VOLUNTEER EXPERIENCE =====
              ...(resumeData?.volunteer_experience?.length
                ? [
                    new Paragraph({
                      text: "VOLUNTEER SERVICE",
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 200, after: 100 },
                      bold: true,
                    }),
                    ...resumeData.volunteer_experience.map(
                      (vol) =>
                        new Paragraph({
                          spacing: { after: 200 },
                          children: [
                            new TextRun({
                              text: `${vol.organization_name} (${
                                vol.start_year
                              } - ${vol.end_year || "Present"})`,
                              bold: true,
                              size: 24,
                            }),
                            new TextRun({
                              text: `\n${vol.description}`,
                              size: 22,
                            }),
                          ],
                        })
                    ),
                  ]
                : []),

              // ===== HONORS =====
              ...(resumeData?.honors_and_awards?.length
                ? [
                    new Paragraph({
                      text: "HONORS & AWARDS",
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 200, after: 100 },
                      bold: true,
                    }),
                    ...resumeData.honors_and_awards.map(
                      (honor) =>
                        new Paragraph({
                          spacing: { after: 100 },
                          children: [
                            new TextRun({
                              text: `• ${honor.award_name} `,
                              bold: true,
                            }),
                            new TextRun({
                              text: `(${
                                honor.date_Received?.split("T")[0].split("-")[0]
                              })`,
                              italics: true,
                            }),
                          ],
                        })
                    ),
                  ]
                : []),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${resumeData?.full_name || "resume"}.docx`);
    } catch (error) {
      console.error("Error generating Word file:", error);
    }
  };

  // ✅ MAIN DOWNLOAD HANDLER (Decides which format to download)
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!selectedOption) return;
    setLoading(true);

    try {
      if (selectedOption === "pdf") {
        await handleDownloadPDF("download-resume", "my-resume.pdf");
      } else if (selectedOption === "docx") {
        await handleDownloadWord();
      }
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setLoading(false);
      onclick(); // close modal
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
  {/* Word Option */}
  <div
    onClick={() => setSelectedOption("docx")}
    className={`relative border rounded-lg p-4 w-[208px] h-[208px] flex flex-col justify-center items-center cursor-pointer transition-all ${
      selectedOption === "docx"
        ? "bg-blue-100 border-blue-500"
        : "border-gray-200"
    }`}
  >
    {/* ✅ Checkmark only visible when selected */}
    {selectedOption === "docx" && (
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#012C57] flex items-center justify-center">
        <IoCheckmarkSharp color="white" size={14} />
      </div>
    )}

    <img
      src={selectedOption === "docx" ? Docblue : Docgray}
      alt="Word Icon"
      className="w-[43px] h-[59px] mb-2"
    />
    <p
      className={`text-[16px] ${
        selectedOption === "docx" ? "text-[#000]" : "text-[#858585]"
      }`}
    >
      Word (DOCX)
    </p>
  </div>

  {/* PDF Option */}
  <div
    onClick={() => setSelectedOption("pdf")}
    className={`relative border rounded-lg p-4 w-[208px] h-[208px] flex flex-col justify-center items-center cursor-pointer transition-all ${
      selectedOption === "pdf"
        ? "bg-blue-100 border-blue-500"
        : "border-gray-200"
    }`}
  >
    {/* ✅ Checkmark only visible when selected */}
    {selectedOption === "pdf" && (
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#012C57] flex items-center justify-center">
        <IoCheckmarkSharp color="white" size={14} />
      </div>
    )}

    <img
      src={selectedOption === "pdf" ? Docblue : Docgray}
      alt="PDF Icon"
      className="w-[43px] h-[59px] mb-2"
    />
    <p
      className={`text-[16px] ${
        selectedOption === "pdf" ? "text-[#000]" : "text-[#858585]"
      }`}
    >
      PDF File
    </p>
  </div>
</div>


            <AuthSubmitBtn
              text={"Confirm"}
              loading={loading}
              disabled={!selectedOption}
              handleSubmit={handleConfirm}
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
