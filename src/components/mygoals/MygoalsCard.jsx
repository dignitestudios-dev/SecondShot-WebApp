import React from "react";
import { Dotedimg } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const MygoalsCard = ({ goaldetail, loading }) => {
  
  const navigate = useNavigate();

  const getBgCardColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#D4F6ED]";
      case "Not Started yet":
        return "bg-[#f0340040]";
      case "In Progress":
        return "bg-[#F0C00042]";
      default:
        return "text-[#F0C000]";
    }
  };
  const gettextCardColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-[#36B8F3]";
      case "Not Started yet":
        return "text-[#f01800]";
      case "In Progress":
        return "text-[#F0C000]";
      default:
        return "bg-[#FFFFFF]";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [...Array(goaldetail.length || 6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse h-[200px] w-[100%] bg-gray-200 rounded-md"
              ></div>
            ))
          : goaldetail?.map((item, index) => (
              <div
                className="bg-white rounded-2xl border border-gray-200 p-2"
                key={index}
              >
                <div
                  className={`p-6 rounded-[22px]  relative ${getBgCardColor(
                    item?.status
                  )}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`leading-[39px] h-[39px] w-[120px] text-center rounded-full text-[14px] font-[500] bg-white ${gettextCardColor(
                        item?.status
                      )}`}
                    >
                      {item?.status}
                    </span>
                    {/* <div className="bg-white w-[32px] h-[32px] flex justify-center items-center  rounded-[25px] cursor-pointer">
                  <img src={Dotedimg} className="w-[18px]  " alt="" />
                </div> */}
                  </div>
                  {/* <h3 className="text-[20px] leading-[32.4px] font-[500] text-gray-800 mb-2">
                {item.heading}
              </h3> */}
                  <p className="text-md text-gray-600 font-[500] mb-4">
                    {item?.main_goal_name}
                  </p>
                  {/* <div className="grid grid-cols-3 gap-2 mb-4">
                {item?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="leading-[43px] text-center h-[43px] text-[14px] font-[400] text-[#000000] border border-gray-400 rounded-full bg-transparent"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
                </div>
                <div className="flex justify-between items-start text-sm text-black mt-6 pb-3 pr-3">
                  <div className="flex flex-col">
                    <span className="bg-white p-1 rounded-md font-[500] px-6 text-lg">
                      Deadline
                    </span>
                    <span className="bg-white p-1 px-6 text-[#00000070] rounded-md mt-[-2px]">
                      {item?.createdAt
                        ? new Date(item?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "No date selected"}{" "}
                      |
                      {item?.deadline
                        ? new Date(item?.deadline).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "No date selected"}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/goal-detail/${item?._id}`)}
                    className="px-4 py-2 text-sm font-[500] text-[#012C57] bg-gray-200 border border-gray-300 rounded-lg mt-3"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default MygoalsCard;
