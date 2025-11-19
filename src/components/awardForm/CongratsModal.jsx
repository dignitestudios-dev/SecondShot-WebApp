import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
const CongratsModal = ({
  showModal,
  onclick,
  handleClick,
  heading,
  para,
  img,
}) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm ">
          <div className="bg-white z rounded-xl shadow-custom-shadow w-[471px] p-4 relative">
          
            <div className="flex justify-center mt-6">
              <img
                src={img}
                alt="logo"
                className="object-contain w-[220px] h-[209.31px] "
              />
            </div>
            <div className="px-4 pt-2 pb-2 mt-4">
              <h2 className="text-[32px] font-[600] text-center">{heading}</h2>
              <p className="text-center break-words  text-[#9A9A9A] text-[16px] font-[500]">
                {para}
              </p>
              <div className="mt-5">
                <AuthSubmitBtn
                  text={"Okay"}
                  handleSubmit={() => handleClick()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CongratsModal;
