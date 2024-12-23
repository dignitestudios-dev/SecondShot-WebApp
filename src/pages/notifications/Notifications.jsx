import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaCreditCard,
  FaBullseye,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Backbutton from "../../components/Global/Backbutton";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Goals Deadline Alert",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "09:00pm",
      date: "Today",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      icon: <FaExclamationCircle />,
      dotColor: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      type: "Subscription Expiry",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "08:00pm",
      date: "July 12, 2024",
      iconBg: "bg-gray-100",
      iconColor: "text-blue-500",
      icon: <FaCreditCard />,
    },
    {
      id: 3,
      type: "Goal Successfully Created",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "12:30pm",
      date: "July 12, 2024",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      icon: <FaBullseye />,
      bgColor: "bg-green-50",

    },
    {
      id: 4,
      type: "Subscription Expiry",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "06:30pm",
      date: "July 12, 2024",
      iconBg: "bg-gray-100",
      iconColor: "text-blue-500",
      icon: <FaCreditCard />,
    },
    {
      id: 5,
      type: "Goal Successfully Created",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "09:00pm",
      date: "July 12, 2024",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      bgColor: "bg-green-50",

      icon: <FaBullseye />,
    },
    {
      id: 6,
      type: "Goals Deadline Alert",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "09:00pm",
      date: "July 12, 2024",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      icon: <FaExclamationCircle />,
    },
    {
      id: 7,
      type: "Goal Successfully Created",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "09:00pm",
      date: "July 12, 2024",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      icon: <FaBullseye />,
    },
    {
      id: 8,
      type: "Subscription Expiry",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore magna aliqua.",
      time: "06:30pm",
      date: "July 12, 2024",
      iconBg: "bg-gray-100",
      iconColor: "text-blue-500",
      icon: <FaCreditCard />,
      bgColor: "bg-green-50",

    },
  ]);

  const markAllAsRead = () => {
    const updatedNotifications = notifications?.map((notif) => ({
      ...notif,
      bgColor: "bg-white",
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="">
      <div className="">
        <div className="w-full flex justify-between items-center mb-6 ">
          <h1 className="text-3xl font-semibold text-gray-800 text-left">
            Notifications
          </h1>
          <div>
            <AuthSubmitBtn
              text={"Mark all as read"}
              handleSubmit={markAllAsRead}
            />
          </div>
        </div>
        <div className="bg-white rounded-t-3xl shadow-lg max-h-[80vh] overflow-y-auto rounded-b-3xl ">
          <div className="bg-white max-h-[80vh] overflow-y-auto scrollbar-custom">
            <div className="divide-y divide-gray-200">
              {notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`flex cursor-pointer relative items-start px-6 py-4 ${
                    notif.bgColor || ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full ${notif.iconBg} ${notif.iconColor}`}
                  >
                    {notif.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col justify-start items-start gap-1">
                        <div className="font-semibold text-gray-800">
                          {notif.type}
                        </div>
                        <div className="text-sm text-gray-600 mt-[-5px] text-left">
                          {notif.message}
                        </div>
                      </div>

                      <div className="text-right flex justify-start items-center gap-3">
                        <div>
                          <div className="text-sm text-gray-600">
                            {notif.time}
                          </div>
                          <div className="text-sm text-gray-400 text-right">
                            {notif.date}
                          </div>
                          {notif.dotColor && (
                            <div className="">
                              <span
                                className={`h-2 w-2 pr-2 rounded-full inline-block ${notif.dotColor}`}
                              ></span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            setNotifications(
                              notifications.filter((n) => n !== notif)
                            )
                          }
                          className="text-gray-500 hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 5px;
          height: 2px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #061523;
          border-radius: 8px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          border-radius: 8px;
        }

        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #061523 transparent;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
