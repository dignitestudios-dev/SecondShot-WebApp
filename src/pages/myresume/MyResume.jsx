import { useContext, useEffect, useState } from "react";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import ResumeFile from "../../components/myresume/ResumeFile";
import WelcomeResumeModal from "../../components/myresume/WelcomeResumeModal";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/GlobalContext";
import axios from "../../axios";
import StartResume from "./StartResume";
function MyResume() {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const { isFirst, setIsFirst } = useContext(ModalContext);

  const navigate = useNavigate();
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleNavigate = () => {
    navigate("/create-resume-info");
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

  return (
    <>
      {loading ? (
        <div className="flex gap-3">
          {[1, 2, 3, 4]?.map((item) => (
            <div className="bg-gray-200  rounded-[22px] h-[249px]  p-6 w-full max-w-sm flex flex-col justify-between">
              <div className="bg-gray-300 h-[40px] w-[60%] rounded-[10px] mb-4"></div>
              <div className="bg-gray-300 h-[30px] w-[80%] rounded-[10px] mb-2"></div>
              <div className="bg-gray-300 h-[20px] w-[90%] rounded-[10px] mb-2"></div>
              <div className="bg-gray-300 h-[50px] w-[100%] rounded-[10px] mb-2"></div>
            </div>
          ))}
        </div>
      ) : resume && resume.length > 0 ? (
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
              <h1 className="text-3xl font-semibold text-gray-800">
                My Resume
              </h1>
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
            <ResumeFile
              resume={resume}
              loading={loading}
              setLoading={setLoading}
              setResume={setResume}
            />
          </div>
        </div>
      ) : (
        <StartResume />
      )}
    </>
  );
}

export default MyResume;
