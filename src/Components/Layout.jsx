import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();

  // const dashboardPaths = [
  //   // USER---------------------------------
  //   "/user/dashboard",
  //   "/user/status",
  //   "/user/profile",
  //   "/user/loan1",
  //   "/user/loan2",
  //   "/user/loan3",
  //   "/user/loan4",
  //   "/user/loan5",
  //   "/user/loan6",
  //   "/user/LoanSubmitted",
  //   // AGENT--------------------------------
  //   "/agent/dashboard",
  //   "/agent/profile",
  //   "/agent/application",
  //   // ADMIN--------------------------------
  //   "/admin/dashboard",
  //   "/admin/profile",
  //   "/admin/application",
  //   "/admin/agent",
  // ];
  const anotherLocations = ["/aboutus" / "/support"];

  // Check if the current path is in the dashboardPaths array
  // const isDashboard = dashboardPaths.includes(location.pathname);
  const isDashboard2 = anotherLocations.includes(location.pathname);

  return (
    <div>
      {isDashboard2 && <Header />}
      <Outlet />
      {isDashboard2 && <Footer />}
    </div>
  );
}

export default Layout;
