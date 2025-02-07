import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import SearchInput from "../../components/Global/SearchInput";
import MygoalsCard from "../../components/mygoals/MygoalsCard";
import { useContext, useEffect, useState } from "react";
import WelcomeGoalModal from "../../components/mygoals/WelcomeGoalModal";
import { ModalContext } from "../../context/GlobalContext";
import axios from "../../axios";

function MyGoals() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("All");
  const buttons = ["All", "Not started yet", "In Progress", "Completed"];

  const { isFirst, setIsFirst } = useContext(ModalContext);
  const [goaldetail, setgoaldetail] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [loading, setloading] = useState(false);
  const getGoalDetail = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/my-goals");
      if (response.status === 200) {
        setgoaldetail(response?.data?.data || []);
        setFilteredGoals(response?.data?.data || []); 
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getGoalDetail();
  }, []);


  useEffect(() => {
    if (selectedButton === "All") {
      setFilteredGoals(goaldetail);
    } else {
      setFilteredGoals(
        goaldetail.filter((goal) => goal.status === selectedButton)
      );
    }
  }, [selectedButton, goaldetail]);

  return (
    <div className="">
      <WelcomeGoalModal
        isOpen={isFirst.mygoals}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            mygoals: false,
          }));
        }}
      />

      <h1 className="text-3xl font-semibold text-gray-800 mt-2  leading-[43.2px]  mb-6">
        My Goals
      </h1>
      <div className="flex space-x-4 mb-6 bg-white p-1 rounded-md">
        {buttons.map((button) => (
          <button
            key={button}
            className={`${
              selectedButton === button
                ? "bg-gradient-to-r from-[#061523] to-[#012C57] text-white"
                : "text-[#00000080] text-[16px] font-[400]"
            }  h-[57px] p-5 text-[14px] rounded-sm leading-[18.9px] `}
            onClick={() => setSelectedButton(button)}
          >
            {button}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-[500] text-gray-800">
          Added Goals <span className="text-green-500">({filteredGoals.length})</span>
        </h2>

        <div className="flex items-center justify-between gap-5">
          <SearchInput placeholder={"Search"} />
          <span className="bg-slate-200 h-8 w-[2.5px] "></span>
          <div className="flex flex-col items-end">
            <button
              onClick={() => navigate("/create-goals")}
              className="text-[#012C57] text-[18px] font-[600]"
            >
              + Add Goals
            </button>
          </div>
        </div>
      </div>
      <div>
        <MygoalsCard goaldetail={filteredGoals} loading={loading} />
      </div>
    </div>
  );
}

export default MyGoals;
