import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CryptoJS from "crypto-js";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
import axios from "../axios";
import getFCMToken, { getFCM } from "../firebase/getFcmToken";
import { BgAuth } from "../assets/export";
const Applayout = ({ page }) => {
  return (
    <div className="bg-global-img  ">
      <div>
        <Navbar />
      </div>
      <div className="max-w-screen-xl  min-h-[700px] mx-auto mt-11  ">
        <div className="max-w-screen-xl  px-11 pe-11">{page}</div>
      </div>
   
      <div className="pb-5    mx-auto px-11  pe-11 ">
        <Footer />
      </div>
    </div>
  );
};

export default Applayout;
