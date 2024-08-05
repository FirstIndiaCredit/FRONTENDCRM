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

function UserDashNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const handleSignout = () => {
    setIsLoading(true);
    localStorage.removeItem("TOKEN");
    navigate("/signin");
  };

  const handleNavClick = (path) => {
    if (location.pathname !== path) {
      setIsLoading(true);
    }
  };

  // Function to determine if a link is active based on its path
  const isActive = (path) => {
    return location.pathname === path;
  };
  const isActive2 = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex items-center h-4 w-4 justify-center">
            <div className="spinner">
              <div className="logo-bounce">
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="logo"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 z-40 w-full bg-white shadow-[rgba(0,0,15,0.08)_0px_0px_20px_0px]">
        <nav className="flex justify-around items-center h-14 bg-white rounded-t-xl shadow-md">
          {/* Notification */}
          <Link
            to={`/user/notification/${userId}`}
            className={`text-center ${isActive2(`notification`) ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick(userId)}
          >
            <FontAwesomeIcon icon={faBell} size="lg" />
            <p className="text-sm">Notify</p>
          </Link>

          {/* Status */}
          <Link
            to="/user/status"
            className={`text-center ${isActive("/user/status") ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick("/user/status")}
          >
            <FontAwesomeIcon icon={faChartSimple} size="lg" />
            <p className="text-sm">Status</p>
          </Link>

          {/* Home */}
          <Link
            to="/user/dashboard"
            onClick={() => handleNavClick("/user/dashboard")}
          >
            <div className="text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div
                  className={`w-14 h-14 border-4 rounded-full flex items-center justify-center ${isActive("/user/dashboard")
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
            </div>
          </Link>

          {/* Profile */}
          <Link
            to="/user/profile"
            className={`text-center ${isActive("/user/profile") ? "text-blue-600" : "text-gray-500"
              }`}
            onClick={() => handleNavClick("/user/profile")}
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
            <p className="text-sm">Profile</p>
          </Link>

          {/* SignOut */}
          <button onClick={handleSignout} className="text-center text-gray-400">
            <FontAwesomeIcon icon={faSignOut} size="lg" />
            <p className="text-sm">Sign Out</p>
          </button>
        </nav>
      </div>
    </>
  );
}

export default UserDashNavBar;
1;
