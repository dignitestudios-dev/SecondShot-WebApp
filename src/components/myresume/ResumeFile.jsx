import React, { useState } from "react";
import { Resume1, Resume2 } from "../../assets/export";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ResumeFile = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handlePdfClick = () => {
    navigate("/view-resume");
  };
  return (
    <div>
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
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <h2 className="text-[18px] font-[500] leading-[24.3px] mb-2 text-[#000000] text-left">
                Resume Title
              </h2>

              <div
                className="relative w-full h-80 rounded-lg overflow-hidden bg-white cursor-pointer"
                onClick={handlePdfClick}
                style={{ padding: 0, margin: 0 }}
              >
                <img
                  src={index === 0 ? Resume1 : Resume2}
                  className="w-full h-full rounded-lg"
                  alt=""
                />

                <div
                  className="absolute inset-0 bg-transparent cursor-pointer"
                  onClick={handlePdfClick}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ResumeFile;
