import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { Alertnoti, Expirynoti, Notisuccess } from "../../assets/export";

const notifications = [
  {
    id: 1,
    type: "Goals Deadline Alert",
    message: "Lorem ipsum dolor sit amet",
    time: "09:00pm",
    date: "Today",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    icon: (
      <img
        src={Alertnoti}
        alt="Subscription Expiry"
        className="h-[50px] w-[50px]"
      />
    ),
    dotColor: "bg-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    type: "Subscription Expiry",
    message: "Lorem ipsum dolor sit amet",
    time: "08:00pm",
    date: "Jul/12/2024",
    iconBg: "bg-gray-100",
    iconColor: "text-blue-500",
    icon: (
      <img
        src={Expirynoti}
        alt="Subscription Expiry"
        className="h-[50px] w-[50px]"
      />
    ), // Use the imported image
  },
  {
    id: 3,
    type: "Goal Successfully Created",
    message: "Lorem ipsum dolor sit amet",
    time: "12:30pm",
    date: "Jul/12/2024",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    icon: (
      <img
        src={Notisuccess}
        alt="Subscription Expiry"
        className="h-[50px] w-[50px]"
      />
    ),
  },

  {
    id: 2,
    type: "Subscription Expiry",
    message: "Lorem ipsum dolor sit amet.",
    time: "08:00pm",
    date: "Jul/12/2024",
    iconBg: "bg-gray-100",
    iconColor: "text-blue-500",
    icon: (
      <img
        src={Expirynoti}
        alt="Subscription Expiry"
        className="h-[50px] w-[50px]"
      />
    ), // Use the imported image
  },
  {
    id: 2,
    type: "Subscription Expiry",
    message: "Lorem ipsum dolor sit amet.",
    time: "08:00pm",
    date: "Jul/12/2024",
    iconBg: "bg-gray-100",
    iconColor: "text-blue-500",
    icon: (
      <img
        src={Expirynoti}
        alt="Subscription Expiry"
        className="h-[50px] w-[50px]"
      />
    ), // Use the imported image
  },
];

const NotificationDropdown = ({setNotifOpen}) => {
  const navigation =useNavigate()
  return (
    <div className="absolute -right-[100px]   mt-9 w-[416px] bg-white rounded-3xl shadow-lg z-50">
      <div className="py-3 px-5 h-[62px] bg-gradient-to-r from-[#012C57] to-[#061523] text-white rounded-t-xl flex justify-between items-center">
        <div className="text-[18px] font-[500]">Notifications</div>
        <div
          className="text-sm text-green-300 hover:underline"
          onClick={() => {
            navigation('/notifications')
            setNotifOpen(false);
          }}
        >
          View All
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className={`flex items-start px-5 py-3 ${
              index === 0 ? "bg-green-50" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center  rounded-full ${notif.iconBg} ${notif.iconColor}`}
            >
              {notif.icon}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between mb-1">
                <div className="font-[500] leading-[21.6px] text-[#303030] text-left text-[14px]">
                  {notif.type}
                </div>
                <div className="text-[12px] text-[#181818] font-[500] leading-[16.2px] text-left">
                  {notif.date}
                </div>
              </div>
              <div className="text-[14px] text-[#303030] font-[400] leading-[18.9px] text-left">
                {notif.message}
              </div>
            </div>
            {notif.dotColor && (
              <div className="ml-4 mt-1">
                <span
                  className={`h-2 w-2 rounded-full inline-block text-right ${notif.dotColor}`}
                ></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
