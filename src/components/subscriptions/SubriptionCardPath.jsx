import React, { useState } from "react";
import { Tick } from "../../assets/export";

const SubriptionCardPath = ({ selected, cardsubdata }) => {

  const [cardData, setCardData] = useState(() => {
    try {
      return (
        cardsubdata ||
        (localStorage.getItem("cardsubdata")
          ? JSON.parse(localStorage.getItem("cardsubdata"))
          : null)
      );
    } catch (err) {
      console.error("Error parsing cardsubdata from localStorage:", err);
      return null;
    }
  });
  return (
    <div>
      <div>
        <div className="  bg-white rounded-[22px]   overflow-y-auto   shadow-lg   p-2 w-[438px] max-w-sm">
          <div className="flex justify-between items-center  mt-3 ">
            <h2 className="text-[24px] px-3 font-[500] text-[#000000] leading-[32.4px] ">
            {cardData?.subscription_duration === "3-month" ? "3-Month" : cardData?.subscription_duration || cardData?.subscription_duration === 'yearly' ? "1-Year" : cardData?.subscription_duration}
            </h2>
            <h2 className="text-[32px] font-[600] leading-[43.2px] pe-3 text-[#56EC17]">
              {cardData?.price} /
              <span className="text-[12px] text-black">
              {cardData?.subscription_duration === "3-month" ? "3-Month" : cardData?.subscription_duration || cardData?.subscription_duration === 'yearly' ? "1-Year" : cardData?.subscription_duration}
              </span>
            </h2>
          </div>
          <div>
            <hr className="bg-[#000000]  mt-3" />
          </div>

          <div className="p-3">
            {/* <div className="text-[22px] font-[600] text-gray-900 ">
              {cardData?.product_name}
            </div> */}
            <ul className="space-y-2 mb-6 text-gray-700">
              {Object.values(cardData?.description || {})?.map(
                (feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 space-y-3 mt-3"
                  >
                    <img
                      src={Tick}
                      className="h-[10.5px] mt-3 w-[13.5px]"
                      alt=""
                    />
                    <span className="text-[17px] leading-[22.95px] font-[500] text-[#181818]">
                      {feature || ""}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubriptionCardPath;
