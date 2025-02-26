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
  const [notifications, setNotifications] = useState([]);
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

  const [allLoading, setAllLoading] = useState(false);
  const [countNoti, setCountNoti] = useState(0);

  const getnotifications = async () => {
    setAllLoading(true);
    try {
      const response = await axios.get("/api/user/my-notifications");
      if (response.status === 200) {
        const sortedNotifications = response?.data?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      }
    } catch (err) {
      console.log(err, "Error");
    } finally {
      setAllLoading(false);
    }
  };

  useEffect(() => {
    getnotifications();
  }, []);

  useEffect(() => {
    const count = notifications?.filter((e) => e.is_read === false);
    setCountNoti(count?.length);
  }, [notifications]);

  onMessageListener()
    .then((payload) => {
      console.log(payload, "payload");
      NotificationToast({
        title: payload.notification.title,
        message: payload.notification.body,
      });
      getnotifications();
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
        notifications,
        setNotifications,
        getnotifications,
        setAllLoading,
        allLoading,
        countNoti,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
