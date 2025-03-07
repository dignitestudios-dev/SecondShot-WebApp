import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatboat from "../components/chatboat/chatboat";
const Applayout = ({ page }) => {
  return (
    <div className="bg-global-img  ">
      <div>
        <Navbar />
      </div>
      <div className="max-w-screen-xl  min-h-[700px] mx-auto mt-11  ">
        <div className="max-w-screen-xl  px-11 pe-11">{page}</div>
      </div>
      <div className="fixed right-0 bottom-2  cursor-pointer">
        <Chatboat />
      </div>
      <div className="pb-5    mx-auto px-11  pe-11 ">
        <Footer />
      </div>
    </div>
  );
};

export default Applayout;
