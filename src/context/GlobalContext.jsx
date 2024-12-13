import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFirst, setIsFirst] = useState({
    dashboard: false,
    transferable: false,
    recommendation: false,
    mygoals: false,
    myresume:false,
    successstory:false,
    mylibrary:false
  });

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, setShowModal, isFirst, setIsFirst }}
    >
      {children}
    </ModalContext.Provider>
  );
};
