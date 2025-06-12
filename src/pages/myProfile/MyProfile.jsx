import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import {
  AppleIcon,
  facebook,
  Globalweb,
  Instaicon,
  Playstore,
  Profileimage,
  Twittericon,
} from "../../assets/export";
import ChangePasswordModal from "../../components/myProfile/ChangePassword";
import ChangePaymentMethodModal from "../../components/myProfile/ChangePaymentMethod";
import DeactivateModal from "../../components/myProfile/DeactivateModal";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import InviteFriendModal from "../../components/myProfile/InviteFriendModal";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";
import ProfileSkeleton from "../../components/loader/ProfileSkeleton";
import {
  ErrorToast,
  SuccessToast,
} from "../../components/toaster/ToasterContainer";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { ModalContext } from "../../context/GlobalContext";
import { phoneFormater } from "../lib/helper";
function MyProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setloading] = useState(false);
  const [loader, setLoading] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [notificationOnOff, setNotificationOnOff] = useState(false);
  const [profileData, setProfile] = useState("");
  const [registrationData, setregistrationData] = useState("");
  const [notificationstatus, setNotificationstatus] = useState(false);
  const [notiloader, setNotiloader] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isChangePaymentMethodModalOpen, setIsChangePaymentMethodModalOpen] =
    useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const handleEdit = () => {
    navigate("/edit-registration-question");
    localStorage.setItem("isEditSkill", true);
  };

  const getProfile = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/my-profile");
      if (response.status === 200) {
        setProfile(response?.data?.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setloading(false);
    }
  };
  const getreqQuestion = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/user/get-registration-questions");
      if (response.status === 200) {
        setregistrationData(response?.data?.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getProfile();
    getreqQuestion();
  }, []);

  async function getDeviceFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    return result.visitorId;
  }

  const handlelogout = async () => {
    setLoading(true);
    try {
      let token = Cookies.get("token");

      const response = await axios.post("/api/user/logout", {
        deviceId: await getDeviceFingerprint(),
      });

      if (response.status === 200) {
        SuccessToast("Logout Successfully");
        Cookies.remove("token");
        navigate("/sign-in");
      }
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handledelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/user/delete-account");
      if (response.status === 200) {
        SuccessToast("Delete Account Successfully");
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
 


  const getnotifications = async () => {
    try {
      const response = await axios.get("/api/user/my-notification-setting");
      if (response.status === 200) {
        setNotificationstatus(response?.data?.data?.notification_enabled);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getnotifications();
  }, []);

  const handleNotification = async () => {
    setNotiloader(true);
    try {
      const response = await axios.post("/api/user/toggle-notification");

      if (response.status === 200) {
        const newStatus = response?.data?.data?.notification_enabled;
        setNotificationOnOff(newStatus);
        SuccessToast(response?.data?.message);
        getnotifications();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setNotiloader(false);
    }
  };
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-semibold text-black mt-4  mb-4">
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
                handleSubmit={() => handlelogout()}
                loading={loader}
              />
            </div>
          </div>

          <div className="w-3/4 bg-white rounded-r-lg  p-8">
            {activeTab === "profile" && (
              <>
                {loading ? (
                  <ProfileSkeleton />
                ) : (
                  <>
                    <div className="flex  justify-between items-center mb-8">
                      <h1 className="text-[24px] font-[500] text-[#000000]">
                        My Profile
                      </h1>
                      <button
                        onClick={() =>
                          navigate("/edit-profile-details", {
                            state: profileData,
                          })
                        }
                        className="flex  items-center space-x-2 text-white   bg-gradient-to-l from-[#012C57] to-[#061523] px-4 py-2 rounded-md shadow-sm w-[116px] h-[40px] text-center"
                      >
                        <span>Edit Profile</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center mb-8">
                      {profileData?.profile_img ? (
                        <img
                          src={profileData?.profile_img}
                          alt="User Avatar"
                          className="h-24 w-24 rounded-full shadow-lg mr-6"
                        />
                      ) : (
                        <div className="h-24 w-24 flex items-center justify-center rounded-full shadow-lg mr-6 bg-gray-300 text-[#012C57] text-[20px] font-bold uppercase">
                          {profileData?.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                      <div>
                        <h2 className="text-[20px] font-[600] text-black text-left">
                          {profileData?.name}
                        </h2>
                        <p mailto:classname="text-black mt-5 text-[16px] ">
                          {profileData?.email}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-black font-medium text-base ">
                          Phone Number
                        </p>
                        <p className="text-black text-base">
                         +1 {phoneFormater(profileData?.phone || "")}

                        </p>
                        {profileData?.address ? (
                          <>
                            {" "}
                            <p className="text-black font-medium text-base  ">
                              School / Organization name
                            </p>
                            <p className="text-black font-normal text-base  ">
                              {profileData?.address || ""}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                          <p className="text-black font-medium text-base  ">Address</p>
                        <p className="text-black text-base font-normal ">
                          {profileData?.state}, {profileData?.city}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between gap-3 mt-5">
                      <div className="flex gap-3">
                        {[Playstore,AppleIcon,Globalweb]?.map(
                          (item, index) => (
                            <img
                              src={item}
                              className="w-[22px] h-[22px] object-contain "
                              key={index}
                              alt=""
                            />
                          )
                        )}
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
                        <h3 className="text-[18px] font-[500] text-[#000000] leading-[21.09px] ">
                          Education
                        </h3>
                        <p className="text-black text-[16px] mt-3">
                          {registrationData?.current_grade_level}
                        </p>

                        <p className="text-[16px] font-[500] mt-2 text-[#000000] ">
                          Favorite Grade School Subject
                        </p>
                        <p className="text-black">
                          {
                            registrationData?.favorite_middle_school_subject
                              ?.subject_name
                          }
                        </p>
                        {registrationData.has_military_service == true ? (
                          <div>
                            <h3 className="text-[18px] mt-5 font-[500] text-black ">
                              Military Service
                            </h3>
                            <h3 className="text-[16px] mt-1 font-[500] text-black ">
                              Branch of Service
                            </h3>
                            <p className="text-black leading-[18.75px] mt-2 mb-2 ">
                              {" "}
                              {
                                registrationData?.branch_of_service
                                  ?.service_name
                              }
                            </p>

                            <p className="text-[20px] font-[500] text-black ">
                              Position
                            </p>
                            <p className="text-black">
                              {registrationData?.rank?.rank_name}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* <div>
                          <h3 className="text-[18px] font-[500] text-black ">
                            Career
                          </h3>
                          <p className="text-black w-full text-wrap break-words">
                            {registrationData?.desired_career_path}
                          </p>
                        </div> */}
                      </div>

                      <div className="pl-4">
                        {registrationData?.is_athlete == true ? (
                          <>
                            <h3 className="text-[18px] font-[500] text-#000000 ">
                              Athlete Background
                            </h3>
                            <p className="text-[18px] mt-3 font-[500] text-[#000000] ">
                              Primary Sport
                            </p>
                            <p className="text-black">
                              {registrationData?.primary_sport?.sport_name}
                            </p>
                            <p className="text-[18px] mt-3 font-[500] text-[#000000] ">
                              Position
                            </p>
                            <p className="text-black">
                              {registrationData?.sport_position?.position_name}
                            </p>
                          </>
                        ) : (
                          ""
                        )}

                        <h3 className="text-[18px] mt-3 font-[500] text-#000000 ">
                          Hobbies
                        </h3>
                        <div className=" text-black  justify-center  font-[400] cursor-pointer  rounded-[12px] ">
                          {registrationData?.favorite_hobby1?.hobbie_name}
                        </div>
                        <div className=" text-black  justify-center  font-[400] cursor-pointer  rounded-[12px] ">
                          {registrationData?.favorite_hobby2?.hobbie_name}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "settings" && (
              <>
                <h1 className="text-2xl font-semibold text-black mb-8 text-left">
                  Account Settings
                </h1>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-black text-left">
                        Password
                      </h2>
                      <p className="text-black text-left">*******</p>
                    </div>
                    <div>
                      <AuthSubmitBtn
                        text={"Change"}
                        handleSubmit={() => setIsChangePasswordModalOpen(true)}
                      />
                    </div>
                  </div>
                  {profileData?.current_subscription_plan === "access-code" ? (
                    ""
                  ) : (
                    <hr className=" border-t border-gray-200" />
                  )}
                  <div className="flex justify-between items-center">
                    {profileData?.current_subscription_plan ===
                    "access-code" ? (
                      <div></div>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-lg font-semibold text-black text-left">
                            Subscription
                          </h2>
                          <p className="text-black text-left">Subscriptions</p>
                        </div>
                        <div>
                          <AuthSubmitBtn
                            text={"Manage"}
                            handleSubmit={() =>
                              navigate("/profile-subscription")
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <hr className=" border-t border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-black text-left">
                        Delete Account
                      </h2>
                      <p className="text-black text-left">
                        Are you sure you want to delete your account?
                      </p>
                    </div>
                    <div>
                      <AuthSubmitBtn
                        text={"Delete Account"}
                        handleSubmit={() => setIsDeactivateModalOpen(true)}
                      />
                    </div>
                  </div>
                  <hr className=" border-t border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-black text-left">
                        Notification
                      </h2>
                      <p className="text-black text-left">
                        You can turn your notifications on or off.
                      </p>
                    </div>
                    <label
                      className="relative inline-flex items-center cursor-pointer"
                      onClick={handleNotification}
                    >
                      {notiloader && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-full z-10">
                          <div className="w-6 h-6 border-blue-900 rounded-full animate-pulse"></div>
                        </div>
                      )}

                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationstatus}
                        onChange={handleNotification}
                        disabled={notiloader}
                      />
                      <div
                        className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white rounded-full peer dark:bg-gray-700 
        ${
          notificationstatus
            ? "peer-checked:bg-blue-900"
            : "peer-checked:bg-white"
        } 
        peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
        after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
                      ></div>
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
        <DeactivateModal
          onClose={() => setIsDeactivateModalOpen(false)}
          handleClick={() => handledelete()}
          loader={loader}
        />
      )}
      <InviteFriendModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </div>
  );
}

export default MyProfile;
