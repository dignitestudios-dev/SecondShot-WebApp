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
  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGoals, setFilteredGoals] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create-resume-info");
  };
  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteloader, setdeleteloader] = useState(false);

  const getResume = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/get-my-resumes");
      if (response?.status === 200) {
        setResume(response?.data?.data);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResume();
  }, []);

  useEffect(() => {
    let filtered = resume;

    if (searchQuery) {
      filtered = resume.filter((item) => {
        const createdAt = new Date(item.createdAt);

        const formattedCreatedAt = createdAt.toISOString().split("T")[0];

        return formattedCreatedAt.includes(searchQuery);
      });
    }

    setFilteredGoals(filtered);
  }, [searchQuery, resume]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <WelcomeResumeModal
        isOpen={isFirst.myresume}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            myresume: false,
          }));
        }}
      />
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
          <div className="w-full mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                My Resume
              </h1>
              <div className="flex items-center">
                <SearchInput
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by date"
                />
                <div className="border-l-2 border-gray-300 h-6 mx-4"></div>
                <div className="flex flex-col items-start">
                  <button
                    onClick={handleNavigate}
                    className="text-[#012C57] text-[18px] font-[600]"
                  >
                    Create New Resume
                  </button>
                </div>
              </div>
            </div>
            <ResumeFile
              resume={filteredGoals}
              deleteloader={deleteloader}
              setdeleteloader={setdeleteloader}
              setResume={setResume}
              loading={loading}
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
