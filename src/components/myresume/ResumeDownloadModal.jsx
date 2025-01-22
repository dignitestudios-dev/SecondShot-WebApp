import React, { useState } from "react";
import { Docblue, Docgray } from "../../assets/export";
import { IoCheckmarkSharp } from "react-icons/io5";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const ResumeDownloadModal = ({ showModal, onclick }) => {
  const [selectedOption, setSelectedOption] = useState("word");

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
                onClick={() => setSelectedOption("word")}
                className={`border rounded-lg w-[208px] h-[208px] p-4 flex flex-col justify-center items-center cursor-pointer ${
                  selectedOption === "word"
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={selectedOption === "word" ? Docblue : Docgray}
                  alt="Word Icon"
                  className="w-[43.42px] h-[59.37px] mb-2"
                />
                <p
                  className={`text-[16px] font-[500] ${
                    selectedOption === "word"
                      ? "text-[#000000]"
                      : "text-[#858585]"
                  }`}
                >
                  Word (Doc) File
                </p>
                <div
                  className={`text-[16px] font-[400] absolute top-24 right-0 left-[200px] w-5 h-5  rounded-full ${
                    selectedOption === "word"
                      ? "bg-[#012C57]"
                      : "bg-transparent border-2 border-[#D9D9D9]"
                  }`}
                >
                  {selectedOption === "word" && (
                    <div className="absolute top-[-1px] w-[24px] h-[24px] right-[10px] left-[-1px] flex justify-center items-center">
                      <IoCheckmarkSharp color="white" size={"14px"} />
                    </div>
                  )}
                </div>
              </div>

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
                  Google (Doc) File
                </p>
                <div
                  className={`text-[16px] font-[400] absolute top-24 left-[420px] w-5 h-5  rounded-full ${
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
            <AuthSubmitBtn text={"Confirm"} handleSubmit={() => onclick()} />
          </div>
        </div>
      </div>
    )
  );
};

export default ResumeDownloadModal;
