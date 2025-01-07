import React, { useState } from "react";
import { Bgsubscription, Tick } from "../../assets/export";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const SubscriptionPlannew = () => {
  const navigation = useNavigate("");
  const [isModalOpen, setModalOpen] = useState(false);

  const cardsubdata = [
    {
      heading: "3 months",
      amount: "$19.99",

      headingtwo: "For 3 Months, Unlock These Benefits Today!",
      benefitsList: [
        "Discover Your Transferable Skills",
        "Find Your Career Match",
        "Build Your Resume",
        "Establish Clear and Actionable Goals",
        "View Success Stories",
      ],
    },
    {
      heading: "Yearly Plan",
      amount: "$59.99",
      headingtwo: "For 1 Year, Unlock These Benefits Today!",
      benefitsList: [
        "Discover Your Transferable Skills",
        "Find Your Career Match",
        "Build Your Resume",
        "Establish Clear and Actionable Goals",
        "View Success Stories",
        "Unlimited Access to platform for 365 days",
        "Create a year long strategic plan ",
      ],
    },
  ];

  const handleSubmit = (item) => {
    navigation("/subscription-new", {
      state: { cardsubdata: item },
    });
  };
  return (
    <div
      className="min-h-screen bg_subscription flex flex-col items-center py-10 px-4"
      style={{
        backgroundImage: `url(${Bgsubscription})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-[40px] font-[600] text-gray-900">
          Explore Our Subscription Plans
        </h1>
        <p className="text-[#181818] font-[500] mt-2 text-[16px] leading-[21.6px]">
          Choose from one of our subscription plans to suit your needs. <br />{" "}
          For assistance contact{" "}
          <a href="mailto:help@yoursecondshot.com" className="underline">
            help@yoursecondshot.com
          </a>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        <div className="bg-gradient-to-b from-[#012C57] to-[#061523] text-white rounded-[22px] h-[559px] shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-[24px] font-semibold mb-4">
            Have an access code?
          </h2>
          <div className="opacity-[20%]">
            <hr className="bg-[#FFFFFF] mt-5 mb-5" />
          </div>
          <p className="text-[20px]  leading-[27px] font-[600]">
            Unlock immediate access to <br /> Your Career Toolbox.
          </p>

          <p className="text-[16px] mt-2 font-[400] leading-[21.6px]">
            Access code is a one-time usage only. Once redeemed, it cannot be
            used again!
          </p>
          <div className="opacity-[20%] mt-11">
            <hr className="bg-[#FFFFFF] mt-5 mb-5" />
          </div>
          <div className="space-y-4 mt-9  h-[171px]  ">
            <label className=" text-[16px] text-[#56EC17] leading-[21.6px]  font-[500] mb-1">
              Use Access Code
            </label>
            <input
              type="text"
              placeholder="Access Code"
              className="w-full  bg-transparent border border-[#395E81] px-4 py-2 rounded-[15px]  text-[16px] text-[white] focus:outline-none focus:ring-2 focus:ring-[#55C9FA]"
            />
          </div>
          <button
            className="bg-white  text-[#1E384F] text-[16px] mt-4   font-[500]  w-[171px] h-[45px] rounded-[12px] "
            onClick={() => setModalOpen(true)}
          >
            Submit
          </button>
        </div>
        {cardsubdata?.map((item, index) => (
          <div key={index}>
            <div className="  bg-white rounded-[22px] lg:h-[559px] md:h-full  shadow-lg   p-2 w-full max-w-sm">
              <div className="flex justify-between items-center  mt-3 ">
                <h2 className="text-[24px] px-3 font-[500] text-[#000000] leading-[32.4px] ">
                  {item.heading}
                </h2>
                <h2 className="text-[32px] font-[600] leading-[43.2px] pe-3 text-[#56EC17]">
                  {item.amount}
                </h2>
              </div>
              <div>
                <hr className="bg-[#000000] mb-4 mt-3" />
              </div>

              <div className="p-3">
                <div className="text-[22px] font-[600] text-gray-900 ">
                  {item.headingtwo}
                </div>
                <ul className="space-y-2  h-[257px] mb-6 text-gray-700">
                  {item?.benefitsList.map((item, index) => (
                    <li
                      className="flex items-center space-x-2 mt-3 "
                      key={index}
                    >
                      <img
                        src={Tick}
                        className="h-[10.5px] w-[13.5px]"
                        alt=""
                      />
                      <span className="text-[17px] leading-[22.95px] font-[500] text-[#181818]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="w-[171px] mt-[1.7rem]">
                  <AuthSubmitBtn
                    text={"Buy Now"}
                    handleSubmit={() => handleSubmit(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-24 text-gray-600 text-sm text-center">
        Copyright © 2023 second shot
      </footer>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        handleClick={() => navigation("/profiledetail")}
      />
    </div>
  );
};

export default SubscriptionPlannew;
