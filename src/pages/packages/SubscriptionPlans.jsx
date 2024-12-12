import React, { useState } from "react";
import { BgAuth } from "../../assets/export";
import SubscriptionBuy from "../../components/subscriptions/SubscriptionBuy";

const SubscriptionNew = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [selected, setSelected] = useState("Month");

  const handleIsTrue = () => {
    setIsTrue(!isTrue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FC] to-[#E9F5E5] relative">
      <div className="flex justify-center text-center">
        <div className="w-[90%] md:w-[50%] mx-4 md:mt-8">
          <h1 className="text-[40px] font-bold leading-[54px] " >
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
        />
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
