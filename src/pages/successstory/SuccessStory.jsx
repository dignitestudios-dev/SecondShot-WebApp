import { FaSearch } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import {
  Pro1,
  Pro2,
  Pro3,
  Pro4,
  Pro5,
  Pro6,
  Pro7,
  Pro8,
  Profileimage,
} from "../../assets/export";
import WelcomeStoryModal from "../../components/successstory/WelcomeStoryModal";
import { ModalContext } from "../../context/GlobalContext";
import axios from "../../axios";
import Pagination from "../../components/pagination/pagination";
function SuccessStory() {
  const navigate = useNavigate();
  const { isFirst, setIsFirst } = useContext(ModalContext);

  const data = [
    {
      name: "Brittany Taylor",
      degree: "Ph.D. Professor and Biomedical Engineer Track Star",
      image: Pro1,
    },
    {
      name: "Laura Barnes",
      degree: "PAADS Athlete Development Specialist",
      image: Pro2,
    },
    {
      name: "William Scott",
      degree: "PhD, Teacher, Former NFL Player",
      image: Pro3,
    },
    {
      name: "John Womack III",
      degree: "Business Development, Football Player",
      image: Pro4,
    },
    {
      name: "Sanethia Thomas",
      degree: "Ph.D, Computer Science Professor, Basketball Player",
      image: Pro5,
    },
    {
      name: "Chris Doering",
      degree: "Real Estate Broker, Football Player",
      image: Pro6,
    },
    {
      name: "Ben Lok",
      degree: "Entrepreneur, Runner",
      image: Pro7,
    },
    {
      name: "Nouvelle Gonzalo",
      degree: "Lawyer, Volleyball Player",
      image: Pro8,
    },
  ];

  const [selected, setSelected] = useState("Matched Profiles");
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handleToggle = (option) => {
    setSelected(option);
  };
  const getsuccessstory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/get-success-stories?page=1"); // 🔥 await added

      if (response.status === 200) {
        setStories(response?.data?.data);
        setTotalPages(data?.data?.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getsuccessstory();
  }, []);
  console.log(stories, "stories");
  return (
    <div className="">
      <WelcomeStoryModal
        isOpen={isFirst.successstory}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            successstory: false,
          }));
        }}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800 leading-[43.2px] text-left ">
          Success Stories
        </h1>

        <div className="relative flex items-center w-auto gap-3">
          <SearchInput placeholder="Search" />
          <div className="flex items-center  h-[48px]   rounded-lg border border-[#012C57] px-0.5">
            <button
              onClick={() => handleToggle("Explore All Profiles")}
              className={`text-[14px] leading-[18.9px]  h-[42px]  px-4 rounded-l-lg font-[500] focus:outline-none ${
                selected === "Explore All Profiles"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Matched Profiles
            </button>
            <button
              onClick={() => handleToggle("Matched Profiles")}
              className={`text-[14px] leading-[18.9px]  px-4  h-[42px]  rounded-r-lg font-[500] focus:outline-none ${
                selected === "Matched Profiles"
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Explore All Profiles
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11 mt-16">
          {[...Array(stories.length || 8)]?.map((_, index) => (
            <div
              key={index}
              className="bg-[#F2F7FF] rounded-[12px] w-[280px]  p-4  h-[203px] flex flex-col items-center cursor-pointer animate-pulse"
            >
              <div className="relative -mt-12 mb-4">
                <div className="h-24 w-24 bg-gray-300 rounded-full"></div>{" "}
              </div>
              <h2 className="text-[20px] capitalize font-[600] text-[#012C57] bg-gray-300 w-2/3 h-5 rounded"></h2>
              <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center bg-gray-300 w-3/4 h-4 rounded"></h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11 mt-16">
          {stories?.map((item, index) => (
            <div
              onClick={() => navigate("/story-pro-detail", { state: { item } })}
              key={index}
              className="bg-[#F2F7FF] rounded-[12px] w-[280px]  p-4  h-[203px] flex flex-col items-center cursor-pointer"
            >
              <div className="relative -mt-12 mb-4">
                <img
                  src={item?.profile_img}
                  alt="Profile"
                  className="h-24 w-24 rounded-full "
                />
              </div>
              <h2 className="text-[20px] capitalize font-[600] text-[#012C57]">
                {item?.name}
              </h2>
              <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center">
                {item?.profession}
              </h3>
            </div>
          ))}
        </div>
      )}
      <div className="mt-11 absolute bottom-0 right-40">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default SuccessStory;
