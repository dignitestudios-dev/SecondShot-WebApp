import React, { useContext, useEffect, useState } from "react";
import CareerToolbox from "../../components/home/CareerToolbox";
import WelcomeModal from "../../components/Modal/WelcomeModal";
import { ModalContext } from "../../context/GlobalContext";

const Home = () => {
  const { showModal, closeModal, isFirst, setIsFirst } =
    useContext(ModalContext);

  return (
    <div>
      <WelcomeModal
        isOpen={isFirst.dashboard}
        handleClick={() => {
          setIsFirst((prev) => ({
            ...prev,
            dashboard: false,
          }));
        }}
      />
      <div className="text-3xl font-semibold text-gray-800 mb-5 mt-4 ">
        My <span className="text-[#56EC17]"> Career Toolbox</span>
      </div>
      <div>
        <CareerToolbox />
      </div>
    </div>
  );
};

export default Home;
