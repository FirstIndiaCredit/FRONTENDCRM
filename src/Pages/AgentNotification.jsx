import React from "react";
import EmployeeDashNavigator from "../Components/EmployeeDashNavigator";
import EmployeeDashNavbarMobile from "../Components/EmployeeDashNavbarMobile";
import EmployeeDashNavBar from "../Components/EmployeeDashNavBar";

function AgentNotification() {
  return (
    <div className="h-screen flex justify-center items-center ">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <EmployeeDashNavigator />
      </aside>
      <div className="flex   flex-col  justify-center items-center">
        <div className="hidden md:block ">
          <EmployeeDashNavBar />
        </div>
        <div className="block md:hidden">
          <EmployeeDashNavbarMobile />
        </div>
        <img
          src="/nonotification.jpg"
          alt="No notifications"
          className="w-40 h-40 mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-500">
          No notifications yet!
        </h2>
        <p className="text-gray-300 mt-2">
          We'll notify you when something arrives!
        </p>
      </div>
    </div>
  );
}

export default AgentNotification;
