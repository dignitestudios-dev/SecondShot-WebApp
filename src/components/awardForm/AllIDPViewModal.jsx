import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { RxCross2 } from "react-icons/rx";
import jsPDF from "jspdf";
import {
  ChampionAward,
  Downloadimg,
  FameAward,
  GameTime,
  PlaybookAward,
  Printimg,
  Rookieaward,
  Shareimg,
} from "../../assets/export";
const AllIDPViewModal = ({
  showModal,
  onClose,
  handleClick,
  answer,
  cardDataQuestion,
  idpData,
}) => {
  const ImagesArray = [
    Rookieaward,
    GameTime,
    PlaybookAward,
    ChampionAward,
    FameAward,
  ];
  const combinedData = idpData?.data?.map((item, index) => ({
    question: item?.question?.question,
    answer: item?.answer,
    image: ImagesArray[index],
  }));
  console.log(combinedData, "combinedData");
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;
  
    combinedData.forEach((item, index) => {
      // Add image (optional)
      if (item.image) {
        const img = new Image();
        img.src = item.image;
  
        // Note: draw image only if enough space, else go to new page
        if (y + 50 > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
  
        doc.addImage(img, "PNG", 15, y, 40, 40);
        y += 50;
      }
  
      // Add Question
      const questionLines = doc.splitTextToSize(`Q${index + 1}: ${item.question}`, 180);
      if (y + questionLines.length * 10 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(questionLines, 15, y);
      y += questionLines.length * 10 + 5;
  
      // Add Answer
      if (Array.isArray(item.answer)) {
        item.answer.forEach((ans) => {
          const answerLines = doc.splitTextToSize(`• ${ans}`, 180);
          if (y + answerLines.length * 10 > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(answerLines, 20, y);
          y += answerLines.length * 10;
        });
      } else if (item.answer) {
        const answerLines = doc.splitTextToSize(`A: ${item.answer}`, 180);
        if (y + answerLines.length * 10 > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(answerLines, 15, y);
        y += answerLines.length * 10;
      } else {
        doc.setTextColor(150, 150, 150);
        if (y + 10 > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text("No answer provided", 15, y);
        y += 10;
      }
  
      y += 10; // Space after each Q&A block
    });
  
    doc.save("IDP_Report.pdf");
  };
  
  

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
           <div className="bg-white z rounded-xl shadow-custom-shadow w-[471px] p-4 relative max-h-[90vh] overflow-y-auto"   id="idp-pdf-content">
            <div onClick={onClose} className="flex justify-end cursor-pointer">
              <RxCross2 />
            </div>

            <div className="px-4 pt-2 pb-2 mt-4">
              {combinedData?.map((item, index) => (
                <div key={item.question._id} className="mb-6 border-b pb-5 ">
                  <div className="flex justify-center">
                    {ImagesArray[index] && (
                      <img
                        src={ImagesArray[index]}
                        alt="award"
                        className="w-[120px] h-[120px] mb-2"
                      />
                    )}
                  </div>

                  {/* Question */}
                  <h2 className="text-[13px] font-[500] text-[#181818] pb-2">
                    {item?.question}
                  </h2>


                  {Array.isArray(item?.answer) ? (
                    <ul className="list-disc ml-5 text-sm text-gray-700">
                      {item?.answer?.map((ans, i) => (
                        <li key={i}>{ans}</li>
                      ))}
                    </ul>
                  ) : item?.answer ? (
                    <p className="text-sm text-gray-700">{item.answer}</p>
                  ) : (
                    <p className="text-sm italic text-gray-400">
                      No answer provided
                    </p>
                  )}
                </div>
              ))}

              <div className="mt-5">
                <AuthSubmitBtn
                  text={"Download"}
                  handleSubmit={handleDownload}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllIDPViewModal;
