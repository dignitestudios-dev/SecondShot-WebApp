import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CryptoJS from "crypto-js";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
import axios from "../axios";
import getFCMToken, { getFCM } from "../firebase/getFcmToken";
const Applayout = ({ page }) => {
  const getDeviceName = () => {
    const parser = new UAParser();
    const result = parser.getResult();

    const deviceName = result.device.model || "Unknown";
    const deviceID = result.ua || "Unknown"; // User-Agent can serve as a unique identifier

    return deviceName;
  };

  
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
