import React, { useState } from "react";
import { blueresumetem, Resume1, Resume2, resumetemplate } from "../../assets/export";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ResumeDeleteModal from "./DeleteResumeModal";

const ResumeFile = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => (prev === index ? null : index));
  };
  const handlePdfClick = () => {
    navigate("/view-resume");
  };
  return (
    <div>
      <ResumeDeleteModal
        showModal={showDelete}
        onclick={() => setShowDelete(false)}
      />

      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-[#E8F5EA]  w-full  rounded-2xl p-4 shadow-lg relative"
            >
              <div className="absolute top-4 right-4 cursor-pointer">
                <FaEllipsisVertical
                  className="text-gray-500"
                  onClick={() => toggleDropdown(index)}
                />
                {dropdownOpen === index && (
                  <div className="bg-white z-[5000] border rounded-lg shadow-lg mt-2 p-2 absolute right-0 w-32 text-left">
                    <ul>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                        Edit
                      </li>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => setShowDelete(true)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <h2 className="text-[13px] font-[500] leading-[24.3px] mb-2 text-[#000000] text-left">
                  July 01, 2024               </h2>
              <div class="imageBox cursor-pointer" onClick={()=>handlePdfClick()}>
                <div class="imageInn">
                  <img src={resumetemplate} alt="Default Image" />
                </div>
                <div class="hoverImg">
                  <img src={blueresumetem} alt="Profile Image" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ResumeFile;
