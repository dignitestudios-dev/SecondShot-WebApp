import React, { useRef, useState } from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import {
  Dottedvertical,
  Downloadimg,
  Printimg,
  Shareimg,
} from "../../assets/export";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ResumePage from "./ResumePage";

const ViewEditResume = ({
  formData,
  isPreview,
  handleModal,
  isOpen,
  setIsOpen,
  handleDownloadModal,
  handleShowPeopleModal,
  handleDeleteModal,
  setStep,
  isSkipped,
  handleSubmitData,
  loading
}) => {
  console.log(formData, "LastSteo");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <div>
      <div className="flex items-center gap-1 text-[12px] font-[600] leading-[19.32px] tracking-[11.5%] text-[#000000] cursor-pointer">
        {isPreview ? (
          ""
        ) : (
          <div className="flex items-center">
            <IoIosArrowBack className="font-[600]" onClick={() => setStep(8)} />
            <div onClick={() => setStep(8)}>BACK</div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          {isPreview ? (
            <h1 className="text-[32px] font-medium text-gray-800">
              Your Personalized Resume
            </h1>
          ) : (
            <h1 className="text-[32px] font-medium text-gray-800">
              Your Personalized Resume{" "}
            </h1>
          )}
        </div>
        {isPreview ? (
          <div className="flex items-center">
            <div className="p-2 mx-1 w-[47px] h-[49px] items-center flex justify-center bg-white shadow-sm rounded-lg cursor-pointer">
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
              <AuthSubmitBtn text={"Email it to yourself"} />
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
                    <p
                      href="#"
                      className="block px-4 py-2 text-[12px] text-[#000000] font-[400] border-b mx-1 cursor-pointer"
                      onClick={() => navigate(`/edit-resume/${resumeId}`)}
                    >
                      Edit{" "}
                    </p>
                    <p
                      onClick={handleDeleteModal}
                      href="#"
                      className="block px-4 py-2 text-[12px] text-[#000000]  font-[400] border-b mx-1 cursor-pointer"
                    >
                      Delete
                    </p>
                    <p
                      href="#"
                      className="block px-4 py-2 text-[12px] text-[#000000] font-[400] mx-1 cursor-pointer"
                    >
                      Create New{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-[145px] items-center">
            <AuthSubmitBtn
              text={"Save"}
              handleSubmit={() => handleSubmitData()}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Give this id */}
      <div id="download-resume" className="flex  justify-center">
        <ResumePage  formData={formData} />
      </div>
    </div>
  );
};

export default ViewEditResume;
