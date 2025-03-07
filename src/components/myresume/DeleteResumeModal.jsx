import React, { useState } from "react";
import { DeleteIcon } from "../../assets/export";
import GrayBtn from "../onboarding/grayBtn";
import { FiLoader } from "react-icons/fi";

const ResumeDeleteModal = ({
  showModal,
  onclick,
  resumeId,
  handleDelete,
  loading,
  deleteloader,
}) => {
  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-[440px] p-4 relative">
          <button
            className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
            onClick={onclick}
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="my-8">
              <img
                src={DeleteIcon}
                className="w-[74px] h-[83px] "
                alt="delete"
              />
            </div>
            <div className="mb-4">
              <p className="text-[24px] font-[600]">Delete Resume</p>
              <p className="text-[#9A9A9A] font-[400] text-[16px] ">
                Are you sure you want to delete your resume?
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <GrayBtn text={"Cancel"} handleSubmit={() => onclick()} />
            <button
              onClick={() => {
                handleDelete(resumeId);
              }}
              className="w-full py-3 h-[49px] px-4 text-sm font-semibold   hover:bg-opacity-85  bg-[#FF0000] text-[16px] text-white leading-[21.6px] rounded-[8px]  mx-1"
            >
              <div className="flex items-center justify-center">
                <span className="mr-1">Yes</span>
                {deleteloader && <FiLoader className="animate-spin text-lg " />}
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ResumeDeleteModal;
