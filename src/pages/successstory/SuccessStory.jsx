import { useContext, useEffect, useState } from "react";
import SearchInput from "../../components/Global/SearchInput";
import WelcomeStoryModal from "../../components/successstory/WelcomeStoryModal";
import { ModalContext } from "../../context/GlobalContext";
import axios from "../../axios";
import Pagination from "../../components/pagination/pagination";
import ALLProfile from "../../components/successstory/ALLProfile";
import MatchedProfile from "../../components/successstory/MatchedProfile";
function SuccessStory() {
  const { isFirst, setIsFirst } = useContext(ModalContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchallQuery, setSearchallQuery] = useState("");
  const [filteredMatchedPro, setfilteredMatchedPro] = useState([]);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [matchedLoading, setmatchedLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [matchedProfile, setMatchedProfile] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handleToggle = (option) => {
    setSelected(option);
  };
  
  const getmatchedProfile = async () => {
    setmatchedLoading(true);
    try {
      const response = await axios.get("/api/user/my-match-profiles"); 
      if (response.status === 200) {
        setMatchedProfile(response?.data?.data);
        
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setmatchedLoading(false);
    }
  };

  useEffect(() => {
    getmatchedProfile();
  }, []);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let filtered = matchedProfile;
  
    if (searchQuery) {
      filtered = matchedProfile.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setfilteredMatchedPro(filtered);
  }, [searchQuery, matchedProfile]);



  const getsuccessstory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/user/get-success-stories?page=${currentPage}`); 
      if (response.status === 200) {
        setStories(response?.data?.data);
        setTotalPages(response?.data?.data?.pagination?.totalPages || 1);
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


  const handleSearchAllPro = async (e) => {
    const value = e.target.value;
    setSearchallQuery(value);
  

    if (!value) {
      getsuccessstory();
    }
  };
  
  useEffect(() => {
    if (!searchQuery) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const response = await axios.post('/api/user/search-success-story', {
            search: searchallQuery,
          });
          if (response.status === 200) {
            setStories(response?.data?.data);
          }
        } else {
          getsuccessstory();
        }
      } catch (err) {
        console.error("Error during search:", err);
      } finally {
        setLoading(false);
      }
    };
  
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);
  
    return () => clearTimeout(delayDebounce);
  }, [searchallQuery, currentPage]);


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
        {selected === 1 && (  

          <SearchInput placeholder="Search" onChange={(e)=>handleChange(e)} />
         )}
        {selected === 2 && (  

          <SearchInput placeholder="Search" onChange={(e) => handleSearchAllPro(e)} />
         )}
          <div className="flex items-center  h-[48px]   rounded-lg border border-[#012C57] px-0.5">
            <button
              onClick={() => handleToggle(1)}
              className={`text-[14px] leading-[18.9px]  h-[42px]  px-4 rounded-l-lg font-[500] focus:outline-none ${
                selected === 1
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Matched Profiles
            </button>
            <button
              onClick={() => handleToggle(2)}
              className={`text-[14px] leading-[18.9px]  px-4  h-[42px]  rounded-r-lg font-[500] focus:outline-none ${
                selected === 2
                  ? "bg-[#012C57] text-white"
                  : "text-gray-500"
              }`}
            >
              Explore All Profiles
            </button>
          </div>
        </div>
      </div>
      {selected === 1 && (
     <>
      <MatchedProfile loading={matchedLoading} matchedProfile={filteredMatchedPro}  />
     </>
      )}
      {selected === 2 && (
      <>
    <div className="flex flex-col min-h-screen">
  {selected === 2 && (
    <>
      <ALLProfile loading={loading} stories={stories} />
      <div className="mt-auto">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  )}
</div>

      
     </>
      )}
    </div>
  );
}

export default SuccessStory;
