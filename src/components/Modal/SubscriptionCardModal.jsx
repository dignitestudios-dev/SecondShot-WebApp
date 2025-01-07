import React from "react";
import { useNavigate } from "react-router-dom";
import { Creditcardimg } from "../../assets/export";

const SubscriptionCardModal = ({
  showModal,
  onclick,
  setShowAdded,
  setShowNew,
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    setShowNew(false);
    setShowAdded(true);
    onclick();
  };
  return (
    showModal && (
      <div className="fixed inset-0 bg-[#C9C9C952] backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-[420px] p-4 relative">
          <button
            className="absolute top-0 right-2 text-2xl text-gray-500 hover:text-gray-600"
            onClick={onclick}
          >
            &times;
          </button>
          <div className="flex justify-center mt-3">
            <img
              src={Creditcardimg}
              alt="logo"
              className="object-cover w-[30%]"
            />
          </div>
          <div className="px-2 flex flex-col justify-center items-center gap-1">
            <h2 className="text-[24px] font-semibold mb-2 text-center">
              Your Credit Card Has Been successfully added
            </h2>
            <p className="text-[16px] font-normal leading-5 text-[#000000] text-center">
              Your credit card has been successfully added to your account. You
              can now use it for seamless transactions and enjoy our services
              without interruptions.For assistance contact{" "}
              <a href="mailto:help@yoursecondshot.com" className="underline">
                help@yoursecondshot.com
              </a>
            </p>
            <div className="mt-4 w-full mb-1 flex justify-center">
              <button
                onClick={handleNavigation}
                className="bg-gradient-to-l from-[#012C57] w-full to-[#061523] text-white font-medium text-sm px-4 py-3 rounded-lg "
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SubscriptionCardModal;
