import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHome,
  faBell,
  faSignOut,
  faUser,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDashNavbar.css";

function EmployeeDashNavbarMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleSignout = () => {
    setIsLoading(true);
    localStorage.removeItem("TOKEN");
    navigate("/agent/login");
  };

  const handleNavClick = (path) => {
    if (location.pathname !== path) {
      setIsLoading(true);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 z-40 w-full bg-white shadow-[rgba(0,0,15,0.08)_0px_0px_20px_0px]">
        <nav className="flex justify-around items-center h-16 bg-white rounded-t-xl shadow-md">
          <Link to={`/agent/notification`} className={`text-center`}>
            <FontAwesomeIcon icon={faBell} size="lg" color="gray" />
            <p className="text-sm">Notify</p>
          </Link>

          <Link
            to="/agent/Application"
            className={`text-center ${
              isActive("/agent/Application") ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleNavClick("/agent/Application")}
          >
            <FontAwesomeIcon icon={faChartSimple} size="lg" />
            <p className="text-xs mt-1">Application</p>
          </Link>

          <Link
            to="/agent/dashboard"
            onClick={() => handleNavClick("/agent/dashboard")}
            className="relative text-center"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div
                className={`w-14 h-14 border-4 rounded-full flex items-center justify-center ${
                  isActive("/agent/dashboard")
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
            to="/agent/profile"
            className={`text-center ${
              isActive("/agent/profile") ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleNavClick("/agent/profile")}
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
            <p className="text-xs mt-1">Profile</p>
          </Link>

          <button onClick={handleSignout} className="text-center text-gray-400">
            <FontAwesomeIcon icon={faSignOut} size="lg" />
            <p className="text-xs mt-1">Sign Out</p>
          </button>
        </nav>
      </div>
    </>
  );
}

export default EmployeeDashNavbarMobile;
