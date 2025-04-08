import React from "react";

const MessageModal = ({ showModal, handleClick, setShowPeopleModal }) => {
  return (
    showModal && (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm ">
        <div className="bg-white rounded-xl shadow-lg w-[450px] py-10 px-2 relative">
          <button
            className="absolute top-0 right-2 text-[20px] text-gray-500 hover:text-gray-600"
            onClick={handleClick}
          >
            &times;
          </button>
          <div className="flex justify-center items-center  text-center text-[16px] font-[500] ">
            Please open all nodes before downloading the full Transferable
            Skills Map. The download will include only the nodes that are
            currently expanded
          </div>
        </div>
      </div>
    )
  );
};

export default MessageModal;
