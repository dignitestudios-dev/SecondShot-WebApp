import React, { useContext, useEffect, useState } from "react";
import CareerToolbox from "../../components/home/CareerToolbox";
import WelcomeModal from "../../components/Modal/WelcomeModal";
import { ModalContext } from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { showModal, closeModal, isFirst, setIsFirst } =
    useContext(ModalContext);
  const { regQuestion, token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    } else if (regQuestion === "false") {
      navigate("/registration-question");
    }
  }, []);

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
        My Career Toolbox
      </div>

      <div>
        <CareerToolbox />
      </div>
    </div>
  );
};

export default Home;
