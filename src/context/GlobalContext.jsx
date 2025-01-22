import React, { createContext, useState, useEffect } from "react";

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

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, setShowModal, isFirst, setIsFirst }}
    >
      {children}
    </ModalContext.Provider>
  );
};
