import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDashNavBar from "../Components/UserDashNavBar";
import UserDashNavigator from "../Components/UserDashNavigator";
import { marked } from "marked";
import UserDashNavBarBig from "../Components/UserDashNavBarBig";
import "./Notification.css"; // Import the CSS file for the spinner

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Use isLoading for consistency
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
    document.title = "Notification";
  }, []);

  const userId = localStorage.getItem("userId");

  const fetchNotifications = async () => {
    try {
      setIsLoading(true); // Show the loading spinner
      const response = await axios.get(
        `https://backendcrm.vercel.app/api/v2/notifications?_id=${userId}`
      );
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to fetch notifications. Please try again later.");
    } finally {
      setIsLoading(false); // Hide the loading spinner
    }
  };

  const getNotificationStyle = (notification) => {
    if (notification.includes("Approved")) {
      return "bg-green-100 border-green-500 text-green-800";
    } else if (notification.includes("Rejected")) {
      return "bg-red-100 border-red-500 text-red-800";
    } else {
      return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <aside className="bg-[#004aad] -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <UserDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="sm:shadow-none hidden md:block sm:bg-transparent sm:static sm:top-0">
          <UserDashNavBarBig />
        </div>
        <div className="bg-white sm:shadow-none block md:hidden sm:bg-transparent sm:static sm:top-0">
          <UserDashNavBar />
        </div>
        <header className="flex items-center ">
          <img
            src={`/logo.jpg`}
            alt="Logo"
            className="md:h-10 h-7 w-auto mb-6 md:ml-4 ml-4"
          />
          <h1 className="text-xl md:text-3xl  ml-10 mb-6 md:m-auto font-semibold md:font-semibold md:text-center md:justify-center  ">
            Notifications
          </h1>
        </header>

        <div className="min-h-screen">
          {isLoading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative flex items-center justify-center">
                <div className="spinner">
                  <div className="logo-bounce">
                    <img
                      src="/logo.jpg" // Update this path if your logo is stored elsewhere
                      alt="Logo"
                      className="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-lg text-center">{error}</p>
          ) : notifications.length > 0 ? (
            <div className="space-y-4 md:max-w-[70%] m-auto">
              {[...notifications].reverse().map((notification, index) => (
                <div
                  key={index}
                  className={`border-l-4 p-4 rounded-lg shadow-lg ${getNotificationStyle(
                    notification
                  )} border-opacity-50`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: marked(notification) }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <img
                src="/nonotification.jpg"
                alt="No notifications"
                className="w-40 h-40 mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                No notifications yet!
              </h2>
              <p className="text-gray-400">
                We'll let you know when something arrives!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
