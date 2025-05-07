import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { RxCross2 } from "react-icons/rx";
import jsPDF from "jspdf";

const ViewModal = ({
  showModal,
  onClose,
  handleClick,
  passData,
  passimg,
  passQuestion,
}) => {
  const handleDownload = async () => {
    const doc = new jsPDF();

    // Convert image URL to base64
    const toDataURL = (url) =>
      fetch(url)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    const imgData = await toDataURL(passimg);

    // Add image to PDF
    doc.addImage(imgData, "PNG", 85, 15, 40, 40);

    // Title
    doc.setFontSize(16);
    doc.text("Second Shot IDP", 105, 65, { align: "center" });

    // Add passQuestion
    // Add passQuestion with word wrap
    doc.setFontSize(14);
    const wrappedQuestion = doc.splitTextToSize(passQuestion, 170); // 170 is max width in mm
    doc.text(wrappedQuestion, 20, 85);

    // Add passData
    doc.setFontSize(12);
    if (Array.isArray(passData)) {
      passData.forEach((item, idx) => {
        doc.text(`• ${item}`, 20, 100 + idx * 10); // starts lower so doesn't overlap
      });
    } else {
      doc.text(`• ${passData}`, 20, 100);
    }

    doc.save("Second Shot IDP.pdf");
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm ">
          <div className="bg-white z rounded-xl shadow-custom-shadow w-[471px] p-4 relative">
            <div onClick={onClose} className="flex justify-end cursor-pointer">
              <RxCross2 />
            </div>
            <div className="flex justify-center mt-6">
              <img src={passimg} alt="logo" className=" w-[120px] h-[120px] " />
            </div>

            <div className="px-4 pt-2 pb-2 mt-4">
              <h2 className="text-[13px]  font-[500]  text-[#181818] pb-3">
                {passQuestion}
              </h2>
              {Array.isArray(passData) ? (
                <div className="flex flex-wrap border  p-2 rounded-md  gap-2">
                  {passData?.map((item, index) => (
                    <p className="bg-[#f3f4f6] break-all inline-block max-w-full border border-[#d1d5db] text-sm px-3 py-1 rounded-[8px] text-gray-700">
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="flex border  p-2 rounded-md ">
                  <p className="bg-[#f3f4f6] break-all inline-block max-w-full border border-[#d1d5db] text-sm px-3 py-1 rounded-[8px] text-gray-700">
                    {passData}
                  </p>
                </div>
              )}

              <div className="mt-5">
                <AuthSubmitBtn
                  text={"Download"}
                  handleSubmit={() => handleDownload()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
