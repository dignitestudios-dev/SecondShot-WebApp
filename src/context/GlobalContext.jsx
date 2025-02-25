import React, { createContext, useState, useEffect } from "react";
import { onMessageListener } from "../firebase/messages";
import { NotificationToast } from "../components/toaster/ToasterContainer";
import getFCMToken from "../firebase/getFcmToken";
import axios from "../axios";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const [isFirst, setIsFirst] = useState(() => {
    const savedState = localStorage.getItem("isFirst");
    return savedState
      ? JSON.parse(savedState)
      : {
          dashboard: false,
          transferable: false,
          recommendation: false,
          mygoals: false,
          myresume: false,
          successstory: false,
          mylibrary: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("isFirst", JSON.stringify(isFirst));
  }, [isFirst]);

  const closeModal = () => {
    setShowModal(false);
  };

  const getDeviceId = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    const uuid = uuidv4();

    const deviceName = `${result.device.model}` || "Unknown";
    const deviceID = result.ua || "Unknown"; // User-Agent can serve as a unique identifier

    const preId = deviceID;

    return preId;
  };

  const updateDeviceId = async () => {
    try {
      const token = await getFCMToken();
      const response = await axios.post("/api/user/store-device-token", {
        deviceToken: token,
        deviceId: getDeviceId(),
      });
      console.log(response, "response->");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateDeviceId();
  }, []);

  onMessageListener()
    .then((payload) => {
      console.log(payload, "payload");
      NotificationToast({
        title: payload.notification.title,
        message: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
        setShowModal,
        isFirst,
        setIsFirst,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
