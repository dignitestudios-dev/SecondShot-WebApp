import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ViewResume = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        />
        <ResumeDeleteModal showModal={showDelete} onclick={handleDeleteModal} />
        <div>
          <h1 className="text-[32px] font-[500] text-[#000000]">
          Your Personalized Resume
          </h1>
        </div>
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
            <AuthSubmitBtn text={"Email It To Yourself"} />
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
      </div>
      <PersonalizedCV />
    </div>
  );
};

export default ViewResume;
