import React, { useContext } from "react";
import { BgAuth, TickIcon } from "../../assets/export";
import { useNavigate } from "react-router-dom";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import { ModalContext } from "../../context/GlobalContext";

const CongratsMessage = () => {
  const navigation = useNavigate();
  const { setShowModal, setIsFirst } = useContext(ModalContext);
  const handleClick = () => {
    setIsFirst({
      dashboard: true,
      transferable: true,
      recommendation: true,
      mygoals: true,
      myresume: true,
      successstory:true,
      mylibrary:true
    });
    setShowModal(true);
    navigation("/home");
  };
  return (
    <div className=" bg-slate-200 p-3">
      <div className="grid grid-cols-12  py-4 h-screen">
        <div className="col-span-12 md:col-span-4 hidden md:flex justify-center auth-bg rounded-l-[20px]"></div>
        <div className="col-span-12 md:col-span-8 flex justify-center rounded lg:rounded-r-[20px] items-center bg-white pb-4 relative overflow-hidden">
          <div className="w-full max-w-md p-7">
            <div className="flex justify-center mb-6">
              <img
                src={TickIcon}
                alt="OTP Illustration"
                className="h-[120px] w-[120px]"
              />
            </div>
            <h2 className="text-[32px] text-[#000000] font-[600] leading-[43.2px] text-center mb-2">
              Congratulations
            </h2>
            <p className="text-[16px] text-center">
              You have successfully completed the registration. Get ready to
              embark on your journey with us!
            </p>
            <div className="flex justify-center items-center">
              <div className="mt-5 w-[164px] ">
                <AuthSubmitBtn
                  text={"Let’s Dive In"}
                  handleSubmit={() => {
                    handleClick();
                  }}
                />
              </div>
            </div>
          </div>
          <img
            src={BgAuth}
            alt="logo"
            className="absolute -bottom-8 -right-8 w-[30%]"
          />
        </div>
      </div>
    </div>
  );
};

export default CongratsMessage;
