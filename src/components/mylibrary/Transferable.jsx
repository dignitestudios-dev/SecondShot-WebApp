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
                <span className="text-[16px] px-2 font-[500] leading-[21.6px]">
                  {`July/10/2024`}
                </span>
               
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Transferable;
