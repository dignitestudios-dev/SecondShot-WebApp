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
    { path: "/mygoals", label: "My Goals" },
    { path: "/myresume", label: "My Resume" },
    { path: "/success-story", label: "Success Stories" },
    { path: "/my-library", label: "My Library" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="p-5 flex items-center gap-3 justify-between md:justify-center relative z-30">
      <img src={Logonav} className="w-[102.77px] h-[92.12px]" alt="Logo" />

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <HiOutlineX size="34px" className="text-black" />
          ) : (
            <HiOutlineMenu size="34px" className="text-black" />
          )}
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "block opacity-100 translate-y-0" : "hidden "
        } md:flex flex-col md:flex-row gap-4 md:mt-0 mt-11 items-center md:static absolute top-20 left-0 w-full md:w-auto bg-gradient-to-br from-[#012C57] to-[#061523] p-4 rounded md:rounded-full  md:bg-transparent 
        md:justify-center justify-between`}
      >
        <ul className="flex flex-col md:flex-row items-start md:items-center md:p-0 p-5 gap-4 text-[12px] font-[600] uppercase text-white">
          {navItems.map((item) => (
            <li
              key={item.path}
             
            >
              <Link to={item.path}>{item.label}</Link>
              <div  className={`${
                location.pathname === item.path ? "w-auto h-[1px]   bg-white" : ""
              } `} ></div>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-6  md:px-0 px-5 md:mt-0">
          <div className="relative cursor-pointer">
            <RiNotification2Line
              size={"24px"}
              className="text-white"
              onClick={() => setNotifOpen(!notifOpen)}
            />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></div>
            {notifOpen && <NotificationDropdown />}
          </div>
          <Link to="/my-profile">
            <img
              src={Profileimage}
              alt="User Avatar"
              className="h-[60px] w-[60px] rounded-full border-2 border-white p-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
