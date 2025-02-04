import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthInput from "../onboarding/AuthInput";
import AuthSubmitBtn from "../onboarding/AuthBtn";
import { ErrorToast, SuccessToast } from "../toaster/ToasterContainer";
import axios from "../../axios";
import { useFormik } from "formik";
import { ChangePassword } from "../../Schema/profileSchema";
import { changePasswordValues } from "../../data/profilefield";
const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "old") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: changePasswordValues,
      validationSchema: ChangePassword,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await axios.post("/api/user/change-password", {
            current_password: values?.oldpassword,
            new_password: values?.newpassword,
            confirm_password: values?.Cnewpassword,
          });
          if (response.status === 200) {
           
            SuccessToast("Change Password Successfully");
            onClose();
          }
        } catch (err) {
          ErrorToast(err.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-[461px] max-w-md p-6 relative">
        <button
          className="absolute top-0 right-2 text-xl text-gray-500 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl mt-3 font-semibold text-center mb-6 text-[#202224]">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AuthInput
              value={values.oldpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.oldpassword}
              id={"oldpassword"}
              name={"oldpassword"}
              placeholder={"Old Password"}
              type={"password"}
            />
            <AuthInput
              value={values.newpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.newpassword}
              id={"newpassword"}
              name={"newpassword"}
              placeholder={"New Password"}
              type={"password"}
            />
            <AuthInput
              value={values.Cnewpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.Cnewpassword}
              id={"Cnewpassword"}
              name={"Cnewpassword"}
              placeholder={"Confirm Password"}
              type={"password"}
            />
          </div>
          <div className="mt-3">
            <AuthSubmitBtn text={"Save"} type={"submit"} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
