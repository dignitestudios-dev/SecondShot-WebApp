import React, { useState } from "react";
import { Logonav, Profileimage } from "../../assets/export";
import { Link } from "react-router-dom";
import { RiNotification2Line } from "react-icons/ri";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import NotificationDropdown from "../Notifications/Notifications";

const Navbar = () => {
  const navItems = [
    { path: "/home", label: "Dashboard" },
    { path: "/transferablekills", label: "My Transferable Skills" },
    { path: "/careerrecommendation", label: "My Career Recommendations" },
    { path: "/myresume", label: "My Resume" },
    { path: "/mygoals", label: "My Goals" },
    { path: "/success-story", label: "Success Stories" },
    { path: "/my-library", label: "My Library" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

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
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
              <div
                className={`${
                  location.pathname === item.path ? "w-auto h-[1px] bg-white" : ""
                }`}
              ></div>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 md:space-x-6 md:px-5 px-5 md:mt-0">
          <div className="relative cursor-pointer">
            <RiNotification2Line
              size={"20px"}
              className="text-white"
              onClick={() => setNotifOpen(!notifOpen)}
            />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></div>
            {notifOpen && <NotificationDropdown setNotifOpen={setNotifOpen} />}
          </div>
          <Link to="/my-profile">
            <img
              src={Profileimage}
              alt="User Avatar"
              className="h-[40px] w-[40px] md:h-[60px] md:w-[60px] rounded-full border-2 border-white p-0.5"
            />
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
