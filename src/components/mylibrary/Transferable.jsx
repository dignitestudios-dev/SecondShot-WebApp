import React from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const Transferable = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-4 bg-[#FFFBF1] text-black shadow-lg cursor-pointer hover:bg-gradient-to-l from-[#012C57] to-[#061523] hover:text-white transition "
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold pt-2 pl-2">
                  Transferable Skills
                </h2>
                <BsFillBookmarkStarFill
                  className={`text-2xl ${
                    index === 0 ? "text-[#56EC17]" : "text-[#56EC17]"
                  } cursor-pointer`}
                />
              </div>
              <p className="text-[16px] mb-4 text-left pl-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt labore dolore magna aliqua.
              </p>
              <div className="text-sm flex justify-between items-center group-hover:text-white">
                <span className="text-[16px] font-[500] leading-[21.6px]">
                  {`10/July/2024`}
                </span>
                <button className="p-2 rounded-[8px] flex items-center justify-center bg-[#012C57] w-[43px] h-[43px] text-center text-white group-hover:bg-white group-hover:text-[#012C57] transition duration-200">
                  <IoIosArrowForward size={"16px"} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Transferable;
