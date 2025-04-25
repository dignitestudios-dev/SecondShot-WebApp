import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/chatbot/Chatbot";
import { useLocation } from "react-router-dom";

const Applayout = ({ page }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="bg-global-img  ">
      <div>
        <Navbar />
      </div>
      <div
        className={`${
          pathname === "/transferablekills"
            ? ""
            : " max-w-screen-xl min-h-screen mx-auto mt-11 "
        }`}
      >
        <div
          className={`${
            pathname === "/transferablekills"
              ? " "
              : "max-w-screen-xl  px-11 pe-11  "
          }`}
        >
          {page}
        </div>
      </div>
      <div className="fixed right-0 bottom-2 z-10  cursor-pointer">
        <Chatbot />
      </div>
      <div
        className={`${
          pathname === "/transferablekills"
            ? " "
            : "pb-5    mx-auto px-11 re pe-11"
        } `}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Applayout;
