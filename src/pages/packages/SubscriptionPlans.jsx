import React, { useState } from "react";
import { BgAuth } from "../../assets/export";
import SubscriptionBuy from "../../components/subscriptions/SubscriptionBuy";
import { useLocation } from "react-router-dom";

const SubscriptionNew = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [selected, setSelected] = useState("Month");

  const handleIsTrue = () => {
    setIsTrue(!isTrue);
  };
  const location = useLocation();
  const { cardsubdata } = location.state || {};
  console.log(cardsubdata, "benefitsbenefits");
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FC] to-[#E9F5E5] relative">
      <div className="flex justify-center text-center">
        <div className="w-[90%] md:w-[50%] mx-4 md:mt-8">
          <h1 className="text-[40px] font-[600] leading-[54px] ">
            Explore Our Subscription Plans
          </h1>
          <p className="text-[16px] font-medium leading-[21.6px] mt-2">
            Choose from our subscription plans to suit your needs. Whether
            short-term or long-term, we have the right plan for you. For any
            questions, our support team is here to help.
          </p>
        </div>
      </div>
      <div className="mt-11">
        <SubscriptionBuy
          handleIsTrue={handleIsTrue}
          selected={selected}
          setSelected={setSelected}
          cardsubdata={cardsubdata}
        />
      </div>
      <div className="mt-11 p-5">
        <hr />
        <footer className="mt-5 text-gray-600 text-sm text-center pb-5">
          Copyright © 2023 second shot
        </footer>
      </div>
      <img
        src={BgAuth}
        alt="Background Decoration"
        className="absolute bottom-0 right-0 w-[24%] pointer-events-none"
      />
    </div>
  );
};

export default SubscriptionNew;
