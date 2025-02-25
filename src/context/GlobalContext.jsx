import React, { createContext, useState, useEffect } from "react";
import { onMessageListener } from "../firebase/messages";
import { NotificationToast } from "../components/toaster/ToasterContainer";
import getFCMToken from "../firebase/getFcmToken";
import axios from "../axios";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

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
  async function getDeviceFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    console.log(result.visitorId); // Unique device ID
    return result.visitorId;
  }

  const updateDeviceId = async () => {
    try {
      const token = await getFCMToken();
      const response = await axios.post("/api/user/store-device-token", {
        deviceToken: token,
        deviceId: await getDeviceFingerprint(),
      });
      console.log(response, "response->");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Cookies.get("token") && updateDeviceId();
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
