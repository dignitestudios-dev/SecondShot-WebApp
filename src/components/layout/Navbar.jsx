import React, { useContext, useEffect, useState } from "react";
import {
  Carriericon1,
  Carriericon2,
  Carriericon3,
  Carriericon4,
  Carriericon5,
  Carriericon6,
  Logonav,
  Profileimage,
} from "../../assets/export";
import { Link, useNavigate } from "react-router-dom";
import { RiNotification2Line } from "react-icons/ri";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import NotificationDropdown from "../Notifications/Notifications";
import { ModalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import LockModal from "../home/LockModal";

const Navbar = () => {
  const { subscriptionpaid, profilepic, profilename } = useContext(AuthContext);
  const { notifications, countNoti } = useContext(ModalContext);

  const navigate = useNavigate();
  const [lock, setLock] = useState(false);

  const navItems = [
    { path: "/home", label: "Dashboard", icon: Carriericon1 },
    {
      path: "/transferablekills",
      label: "My Transferable Skills",
      icon: Carriericon1,
    },
    {
      path: "/careerrecommendation",
      label: "My Career Recommendations",
      subpath1: "/careerdetails",
      icon: Carriericon2,
    },
    {
      path: "/myresume",
      label: "My Resume",
      subpath1: "/view-resume",
      icon: Carriericon3,
    },
    {
      path: "/mygoals",
      label: "My Goals",
      subpath1: "/goal-detail",
      icon: Carriericon4,
    },
    {
      path: "/success-story",
      label: "Success Stories",
      subpath1: "/matched-pro-detail",
      subpath2: "/story-pro-detail",
      icon: Carriericon5,
    },
    {
      path: "/my-library",
      label: "My Library",
      subpath1: "/careerfav-detail",
      icon: Carriericon6,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const profile = Cookies.get("profileData")
    ? JSON.parse(Cookies.get("profileData"))
    : null;

  return (
    <div className="flex gap-3 relative z-30">
      <div className="md:hidden text-end flex justify-end w-full mt-4 p-6">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <HiOutlineX size="34px" className="text-black" />
          ) : (
            <HiOutlineMenu size="34px" className="text-black" />
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full sm:w-1/2 md:w-full lg:w-full justify-center bg-gradient-to-br from-[#012C57] to-[#061523] p-8 z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:bg-transparent md:flex md:flex-row md:items-center`}
      >
        {/* Close Button */}
        <div className="flex justify-end md:hidden">
          <button
            className="text-white text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <HiOutlineX />
          </button>
        </div>

        <ul className="flex flex-col md:flex-row items-start md:items-center md:p-0 p-5 gap-5 md:gap-10 lg:text-[14px] md:text-[14px] font-[600] uppercase text-white">
          {navItems?.map((item) => (
            <li key={item.path} className="flex flex-col items-center">
              {subscriptionpaid ||
              item.path === "/transferablekills" ||
              item.path === "/home" ? (
                <Link
                  to={item.path}
                  className="text-white uppercase flex flex-col items-center"
                >
                  {item.path !== "/home" && (
                    <div>
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="h-5 w-5 object-contain mb-2"
                      />
                    </div>
                  )}
                  <div className={`${item.path === "/home" ? "mt-6" : ""}`}>
                    {item.label}
                  </div>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => setLock(true)}
                    className="text-white uppercase flex flex-col items-center"
                  >
                    <img src={item.icon} alt="" className="h-5 w-5 mb-2" />{" "}
                    {/* Icon above */}
                    {item.label}
                  </button>
                </div>
              )}

              <div
                className={`h-[2px] mt-1  ${
                  location.pathname === item.path ||
                  location.pathname.includes(item.subpath1) ||
                  location.pathname.includes(item.subpath2)
                    ? "w-full bg-white"
                    : "w-0"
                }`}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4  md:space-x-6 md:px-5 px-5 md:mt-0 ">
          <div className="relative cursor-pointer mt-6">
            <RiNotification2Line
              size={"20px"}
              className="text-white"
              onClick={() => setNotifOpen((prev) => !prev)}
            />
            <div className="absolute -top-2 left-2 text-center flex justify-center items-center w-[15px] h-[15px]  bg-red-600 rounded-full">
              <div className="text-white font-semibold text-[10px]">
                {" "}
                {countNoti > 9 ? "9+" : countNoti}
              </div>
            </div>
            {notifOpen && (
              <NotificationDropdown
                setNotifOpen={setNotifOpen}
                notifications={notifications}
              />
            )}
          </div>
          <div className="mt-2">
          <Link to="/my-profile">
            {profilepic ? (
              <img
                src={profilepic}
                alt="User Avatar"
                className="h-[40px] w-[40px] md:h-[60px] md:w-[60px] rounded-full border-2 border-white p-0.5"
              />
            ) : (
              <div className="h-[40px] w-[40px] md:h-[60px] md:w-[60px] flex items-center justify-center rounded-full shadow-lg bg-gray-300 text-[#012C57] text-[18px] font-bold uppercase">
                {profilename
                  ?.split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
          </Link></div>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      <LockModal
        isOpen={lock}
        handleClick={() => navigate("/subscriptionplans")}
        onClose={() => setLock(false)}
        text={
          " Buy a subscription to unlock this feature and enjoy exclusive benefits."
        }
      />
    </div>
  );
};

export default Navbar;
