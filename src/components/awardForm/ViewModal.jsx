import React from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { RxCross2 } from "react-icons/rx";

const ViewModal = ({ showModal, onClose, handleClick, passData, passimg }) => {
  console.log(passData, "passData");
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm ">
          <div className="bg-white z rounded-xl shadow-custom-shadow w-[471px] p-4 relative">
            <div onClick={onClose} className="flex justify-end cursor-pointer">
              <RxCross2 />
            </div>
            <div className="flex justify-center mt-6">
              <img src={passimg} alt="logo" className=" w-[120px] h-[120px] " />
            </div>
            <div className="px-4 pt-2 pb-2 mt-4">
              {Array.isArray(passData) ? (
                <div className="flex flex-wrap border  p-2 rounded-md  gap-2">
                  {passData.map((item, index) => (
                    <span
                      key={index}
                      className="bg-[#f3f4f6] border border-[#d1d5db] text-sm px-3 py-1 rounded-full text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center">
                  <span className="bg-[#f3f4f6] border border-[#d1d5db] text-sm px-3 py-1 rounded-full text-gray-700">
                    {passData}
                  </span>
                </div>
              )}

              <div className="mt-5">
                <AuthSubmitBtn
                  text={"Download"}
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

export default ViewModal;
