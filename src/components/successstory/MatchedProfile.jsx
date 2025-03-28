import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyScreen from "../../pages/mylibrary/EmptyScreen";

const MatchedProfile = ({ loading, matchedProfile }) => {
  const navigate = useNavigate();
  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11 mt-16">
          {[...Array(matchedProfile?.length || 8)]?.map((_, index) => (
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
          {matchedProfile?.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen absolute z-0 top-70 right-0 left-0 ">
              <EmptyScreen text={"No Matched Profile Found"} />
            </div>
          ) : (
            matchedProfile?.map((item, index) => (
              <div
                onClick={() =>
                  navigate("/matched-pro-detail", { state: { item } })
                }
                key={index}
                className="bg-[#F2F7FF] rounded-[12px] w-[280px]  p-4  h-[203px] flex flex-col items-center cursor-pointer"
              >
                <div className="relative -mt-12 mb-4">
                  <img
                    src={
                      item?.profile_img
                        ? item?.profile_img
                        : "https://placehold.co/600x400.png"
                    }
                    alt="Profile"
                    className="h-24 w-24 rounded-full "
                  />
                </div>
                <h2 className="text-[20px] capitalize font-[600] text-[#012C57]">
                  {item?.name}
                </h2>
                <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center">
                  First Shot :{item?.profession2}
                </h3>
                <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center">
                  Second Shot :{item?.profession}
                </h3>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MatchedProfile;
