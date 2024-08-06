import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import EmployeeDashNavBar from "../../Components/EmployeeDashNavBar";
import EmployeeDashNavigator from "../../Components/EmployeeDashNavigator";
import UserFooter from "../../Components/UserFooter";
import EmployeeDashNavbarMobile from "../../Components/EmployeeDashNavbarMobile";

function EmployeeApplication() {
  useEffect(() => {
    document.title = "Agent Application";
  }, []);

  const navigate = useNavigate();
  const data = useLoaderData();
  const [showApproved, setShowApproved] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  const handleApprovedClick = () => {
    setShowApproved(true);
    setShowRejected(false);
  };

  const handleRejectedClick = () => {
    setShowApproved(false);
    setShowRejected(true);
  };

  const handleAllClick = () => {
    setShowApproved(false);
    setShowRejected(false);
  };

  const getStatusColor = (loan) => {
    if (loan.isApproved) {
      return "bg-green-500";
    } else if (loan.isRejected) {
      return "bg-red-500";
    } else {
      return "bg-blue-500";
    }
  };

  const handleCheckClick = (userId) => {
    navigate(`/agent/user/${userId}`);
  };

  const filteredData = data.filter((loan) => {
    if (showApproved && loan.isApproved) {
      return true;
    }
    if (showRejected && loan.isRejected) {
      return true;
    }
    if (!showApproved && !showRejected) {
      return true; // show all if no filter is applied
    }
    return false;
  });

  // Check if there are any rejected loans
  const hasRejectedLoans = data.some((loan) => loan.isRejected);
  const hasApprovedLoans = data.some((loan) => loan.isApproved);

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <EmployeeDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="sm:shadow-none hidden md:block sm:static sm:top-0">
          <EmployeeDashNavBar />
        </div>
        <div className="bg-white sm:shadow-none block md:hidden sm:bg-red-500 sm:static sm:top-0">
          <EmployeeDashNavbarMobile />
        </div>
        <div className="min-h-screen">
          {filteredData.length === 0 ? (
            <div className="text-2xl text-center mt-4">
              NO APPLICATION FOUND
            </div>
          ) : (
            <div className="mt-1">
              <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white flex items-center justify-between mb-4 py-3 md:py-3 shadow-md md:mb-4 md:mt-3 rounded-lg ">
                <img
                  src={`/logo.jpg`}
                  alt="Logo"
                  className="md:h-10  border-2 border-white  rounded-lg ml-2 h-7 w-auto md:ml-4 "
                />
                <h1 className="text-lg md:text-3xl m-auto md:px-6 text-center font-semibold">
                  Loan Applications History
                </h1>
              </header>
              <div className="flex space-x-4 mb-8">
                <button
                  className={`px-4 py-2 rounded-lg ${!showApproved && !showRejected
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                    }`}
                  onClick={handleAllClick}
                >
                  All
                </button>
                {hasApprovedLoans && (
                  <button
                    className={`px-4 py-2 rounded-lg ${showApproved ? "bg-green-500 text-white" : "bg-gray-300"
                      }`}
                    onClick={handleApprovedClick}
                  >
                    Approved
                  </button>
                )}
                {hasRejectedLoans && (
                  <button
                    className={`px-4 py-2 rounded-lg ${showRejected ? "bg-red-500 text-white" : "bg-gray-300"
                      }`}
                    onClick={handleRejectedClick}
                  >
                    Rejected
                  </button>
                )}
              </div>
              <table className="min-w-full hidden md:table rounded-lg bg-white">
                <thead className="border-4 w-full rounded-sm">
                  <tr className="bg-zinc-100 uppercase">
                    <th className="py-2 border-r-4">S No.</th>
                    <th className="py-2 border-r-4">Loan Id</th>
                    <th className="py-2 border-r-4">Name</th>
                    <th className="py-2 border-r-4">Loan Type</th>
                    <th className="py-2 border-r-4">Amount</th>
                    <th className="py-2 border-r-4">Duration</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="shadow-xl">
                  {filteredData.map((loan, index) => (
                    <tr
                      key={loan._id}
                      className={"mb-4 text-center font-semibold"}
                    >
                      <td className="py-2 border-r border-t-2 ">{index + 1}</td>
                      <td className="py-2 border-r border-t-2 ">
                        {loan.loanId}
                      </td>
                      <td className="py-2 border-r border-t-2">{loan.name}</td>
                      <td className="py-2 border-r border-t-2">
                        {loan.loanType}
                      </td>
                      <td className="py-2 border-r border-t-2">
                        {loan.amount}
                      </td>
                      <td className="py-2 border-r border-t-2">
                        {`${loan.duration.value} ${loan.duration.unit}`}
                      </td>

                      <td
                        onClick={() => handleCheckClick(loan._id)}
                        className={`py-2 ${getStatusColor(
                          loan
                        )} text-white transition-all border-slate-300 border-t-2`}
                      >
                        {loan.isApproved ? "Approved" : "Rejected"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {filteredData.map((loan, index) => (
                  <div
                    key={loan._id}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <div className="flex justify-between">
                      <div className="font-semibold text-gray-700">
                        {index + 1}
                      </div>
                      <p className="text-center uppercase">
                        <strong>{loan.name}</strong>
                      </p>
                    </div>
                    <div className="mt-2 text-gray-700">
                      <p>
                        <strong>Loan Id:</strong> {loan.loanId}
                      </p>
                      <p>
                        <strong>Loan Type:</strong> {loan.loanType}
                      </p>
                      <p>
                        <strong>Amount:</strong> {loan.amount}
                      </p>
                      <p>
                        <strong>Duration:</strong>{" "}
                        {`${loan.duration.value} ${loan.duration.unit}`}
                      </p>
                    </div>
                    <div
                      onClick={() => handleCheckClick(loan._id)}
                      className={`py-1 mt-1 px-3 rounded-lg cursor-pointer ${getStatusColor(
                        loan
                      )} text-white text-center`}
                    >
                      {loan.isApproved ? "Approved" : "Rejected"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <UserFooter />
      </div>
    </div>
  );
}

export default EmployeeApplication;
