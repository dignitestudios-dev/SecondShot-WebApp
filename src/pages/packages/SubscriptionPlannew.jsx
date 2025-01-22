import React, { useEffect, useState } from "react";
import { Bgsubscription, Tick } from "../../assets/export";
import SubscriptionModal from "../../components/Modal/SubscriptionModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast } from "../../components/toaster/ToasterContainer";
const SubscriptionPlannew = () => {
  const navigation = useNavigate("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [subscription, setSubscription] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getsubscriptionDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/subscription/subscription-products`
      );

      if (response.status === 201) {
        setSubscription(response?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      ErrorToast(
        err?.response?.data?.message || "Failed to fetch subscription details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getsubscriptionDetail();
  }, []);

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

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full max-w-6xl">
        <div className="bg-gradient-to-b from-[#012C57] to-[#061523] text-white rounded-[22px] h-[559px] shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-[24px] font-semibold mb-4">
            Have an access code?
          </h2>
          <div className="opacity-[20%]">
            <hr className="bg-[#FFFFFF] mt-5 mb-5" />
          </div>
          <p className="text-[20px] leading-[27px] font-[600]">
            Unlock immediate access to <br /> Your Career Toolbox.
          </p>
          <div className="space-y-4 mt-9 h-[261px]">
            <label className="text-[16px] text-[#56EC17] leading-[21.6px] font-[500] mb-1">
              Use Access Code
            </label>
            <input
              type="text"
              placeholder="Access Code"
              className="w-full bg-transparent border border-[#395E81] px-4 py-2 rounded-[15px] text-[16px] text-[white] focus:outline-none focus:ring-2 focus:ring-[#55C9FA]"
            />
          </div>
          <button
            className="bg-white text-[#1E384F] text-[16px]  font-[500] w-[171px] h-[45px] mt-9 rounded-[12px]"
            onClick={() => setModalOpen(true)}
          >
            Submit
          </button>
        </div>

        {isLoading
          ? [1, 2].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-[22px] h-[559px] shadow-lg p-6 w-full max-w-sm flex flex-col justify-between"
              >
                <div className="bg-gray-300 h-[40px] w-[60%] rounded-[10px] mb-4"></div>
                <div className="bg-gray-300 h-[30px] w-[80%] rounded-[10px] mb-2"></div>
                <div className="bg-gray-300 h-[20px] w-[90%] rounded-[10px] mb-2"></div>
                <div className="bg-gray-300 h-[50px] w-[100%] rounded-[10px] mb-2"></div>
              </div>
            ))
          : subscription?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[22px] h-[559px] shadow-lg p-6 w-full max-w-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-[24px] font-[500] text-[#000000] leading-[32.4px]">
                      {item?.subscription_duration || "N/A"}
                    </h2>
                    <h2 className="text-[32px] font-[600] leading-[43.2px] text-[#56EC17]">
                      {item?.price || "0.00"}
                    </h2>
                  </div>
                  <hr className="bg-[#000000] mb-4 mt-3" />
                  <div className="text-[22px] font-[600] text-gray-900">
                    {item?.product_name || "No Product Name"}
                  </div>
                  <ul className="space-y-2 text-gray-700"></ul>
                </div>
                <div className="w-[171px]">
                  <AuthSubmitBtn
                    text={"Buy Now"}
                    handleSubmit={() =>
                      navigation("/subscription-new", {
                        state: { cardsubdata: item },
                      })
                    }
                  />
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
