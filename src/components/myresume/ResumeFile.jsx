import React, { useEffect, useState } from "react";
import {
  blueresumetem,
  Resume1,
  Resume2,
  resumetemplate,
} from "../../assets/export";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ResumeDeleteModal from "./DeleteResumeModal";
import AllResume from "./AllResume";
import { ErrorToast } from "../toaster/ToasterContainer";
import axios from "../../axios";
const ResumeFile = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => (prev === index ? null : index));
  };

  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResume = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/get-my-resumes");
      if (response?.status === 200) {
        setResume(response?.data?.data);
      }
    } catch (err) {
      ErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResume();
  }, []);

  const handleDelete = async (resume_id) => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/user/delete-resume", {
        data: { resume_id: resume_id },
      });

      if (response.status === 200) {
        setResume(resume.filter((item) => item._id !== resume_id));
      }
    } catch (err) {
      ErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            {[1, 2, 3, 4]?.map((item) => (
              <div className="bg-gray-200 rounded-[22px] h-[249px]  p-6 w-full max-w-sm flex flex-col justify-between">
                <div className="bg-gray-300 h-[40px] w-[60%] rounded-[10px] mb-4"></div>
                <div className="bg-gray-300 h-[30px] w-[80%] rounded-[10px] mb-2"></div>
                <div className="bg-gray-300 h-[20px] w-[90%] rounded-[10px] mb-2"></div>
                <div className="bg-gray-300 h-[50px] w-[100%] rounded-[10px] mb-2"></div>
              </div>
            ))}
          </>
        ) : (
          resume?.map((resumeData, index) => (
            <div
              key={index}
              className="bg-[#E8F5EA] w-full rounded-2xl p-4 shadow-lg relative"
            >
              <div className="absolute top-4 right-4">
                <FaEllipsisVertical
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setDropOpen(dropOpen === index ? null : index)}
                />

                {dropOpen === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 text-[14px] cursor-pointer"
                        onClick={() =>
                          navigate(`/edit-resume/${resumeData?._id}`)
                        }
                      >
                        Edit
                      </li>
                      <li
                        className="px-4 py-1 hover:bg-gray-100 text-[14px] cursor-pointer text-red-500"
                        onClick={() => setShowDelete(true)}
                      >
                        Delete
                      </li>
                    </ul>
                    <ResumeDeleteModal
                      showModal={showDelete}
                      onclick={() => setShowDelete(false)}
                      handleDelete={handleDelete}
                      resumeId={resumeData?._id}
                    />
                  </div>
                )}
              </div>
              <h2 className="text-[13px] font-[500] leading-[24.3px] mb-2 text-[#000000] text-left">
                {resumeData?.createdAt?.split("T")[0] || "Unknown Date"}
              </h2>

              <div
                className="imageBox w-full cursor-pointer"
                onClick={() => navigate(`/view-resume`, { state: resumeData })}
              >
                <div className="imageInn w-full">
                  <AllResume resume={resumeData} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumeFile;
