import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { Alertnoti, Expirynoti, Notisuccess } from "../../assets/export";
import { FaBullseye } from "react-icons/fa";

const NotificationDropdown = ({ setNotifOpen, notifications }) => {
  const dropdownRef = useRef(null);
  const navigation = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="absolute -right-[100px]     mt-9 w-[416px] bg-white rounded-3xl shadow-lg z-50"
      ref={dropdownRef}
    >
      <div className="py-3 px-5 h-[62px]  bg-gradient-to-r from-[#012C57] to-[#061523] text-white rounded-t-xl flex justify-between items-center">
        <div className="text-[18px] font-[500]">Notifications</div>
        <div
          className="text-sm text-green-300 hover:underline"
          onClick={() => {
            navigation("/notifications");
            setNotifOpen(false);
          }}
        >
          View All
        </div>
      </div>
      {notifications.length === 0 ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-[14px] text-[#303030] font-[400] leading-[18.9px] text-center">
            No Notifications
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 h-[300px] overflow-y-auto">
          {notifications
            ?.filter((notif) => notif.is_read === false)
            .map((notif, index) => (
              <div
                key={index}
                className={`flex cursor-pointer relative items-start px-6 py-4 ${
                  notif.is_read === false ? "bg-green-50" : "bg-white"
                }`}
              >
                <div
                  className={`flex items-center h-12 w-12 justify-center rounded-full ${
                    notif?.notification_type === "created" ? "bg-green-100" : ""
                  } ${notif.iconColor}`}
                >
                  {notif.notification_type === "created" && <FaBullseye />}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between mb-1">
                        <div className="font-[500] leading-[21.6px] text-[#303030] text-left text-[14px]">
                          {notif?.title}
                        </div>
                        <div className="text-[12px] text-[#181818] font-[500] leading-[16.2px] text-left">
                          {new Date(notif?.createdAt).toDateString()}
                        </div>
                      </div>
                      <div className="text-[14px] text-[#303030] font-[400] leading-[18.9px] text-left">
                        {notif?.message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
