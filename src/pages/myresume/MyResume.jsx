import { useState } from "react";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import ResumeFile from "../../components/myresume/ResumeFile";
import WelcomeResumeModal from "../../components/myresume/WelcomeResumeModal";
import { useNavigate } from "react-router-dom";

function MyResume() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
const navigate =useNavigate()
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleNavigate = () => {
    navigate("/create-resume");
  };

  return (
    <div className="">
      <WelcomeResumeModal
        isOpen={isOpen}
        handleClick={() => setIsOpen(false)}
      />
      <div className="w-full mx-auto">
        <Backbutton />
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-[32px] font-[500] text-[#000000]">My Resume</h1>
          <div className="flex items-center">
            <SearchInput placeholder={"Search"} />
            <div className="border-l-2 border-gray-300 h-6 mx-4"></div>
            <div className="flex flex-col items-start">
              <button
                onClick={handleNavigate}
                className="text-[#012C57] font-bold"
              >
                + Create Resume
              </button>
              <span className="text-[14px] text-[#999999] font-[400] ">
                Need some inspiration?
              </span>
            </div>
          </div>
        </div>
        <ResumeFile />
      </div>
    </div>
  );
}

export default MyResume;
