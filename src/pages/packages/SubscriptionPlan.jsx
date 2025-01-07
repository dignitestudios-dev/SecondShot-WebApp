import React, { useState } from "react";
import { Bgsubscription, Tick } from "../../assets/export";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";

const SubscriptionPlansTwo = () => {
  const [tabs, setTabs] = useState("month");
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg_subscription flex flex-col items-center py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-[40px] font-[600] text-gray-900">
          Explore Our Subscription Plans
        </h1>
        <p className="text-[#181818] font-[500] mt-2 text-[16px] leading-[21.6px]">
          Choose from our subscription plans to suit your needs. Whether basic
          or premium, we have the <br /> right plan for you. For assistance
          contact{" "}
          <a href="mailto:help@yoursecondshot.com" className="underline">
            help@yoursecondshot.com
          </a>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        <div className="bg-gradient-to-b from-[#012C57] to-[#061523] text-white rounded-[22px] h-[501px] shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-[24px] font-semibold mb-4">
            Have an access code?
          </h2>
          <div className="opacity-[20%]">
            <hr className="bg-[#FFFFFF] mt-5 mb-5" />
          </div>
          <p className="text-[20px] mb-4 font-[600]">
            Unlock your <br /> subscription with <br /> an access code
          </p>

          <p className="text-[16px]  font-[400]">
            Access code is a one-time usage only. Once redeemed, it cannot be
            used again!
          </p>
          <div className="opacity-[20%]">
            <hr className="bg-[#FFFFFF] mt-5 mb-5" />
          </div>
          <div className="space-y-4">
            <label className="block text-[16px] text-[#56EC17]  font-[500] mb-1">
              Use Access Code
            </label>
            <input
              type="text"
              placeholder="Access Code"
              className="w-full bg-transparent border border-[#395E81] px-4 py-2 rounded-[15px]  text-[16px] text-[#395E81] focus:outline-none focus:ring-2 focus:ring-[#55C9FA]"
            />
            <button
              className="bg-white text-[#1E384F] text-[16px] font-[500]  w-[171px] h-[49px] rounded-[8px] "
              onClick={() => setModalOpen(true)}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="  bg-white rounded-[22px] lg:h-[501px] md:h-full  shadow-lg   p-3 w-full max-w-sm">
          <div className="flex justify-between items-center  mt-3 ">
            <h2 className="text-[22px] font-[400] text-gray-900">
              Select Subscriptions
            </h2>
            <div className="flex border border-[#4E4E4E] p-0.5 rounded-[6px] w-[139px] h-[36px]">
              <button
                className={`w-[67px] border-r rounded-l-[6px] text-[12px] ${
                  tabs === "month"
                    ? "bg-[#012C57] text-[#56EC17]"
                    : "bg-white text-black"
                }`}
                onClick={() => setTabs("month")}
              >
                Month
              </button>
              <button
                className={`w-[67px] rounded-r-[6px] text-[12px] ${
                  tabs === "year"
                    ? "bg-[#012C57] text-[#56EC17]"
                    : "bg-white text-black"
                }`}
                onClick={() => setTabs("year")}
              >
                Year
              </button>
            </div>
          </div>
          <div>
            <hr className="bg-[#000000] mb-4 mt-8" />
          </div>

          {tabs === "month" && (
            <div className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-[24px] font-bold text-gray-900 ">
                  Path Finder Plus
                </div>
                <div className="">
                  <span className="text-[#56EC17] text-[24px] font-[600]">
                    $19.99/
                  </span>
                  <span className="text-[12px] text-black font-[600] text-nowrap ">
                    3 months
                  </span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-gray-700">
                {[
                  "Expand Basic Lorem Ipsum",
                  "Expand Silver Lorem Ipsum ",
                  "Expand Silver Lorem Ipsum ",
                  "Unlimited Request Lorem Ipsum ",
                  "Expand Silver Lorem Ipsum ",
                  "Unlimited Request Lorem Ipsum ",
                ]?.map((item) => (
                  <li className="flex items-center space-x-2 mt-3">
                    <img src={Tick} className="h-[10.5px] w-[13.5px] " alt="" />
                    <span className="text-[17px] font-[500] text-[#181818]  ">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="bg-[#012C57] mt-3 text-white py-2 rounded-md  h-[49px]  text-[16px]  w-[171px]  font-[500]"
                onClick={() => setModalOpen(true)}
              >
                Buy Now
              </button>
            </div>
          )}
          {tabs === "year" && (
            <div className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-[24px] font-bold text-gray-900 ">
                  Path Finder Plus
                </div>
                <div className="">
                  <span className="text-[#56EC17] text-[24px] font-[600]">
                    $15.99/
                  </span>
                  <span className="text-[12px] text-black font-[600] ">
                    year
                  </span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-gray-700">
                {[
                  "Expand Basic Lorem Ipsum",
                  "Expand Silver Lorem Ipsum ",
                  "Expand Silver Lorem Ipsum ",
                  "Unlimited Request Lorem Ipsum ",
                  "Expand Silver Lorem Ipsum ",
                  "Unlimited Request Lorem Ipsum ",
                ]?.map((item) => (
                  <li className="flex items-center space-x-2 mt-3">
                    <img src={Tick} className="h-[10.5px] w-[13.5px] " alt="" />
                    <span className="text-[17px] font-[500] text-[#181818] ]  ">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="bg-[#012C57] text-white py-2 rounded-md  h-[49px]  text-[16px]  w-[171px]  font-[500]"
                onClick={() => setModalOpen(true)}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default SubscriptionPlansTwo;
