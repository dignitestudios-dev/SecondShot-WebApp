import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import {
  facebook,
  Instaicon,
  Profileimage,
  Twittericon,
} from "../../assets/export";
import ChangePasswordModal from "../../components/myProfile/ChangePassword";
import ChangePaymentMethodModal from "../../components/myProfile/ChangePaymentMethod";
import DeactivateModal from "../../components/myProfile/DeactivateModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import InviteFriendModal from "../../components/myProfile/InviteFriendModal";
import { AuthContext } from "../../context/AuthContext";

function MyProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isChangePaymentMethodModalOpen, setIsChangePaymentMethodModalOpen] =
    useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const handleEdit = () => {
    navigate("/edit-registration-question");
    localStorage.setItem("isEditSkill", true);
  };
  const [inviteOpen, setInviteOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-semibold text-gray-800 mt-4  mb-4">
          Profile & Account Setting
        </h1>

        <div className="flex shadow-lg rounded-[22px]">
          <div className="w-1/4 bg-white rounded-l-xl p-4 flex flex-col justify-between">
            <ul className="">
              <li
                className={` p-3 rounded-lg cursor-pointer text-left ${
                  activeTab === "profile"
                    ? " bg-gradient-to-l from-[#012C57] to-[#061523] text-white"
                    : "text-gray-800 font-[500]"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                My Profile
              </li>
              <li
                className={` p-3 rounded-lg cursor-pointer text-left ${
                  activeTab === "settings"
                    ? " bg-gradient-to-l from-[#012C57] to-[#061523] text-white"
                    : "font-[500] text-gray-800"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Account Settings
              </li>
            </ul>
            <div className="w-[140px]">
              <AuthSubmitBtn
                text={"Log out"}
                handleSubmit={() => {
                  logout();
                 
                }}
              />
            </div>
          </div>

          <div className="w-3/4 bg-white rounded-r-lg  p-8">
            {activeTab === "profile" && (
              <>
                <div className="flex  justify-between items-center mb-8">
                  <h1 className="text-[24px] font-[500] text-[#000000]">
                    My Profile
                  </h1>
                  <button
                    onClick={() => navigate("/edit-profile-details")}
                    className="flex  items-center space-x-2 text-white   bg-gradient-to-l from-[#012C57] to-[#061523] px-4 py-2 rounded-md shadow-sm w-[116px] h-[40px] text-center"
                  >
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center mb-8">
                  <img
                    src={Profileimage}
                    alt="User Avatar"
                    className="h-24 w-24 rounded-full shadow-lg mr-6"
                  />
                  <div>
                    <h2 className="text-[20px] font-[600] text-[#050405] text-left">
                      Sanethia Thomas
                    </h2>
                    <p mailto:classname="text-[#050405] mt-5 text-[16px] ">
                      sanethiathomas@mail.com
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[#050405] text-[16px] ">+000 0000 000</p>
                    <p className="text-[#050405] text-[16px] mb-3">
                      Toronto, Canada
                    </p>
                    <p className="text-[#222222] font-[500] text-[16px] leading-[21.6px] ">
                      Visit our website
                    </p>
                    <p className="text-[#222222] font-[400] text-[16px] leading-[21.6px] underline ">
                      www.secondshot.com/56et
                    </p>
                  </div>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-3 mt-5">
                  <div className="flex gap-3">
                    {[Instaicon, facebook, Twittericon]?.map((item, index) => (
                      <img
                        src={item}
                        className="w-[24px] h-[24px] "
                        key={index}
                        alt=""
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setInviteOpen(true)}
                    className="flex items-center space-x-2 text-white   bg-gradient-to-l from-[#012C57] to-[#061523] px-4 py-2 rounded-md shadow-sm w-[139.27px] h-[44px] text-center"
                  >
                    <span>Invite Friends</span>
                  </button>
                </div>

                <hr className="my-4 border-t border-gray-200" />

                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[24px] font-[500] text-[#000000]">
                    Personal information
                  </h2>
                  <button
                    onClick={handleEdit}
                    className="flex items-center  text-[#012C57] font-[500] bg-gray-200 px-4 py-2 rounded-lg shadow-sm  h-[42px] text-center"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 text-left">
                  <div className="border-r pr-4">
                    <h3 className="text-[18px] font-[500] text-gray-800 mb-2">
                      Education
                    </h3>
                    <p className="text-gray-700">
                      Grade level or Professional Level
                    </p>
                    <p className="text-[18px] font-[500]">College</p>
                    <p className="text-gray-700">
                      Favorite Grade School Subject: Math
                    </p>
                    <p className="text-gray-700 text-[18px] font-[500] mb-2">
                      Math
                    </p>

                    <div>
                      <h3 className="text-[20px] font-[500] text-[#000000] mb-2">
                        Military Service
                      </h3>
                      <p className="text-gray-700">Branch of Service</p>
                      <p className="text-[#000000] font-[500] text-[16px] mb-2">
                        Airforce
                      </p>
                      <p className="text-gray-700">Position</p>
                      <p className="text-[#000000] font-[500] text-[16px] mb-2">
                        E-4 Senior Airman
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-[500] text-[#000000] mb-2">
                        Career
                      </h3>
                      <p className="text-gray-700">Desired Career</p>
                      <p className="text-[#000000] font-[500] mb-2">Engineer</p>
                    </div>
                  </div>

                  <div className="pl-4">
                    <h3 className="text-[18px] font-[500] text-#000000 mb-2">
                      Athlete Background
                    </h3>
                    <p className="text-gray-700">Primary Sport</p>
                    <p className="text-[16px] font-[500] text-#000000 mb-2">
                      Baseball/Softball
                    </p>
                    <p className="text-gray-700">Position</p>
                    <p className="text-[16px] font-[500] text-#000000 mb-2">
                      First Baseman
                    </p>

                    <h3 className="text-[18px] font-[500] text-#000000 mb-2">
                      Hobbies
                    </h3>
                    <div className=" text-[#0F0F0F]  justify-center  font-[400] cursor-pointer w-[150px] h-[49px] rounded-[12px] ">
                      Cooking
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "settings" && (
              <>
                <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
                  Account Settings
                </h1>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 text-left">
                        Password
                      </h2>
                      <p className="text-gray-600 text-left">*******</p>
                    </div>
                    <button
                      className="text-gray-400 bg-gray-200 px-4 py-2 rounded-md shadow-sm text-left"
                      onClick={() => setIsChangePasswordModalOpen(true)} // Open the password modal when clicked
                    >
                      Change
                    </button>
                  </div>
                  <hr className=" border-t border-gray-200" />
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 text-left">
                        Payment Method
                      </h2>
                      <p className="text-gray-600 text-left">
                        Change payment Method
                      </p>
                    </div>
                    <button
                      className="text-gray-400 bg-gray-200 px-4 py-2 rounded-md shadow-sm cursor-pointer text-left"
                      onClick={() => setIsChangePaymentMethodModalOpen(true)} // Open the payment method modal when clicked
                    >
                      Change
                    </button>
                  </div>
                  <hr className=" border-t border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 text-left">
                        Subscription
                      </h2>
                      <p className="text-gray-600 text-left">Subscriptions</p>
                    </div>
                    <div>
                      <AuthSubmitBtn
                        text={"Buy Subscription"}
                        handleSubmit={() => navigate("/profile-subscription")}
                      />
                    </div>
                  </div>
                  <hr className=" border-t border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 text-left">
                        Deactivate Account
                      </h2>
                      <p className="text-gray-600 text-left">
                        Are you sure you want to deactivate your account?
                      </p>
                    </div>
                    <div>
                      <AuthSubmitBtn
                        text={"Deactivate Account"}
                        handleSubmit={() => setIsDeactivateModalOpen(true)}
                      />
                    </div>
                  </div>
                  <hr className=" border-t border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 text-left">
                        Notification
                      </h2>
                      <p className="text-gray-600 text-left">
                        You can turn your notifications on or off.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-900"></div>
                    </label>
                  </div>
                </div>
                <div className="lg:mb-[262px]"></div>
              </>
            )}
          </div>
        </div>
      </div>

      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}

      {isChangePaymentMethodModalOpen && (
        <ChangePaymentMethodModal
          onClose={() => setIsChangePaymentMethodModalOpen(false)}
          isOpen={isChangePaymentMethodModalOpen}
        />
      )}

      {isDeactivateModalOpen && (
        <DeactivateModal onClose={() => setIsDeactivateModalOpen(false)} />
      )}
      <InviteFriendModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </div>
  );
}

export default MyProfile;
