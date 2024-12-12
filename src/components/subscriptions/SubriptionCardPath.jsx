import React from "react";

const SubriptionCardPath = ({selected}) => {
  return (
    <div>
      <div className="bg-white shadow-lg rounded-2xl p-6 md:mb-0 mb-8 max-h-[430px] ">
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-[600] leading-[32.4px] ">
              Path Finder Plus
            </p>
            <p className="text-[24px] leading-[32.4px] font-[600]  text-[#56EC17]">
              ${selected == "Month" ? "19.99" : "59.99"}{" "}
              <span className="text-2xl text-[#56EC17] font-medium">/</span>
              <span className="text-[#000000] text-[14px] leading-[32.4px] font-[400]">
                {selected == "Month" ? "3 months" : "year"}
              </span>
            </p>
          </div>
          <hr className="w-full border-t border-gray-300 mt-4" />
          <ul className="mt-6 mb-12 space-y-3 ">
            {[
              "Expand Basic Lorem Ipsum",
              "Expand Silver Lorem Ipsum ",
              "Expand Silver Lorem Ipsum ",
              "Unlimited Request Lorem Ipsum ",
              "Expand Silver Lorem Ipsum ",
              "Expand Silver Lorem Ipsum ",
            ]?.map((item) => (
              <li className="flex items-center text-[20px] leading-[27px] font-[500] ">
                <svg
                  className="w-5 h-5 text-[#56EC17] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubriptionCardPath;
