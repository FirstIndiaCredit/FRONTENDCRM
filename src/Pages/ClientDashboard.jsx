import React, { useEffect, useState } from "react";
import LOANBUTTON from "../Components/LOANBUTTON";
import UserDashNavigator from "../Components/UserDashNavigator";
import UserDashNavBar from "../Components/UserDashNavBar";
import NewsFeedMobile from "../Components/NewsFeedMobile";
import "./ClientDash.css";
import UserDashNavBarBig from "../Components/UserDashNavBarBig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faBell,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ClientDashboard() {
  const [username, setUsername] = useState();
  const [contactNumber, setContactNumber] = useState("+1-800-123-4567");
  const [address, setAddress] = useState("123 Main Street, Hometown, USA");
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const isActive2 = (path) => {
    return location.pathname.includes(path);
  };

  useEffect(() => {
    document.title = "User Dashboard";
    setUsername(localStorage.getItem("NAME"));
  }, []);

  const userId = localStorage.getItem("userId");

  const handleNavClick = (path) => {
    if (location.pathname !== path) {
      setIsLoading(true);
    }
  };

  const handleHeadphoneClick = () => {
    setIsPanelVisible(true);
  };

  const handleClosePanel = () => {
    setIsPanelVisible(false);
  };

  function ConfirmationPanel({ isVisible, onClose, contactNumber, address }) {
    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg md:w-[30%]  sm:w-2/3 mx-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Contact Details</h2>
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <p className="mb-2">
              <strong>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-blue-500 mr-2"
                />
                Number:
              </strong>{" "}
              {contactNumber}
            </p>
            <p>
              <strong>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-500 mr-2"
                />
                Address:
              </strong>{" "}
              {address}
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="min-h-screen relative bg-white">
          <aside className="bg-[#004aad] -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <UserDashNavigator />
          </aside>
          <div className="p-4 xl:ml-80">
            <div className=" sm:shadow-none hidden md:block  sm:static sm:top-0">
              <UserDashNavBarBig />
            </div>
            <div className="bg-white sm:shadow-none block md:hidden sm:bg-red-500 sm:static sm:top-0">
              <UserDashNavBar />
            </div>
            <div className="block md:hidden py-1 w-full z-99 bg-zinc-50 ">
              <NewsFeedMobile img={"/CRM Image/banner.png"} />
            </div>
            {/* Notifications and Help Line */}
            <div className="xl:flex hidden mb-5 items-center justify-between bg-white p-4 rounded-lg shadow-lg">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleHeadphoneClick}
              >
                <FontAwesomeIcon
                  icon={faHeadphones}
                  className="text-blue-500 mr-2 text-2xl"
                />
                <span className="font-semibold">Customer Care</span>
              </div>
              <Link
                to={`/user/notification/${userId}`}
                className={`text-center ${
                  isActive2(`notification`) ? "text-blue-600" : "text-black"
                }`}
                onClick={() => handleNavClick(userId)}
              >
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-blue-500 text-2xl mr-4"
                  />
                  <span className="font-semibold">Notifications</span>
                </div>
              </Link>
            </div>
            <div className="">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-lg shadow-lg mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">
                  Welcome, {username}👋
                </h1>
                <p className="mt-2 md:text-lg text-[11px]">
                  Your personal dashboard to manage and track your loans
                  efficiently.
                </p>
              </div>

              {/* Confirmation Panel */}
              <ConfirmationPanel
                isVisible={isPanelVisible}
                onClose={handleClosePanel}
                contactNumber={contactNumber}
                address={address}
              />
            </div>

            <div className=" px-0 py-0 item-baseline h-30 flex">
              {/* LOANS */}
              <div className="mb-12 flex gap-4 p-[0] items-center justify-center lg:justify-start w-full lg:w-[75%] flex-wrap tw-shadow-color: #f8fafc">
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 ">
                  <LOANBUTTON
                    img={"/CRM Image/PERSONAL LOAN Mobile.webp"}
                    h={40}
                    title={"Personal Loan"}
                    mainlink={"/user/loan1"}
                  />
                  <LOANBUTTON
                    img={"/CRM Image/CAR LOAN Mobile.webp"}
                    h={40}
                    title={"Car Loan"}
                    mainlink={"/user/loan2"}
                  />
                  <LOANBUTTON
                    img={"/CRM Image/HOMELOAN Mobile.webp"}
                    h={40}
                    title={"Home Loan"}
                    mainlink={"/user/loan3"}
                  />
                  <LOANBUTTON
                    img={"/CRM Image/BUSINESS LOAN Mobile.webp"}
                    h={40}
                    title={"Business Loan"}
                    mainlink={"/user/loan4"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Floating Customer Care Icon */}
        <div className="fixed xl:hidden bottom-16 left-3 rounded-[50%] shadow-lg z-999">
          <button
            onClick={handleHeadphoneClick}
            className="bg-blue-400 text-white px-3.5 py-3 rounded-full shadow-lg focus:outline-none"
          >
            <FontAwesomeIcon icon={faHeadphones} className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
