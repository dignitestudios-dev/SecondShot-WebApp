import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Applayout = ({ page }) => {
  return (
    <div className="bg-global-img  ">
      <div>
        <Navbar />
      </div>
      <div className="max-w-screen-xl  mx-auto mt-11  ">
        <div className="max-w-screen-xl px-11 pe-11">{page}</div>
      </div>
      <div className="pb-5   mx-auto px-11  pe-11 ">
        <Footer />
      </div>
    </div>
  );
};

export default Applayout;
