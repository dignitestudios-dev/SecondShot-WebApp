import React, { useState } from "react";
import { Bgsubscription, Tick } from "../../assets/export";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";

const SubscirtionProfile = () => {
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

  ];

  const handleSubmit = (item) => {
    navigation("/subscription-new", {
      state: { cardsubdata: item },
    });
  };
  return (
    <div className="min-h-screen bg_subscription flex flex-col items-center py-10 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        {cardsubdata?.map((item, index) => (
          <div key={index}>
            <div className="  bg-white rounded-[22px] lg:h-[559px] md:h-full  shadow-lg   p-2 w-full max-w-sm">
              <div className="flex justify-between items-center  mt-3 ">
                <h2 className="text-[24px] px-3 font-[500] text-[#000000] leading-[32.4px] ">
                  {item.heading}
                </h2>
                <h2 className="text-[32px] font-[600] pe-3 leading-[43.2px] text-[#56EC17]">
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
                <div className="w-[171px]">
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

     
    </div>
  );
};

export default SubscirtionProfile;
