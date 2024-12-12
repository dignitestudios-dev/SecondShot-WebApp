import React, { useState } from "react";
import CareerToolbox from "../../components/home/CareerToolbox";
import WelcomeModal from "../../components/Modal/WelcomeModal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <WelcomeModal isOpen={isOpen} handleClick={() => setIsOpen(false)} />
      <div className="text-[32px] font-[500] leading-[43.2px] text-[#000000] mb-4 ">
        My Career Toolbox
      </div>
      <div>
        <CareerToolbox />
      </div>
    </div>
  );
};

export default Home;
