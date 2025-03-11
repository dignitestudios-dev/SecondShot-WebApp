import React, { useContext, useEffect, useState } from "react";
import { FaBullseye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthSubmitBtn from "../../components/onboarding/AuthBtn";
import axios from "../../axios";
import { SuccessToast } from "../../components/toaster/ToasterContainer";
import { FiLoader } from "react-icons/fi";
import { ModalContext } from "../../context/GlobalContext";
import { Alertnoti, bell_icon } from "../../assets/export";

const Notifications = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const { setNotifications, notifications, getnotifications, allLoading } =
    useContext(ModalContext);

  useEffect(() => {
    getnotifications();
  }, []);

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/mark-notifications-read");

      if (response.status === 200) {
        const updatedNotifications = notifications.map((notif) => ({
          ...notif,
          is_read: true,
          bgColor: "bg-white",
        }));
        setNotifications(updatedNotifications);
        SuccessToast(response?.data?.message);
      }
    } catch (err) {
      console.log(err, "Error");
    } finally {
      setLoading(false);
    }
  };

  const allNotificationsRead = notifications.every((notif) => notif.is_read);

  const [deleteNoti, setDelete] = useState("");

  const deleteNotification = async (id) => {
    setDelete(id);
    setDeleteLoading(true);
    try {
      const response = await axios.delete("/api/user/delete-notification", {
        data: { notificationId: id },
      });

      if (response.status === 200) {
        getnotifications();
        SuccessToast(response?.data?.message);
      }
    } catch (err) {
      console.log(err, "Error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-left">
          Notifications
        </h1>
        <div>
          <AuthSubmitBtn
            text={"Mark all as read"}
            handleSubmit={markAllAsRead}
            loading={loading}
            disabled={allNotificationsRead}
          />
        </div>
      </div>

      <div className="bg-white rounded-t-3xl shadow-lg max-h-[80vh] overflow-y-auto rounded-b-3xl">
        {allLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex cursor-pointer relative items-start px-6 py-4 bg-gray-50 animate-pulse"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300">
                  {/* Placeholder for icon */}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <div className="w-2/3 bg-gray-300 h-4 rounded"></div>
                      <div className="w-1/2 bg-gray-300 h-3 rounded mt-1"></div>
                    </div>
                    <div className="text-right flex justify-start items-center gap-3">
                      <div className="w-1/3 bg-gray-300 h-3 rounded"></div>
                      <div className="w-1/3 bg-gray-300 h-3 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 text-md text-gray-500">
            No Notifications Found
          </div>
        ) : (
          <div className="bg-white max-h-[80vh] overflow-y-auto scrollbar-custom">
            {notifications?.map((notif, index) => (
              <div
                key={index}
                className={`flex cursor-pointer relative items-start px-6 py-4 ${
                  notif.is_read === false ? "bg-green-50" : "bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-full ${
                    notif?.notification_type === "created" ? "bg-green-100" : ""
                  } ${notif.iconColor}`}
                >
               {notif.notification_type === "created" ? (
  <FaBullseye />
) : notif.notification_type === "alert" ? (
  <img src={Alertnoti} alt="Alert Notification" />
) : <img src={bell_icon}  alt="Alert Notification"/>}

                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <div className="font-semibold text-gray-800">
                        {notif?.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-[-5px] text-left">
                        {notif?.message}
                      </div>
                    </div>
                    <div className="text-right flex justify-start items-center gap-3">
                      <div>
                        <div className="text-sm text-gray-600">
                          {new Date(notif?.createdAt).toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-400 text-right">
                          {new Date(notif?.createdAt).toLocaleDateString()}
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
                        onClick={() => deleteNotification(notif?._id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        {deleteNoti === notif?._id && deleteLoading ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
