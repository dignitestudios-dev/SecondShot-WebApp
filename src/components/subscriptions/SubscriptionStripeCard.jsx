import React, { useState } from "react";
import GrayBtn from "../onboarding/grayBtn";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import SubcriptionActivateModal from "./SubcriptionActivateModal";
import { useNavigate } from "react-router-dom";
import { Visa, Visaicon } from "../../assets/export";
import SubscriptionModal from "../Modal/SubscriptionModal";

const SubscriptionStripeCard = ({ selected, handleModal, cardsubdata }) => {
  const [showNew, setShowNew] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [activatModal, setActivatModal] = useState(false);
  const navigation = useNavigate();
 console.log(cardsubdata._id,"cardsubdata._id")

  return (
    <div>
      <div className="bg-transparent p-2 mb-20 ">
        <div className="mt-">
          <h2 className="text-[24px] font-[600] leading-[32.4px] mb-2">
            Payment Details
          </h2>
        </div>

        <div className="bg-gradient-to-l from-[#012C57] to-[#061523] text-white py-2 px-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-[600] text-[18px] leading-[24.3px] ">
              {cardsubdata.subscription_duration}
            </p>
          </div>
          <div className="text-right flex items-center h-12">
            <p className="text-[#56EC17] font-semibold text-lg pe-1">
              {cardsubdata.price}
            </p>
            / <p className="text-sm px-1">{cardsubdata.subscription_duration}</p>
          </div>
        </div>

        <div className="text-right mt-2">
          <p className="text-gray-600 text-xs font-semibold">Total Price</p>
        </div>
        <hr className="w-full border-t border-gray-300 mt-4" />
        <div className="flex justify-between items-center mt-4">
          <p className="text-black font-[500]">Payment Method</p>
          <p
            onClick={() => setShowNew(true)}
            className="text-[#0E73D0] text-xs font-[500] cursor-pointer"
          >
            Add New Card
          </p>
        </div>
        {!showNew && (
          <>
            <div className="mt-4">
              <div className="mt-2">
                <button
                  onClick={() => setActivatModal(true)}
                  className="w-full flex items-center justify-between bg-[#03223F0F] p-4 rounded-lg text-black"
                >
                  <div className="flex items-center">
                    <img
                      src="data:image/jpeg;base64,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" // Replace with your Apple Pay icon
                      alt="Apple Pay"
                      className="w-6 h-6 mr-3"
                    />
                    <p className="text-sm">Stripe</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
        {showNew && (
          <>
            <div div className="mt-4">
              <div className="mt-2">
                <label className="text-[14px] font-medium text-[#181818]">
                  Card Holder Name
                </label>
                <input
                  className="bg-transparent w-full text-sm border border-[#181818] focus:border-blue-500 text-[#181818] placeholder:font-normal font-medium px-4 py-3 mb-2 rounded-lg outline-none"
                  placeholder="0000-0000-0000"
                  name="cardHolder"
                  type="text"
                  autoComplete="off"
                  value={""}
                  onChange={""}
                />

                <label className="text-[14px] font-medium text-[#181818]">
                  Card No
                </label>
                <input
                  className="bg-transparent w-full text-sm border border-[#181818] focus:border-blue-500 text-[#181818] placeholder:font-normal font-medium px-4 py-3 rounded-lg outline-none"
                  placeholder="0000-0000-0000"
                  name="cardHolder"
                  type="text"
                  autoComplete="off"
                  value={""}
                  onChange={""}
                />
              </div>
              <div className="flex items-center">
                <img src={Visa} className="pl-[1px] w-[37.57px]" />
                <img src={Visaicon} className=" w-[36.75px] pr-[1px]" />
              </div>
              <div className="mt-0 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[14px] font-medium text-[#181818]">
                    Expiry Date
                  </label>
                  <input
                    className="bg-transparent w-full text-sm border border-[#181818] focus:border-blue-500 text-[#181818] placeholder:font-normal font-medium px-4 py-3 rounded-lg outline-none"
                    // placeholder="0000-0000-0000"
                    name="cardHolder"
                    type="text"
                    autoComplete="off"
                    value={""}
                    onChange={""}
                  />
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#181818]">
                    CVC
                  </label>
                  <input
                    className="bg-transparent w-full text-sm border border-[#181818] focus:border-blue-500 text-[#181818] placeholder:font-normal font-medium px-4 py-3 rounded-lg outline-none"
                    // placeholder="0000-0000-0000"
                    name="cardHolder"
                    type="text"
                    autoComplete="off"
                    value={""}
                    onChange={""}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="text-[14px] font-medium text-[#181818]">
                  Zip Code
                </label>
                <input
                  className="bg-transparent w-full text-sm border border-[#181818] focus:border-blue-500 text-[#181818] placeholder:font-normal font-medium px-4 py-3 rounded-lg outline-none"
                  // placeholder="0000-0000-0000"
                  name="cardHolder"
                  type="text"
                  autoComplete="off"
                  value={""}
                  onChange={""}
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <GrayBtn text={"Back"} handleSubmit={() => setShowNew(false)} />
                <AuthSubmitBtn text={"Save"} />

                <button
                  // onClick={handleCardModal}
                  className="w-full bg-grad text-[#FCFCFC] text-medium text-[16px] py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
        {showAdded && (
          <>
            <div className="flex justify-between items-center mt-4">
              <p className="text-black font-semibold">Add New Card</p>
              <div className="flex space-x-2">
                <p
                  onClick={() => setShowAdded(false)}
                  className="text-[#EB001B] text-xs font-semibold cursor-pointer"
                >
                  Remove
                </p>
                <p
                  onClick={() => {
                    setShowNew(true);
                    setShowAdded(false);
                  }}
                  className="text-[#000000] text-xs font-semibold cursor-pointer"
                >
                  Edit
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mt-2">
                <button
                  onClick={handleModal}
                  className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg text-black"
                >
                  <div className="flex items-center">
                    <img
                      src={Visaicon}
                      alt="visa Pay"
                      className="w-6 h-6 mr-3"
                    />
                    <p className="text-sm">Master</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {!showNew && (
          <div className="mt-4 w-[40%]  ">
            <GrayBtn text={"Back"} handleSubmit={() => navigation(-1)} />
          </div>
        )}
        <SubscriptionModal
          isOpen={activatModal}
          handleClick={() => {
            setActivatModal(false);
            navigation("/profiledetail");
          }}
        />
      </div>
    </div>
  );
};

export default SubscriptionStripeCard;
