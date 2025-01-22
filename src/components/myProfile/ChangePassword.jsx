import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "old") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-[461px] h-[381px] max-w-md p-6 relative">
        <button
          className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl mt-3 font-semibold text-center mb-6 text-[#202224]">
          Change Password
        </h2>

        <div className="space-y-4">
          <AuthInput placeholder={"Old Password"} type={"password"} />
          <AuthInput placeholder={"New Password"} type={"password"} />
          <AuthInput placeholder={"Confirm Password"} type={"password"} />
        </div>
        <div className="mt-3">
          <AuthSubmitBtn text={"Save"} handleSubmit={() => onClose()} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
