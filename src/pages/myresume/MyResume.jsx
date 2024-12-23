import { useContext, useState } from "react";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import ResumeFile from "../../components/myresume/ResumeFile";
import WelcomeResumeModal from "../../components/myresume/WelcomeResumeModal";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/GlobalContext";

function MyResume() {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const { isFirst, setIsFirst } = useContext(ModalContext);
  console.log(isFirst, "hhhh");

  const navigate = useNavigate();
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleNavigate = () => {
    navigate("/create-resume-info");
  };

  return (
    <div className="">
      <WelcomeResumeModal
        isOpen={isFirst.myresume}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            myresume: false,
          }));
        }}
      />
      <div className="w-full mx-auto">
      
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">My Resume</h1>
          <div className="flex items-center">
            <SearchInput placeholder={"Search"} />
            <div className="border-l-2 border-gray-300 h-6 mx-4"></div>
            <div className="flex flex-col items-start">
              <button
                onClick={handleNavigate}
                className="text-[#012C57] text-[18px] font-[600]"
              >
                + Create Resume
              </button>
            </div>
          </div>
        </div>
        <ResumeFile />
      </div>
    </div>
  );
}

export default MyResume;
