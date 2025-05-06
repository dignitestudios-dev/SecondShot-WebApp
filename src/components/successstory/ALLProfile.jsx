import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyScreen from "../../pages/mylibrary/EmptyScreen";
import { facebook, Instaicon, Twittericon } from "../../assets/export";
import { FaYoutube } from "react-icons/fa";

const ALLProfile = ({ loading, stories }) => {
  const navigate = useNavigate();

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11 mt-16">
          {[...Array(stories?.length || 8)]?.map((_, index) => (
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
          {stories?.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen absolute z-0 top-70 right-0 left-0 ">
              <EmptyScreen text={"No Profile Found"} />
            </div>
          ) : (
            stories?.map((item, index) => (
              <div
                key={index}
                className="flip-card w-[280px] h-[243px] relative cursor-pointer"
             
              >
                <div className="flip-card-inner w-full h-full rounded-[12px] shadow-lg">
                  <div className="flip-card-front bg-[#F2F7FF] rounded-[12px] p-4 flex flex-col items-center">
                    <div className="relative -mt-12 mb-4">
                      <img
                        src={
                          item?.profile_img ||
                          "https://placehold.co/600x400.png"
                        }
                        alt="Profile"
                        className="h-24 w-24 rounded-full"
                      />
                    </div>
                    <h2 className="text-[20px] capitalize font-[600] text-[#012C57]">
                      {item?.name}
                    </h2>
                    <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center">
                      First Shot: {item?.profession2}
                    </h3>
                    <h3 className="text-[14px] mt-1 text-[#0081FF] font-[500] text-center">
                      Second Shot: {item?.profession}
                    </h3>
                  </div>

                  <div className="flip-card-back bg-white rounded-[12px] p-4 flex flex-col justify-center items-center gap-2 text-center">
                    <button className=" bg-[#FF0000] text-white font-semibold rounded-md px-4 py-2 flex items-center justify-center">
                      <FaYoutube className="mr-2 text-md" />
                      <a href={`${item?.youtube_link}`} target="_blank">
                        YouTube
                      </a>
                    </button>

                    {/* <p className="text-[14px] text-[#012C57]">
                      StanFord University
                    </p>
                    <p className="text-[14px] text-[#012C57] font-semibold">
                      Top 3 Skills : React Js , Node Js ,PHP
                    </p>
                    <ul className="text-[13px] text-[#0081FF] list-disc list-inside">
                      {(item?.skills || []).slice(0, 3).map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                    <div>
                      <p className="text-[10px]">
                        <span className="font-[600]">Quote: </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Deserunt debitis laudantium accusamus
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[facebook, Instaicon, Twittericon].map((link, i) => (
                        <img src={link} className="w-6 h-6" />
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ALLProfile;
