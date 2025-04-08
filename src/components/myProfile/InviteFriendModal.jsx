import React, { useState } from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const InviteFriendModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState("");

  const instaLink = "https://www.instagram.com/yoursecondshot/";
  const fbLink = "https://www.facebook.com/yoursecondshot";
  const xLink = "https://x.com/yoursecondshot";

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(""), 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md p-6 relative">
        <button
          className="absolute top-0 right-2 text-xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mx-2">
          <h2 className="text-[24px] font-[600] leading-[32.4px] text-[#000000] text-center mb-4">
            Refer a friend and help them build their own Career Toolbox!
          </h2>

          {/* Instagram */}
          <div className="relative w-full mb-3">
            <input
              type="text"
              value={instaLink}
              readOnly
              className="border border-gray-400 w-full rounded-md p-3 pr-12"
            />
            <button
              onClick={() => handleCopy(instaLink)}
              className="absolute right-[1px] rounded-r-md top-1/2 -translate-y-1/2 bg-gray-200 h-12 w-14 text-blue-500 text-sm font-medium"
            >
              {copiedLink === instaLink ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Facebook */}
          <div className="relative w-full mb-3">
            <input
              type="text"
              value={fbLink}
              readOnly
              className="border border-gray-400 w-full rounded-md p-3 pr-12"
            />
            <button
              onClick={() => handleCopy(fbLink)}
              className="absolute right-[1px] rounded-r-md top-1/2 -translate-y-1/2 bg-gray-200 h-12 w-14 text-blue-500 text-sm font-medium"
            >
              {copiedLink === fbLink ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* X (Twitter) */}
          <div className="relative w-full mb-3">
            <input
              type="text"
              value={xLink}
              readOnly
              className="border border-gray-400 w-full rounded-md p-3 pr-12"
            />
            <button
              onClick={() => handleCopy(xLink)}
              className="absolute right-[1px] rounded-r-md top-1/2 -translate-y-1/2 bg-gray-200 h-12 w-14 text-blue-500 text-sm font-medium"
            >
              {copiedLink === xLink ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Next Button */}
          <div className="mt-4">
            <AuthSubmitBtn text={"Close"} handleSubmit={() => onClose()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendModal;
