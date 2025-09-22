import React, { useState } from "react";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const InviteFriendModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState("");

  const data = [
    { label: "Website", link: "https://secondshot-app.vercel.app/" },
    {
      label: "Google Play Store",
      link: "https://play.google.com/store/apps/details?id=com.dignitestudios.secondshotapp",
    },
    { label: "Apple App Store", link: "https://apps.apple.com/us/app/career-prep-toolbox/id6740980943" },
  ];

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(""), 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-6 py-8 relative">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold text-center text-black mb-2">
          Refer a friend and help them build their own Career Prep Toolbox!
        </h2>
        <p className="text-center  text-gray-400 text-[14px]  mb-4">
          Invite your friends by sharing the download link, available on App
          Store, Play Store and the web. One tap to copy and you're ready to
          share!
        </p>

        {data.map(({ label, link }) => (
          <div key={label} className="relative w-full mb-4">
            <input
              type="text"
              value={label}
              readOnly
              className="border border-gray-300 w-full rounded-xl p-3 pr-20 text-sm text-gray-700"
            />
            <button
              onClick={() => handleCopy(link)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-blue-500 font-medium text-sm"
            >
              {copiedLink === link ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}

        <AuthSubmitBtn text="Close" handleSubmit={onClose} />
      </div>
    </div>
  );
};

export default InviteFriendModal;
