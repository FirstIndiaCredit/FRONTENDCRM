import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faChartSimple,
  faUserPlus,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminNavBar.css";

function AdminDashNavbarMobile() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavClick = (path) => {
    if (location.pathname !== path) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false); // Simulate loading time
      }, 1000); // Adjust the timeout based on your loading time
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {isLoading && (
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
      )}
      <div className="fixed bottom-0 left-0 z-40 w-full bg-white shadow-[rgba(0,0,15,0.08)_0px_0px_20px_0px]">
        <nav className="flex justify-around items-center h-16 bg-white rounded-t-xl shadow-md">
          <Link
            to="/admin/Agent"
            className={`text-center ${isActive("/admin/Agent") ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick("/admin/Agent")}
          >
            <FontAwesomeIcon icon={faUserSecret} size="lg" />
            <p className="text-xs mt-1">Agents</p>
          </Link>

          <Link
            to="/admin/AddAgent"
            className={`text-center ${isActive("/admin/AddAgent") ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick("/admin/AddAgent")}
          >
            <FontAwesomeIcon icon={faUserPlus} size="lg" />
            <p className="text-xs mt-1">Add Agents</p>
          </Link>

          <Link
            to="/admin/dashboard"
            onClick={() => handleNavClick("/admin/dashboard")}
            className="relative text-center"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div
                className={`w-14 h-14 border-4 rounded-full flex items-center justify-center ${isActive("/admin/dashboard")
                  ? "bg-blue-600 border-blue-600"
                  : "bg-gray-400"
                  }`}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  size="lg"
                  className="text-white"
                />
              </div>
            </div>
          </Link>

          <Link
            to="/admin/Application"
            className={`text-center ${isActive("/admin/Application") ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick("/admin/Application")}
          >
            <FontAwesomeIcon icon={faChartSimple} size="lg" />
            <p className="text-xs mt-1">Application</p>
          </Link>

          <Link
            to="/admin/profile"
            className={`text-center ${isActive("/admin/profile") ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick("/admin/profile")}
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
            <p className="text-xs mt-1">Profile</p>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default AdminDashNavbarMobile;
