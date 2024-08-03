import React, { useState, useEffect } from "react";
import UserDashNavigator from "../../Components/UserDashNavigator";
import UserDashNavBar from "../../Components/UserDashNavBar";
import UserFooter from "../../Components/UserFooter";
import { useLoaderData } from "react-router-dom";
import "./UserStatus.css";
import UserDashNavBarBig from "../../Components/UserDashNavBarBig";

function UserStatus() {
  useEffect(() => {
    document.title = "User Status";
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [id, setId] = useState("");

  const loanApplications = useLoaderData();

  useEffect(() => {
    if (loanApplications.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setError("No applications found");
    }
  }, [loanApplications]);

  const getStatusClassName = (loan) => {
    if (loan.isApproved) return "bg-green-600 text-white";
    if (loan.isRejected) return "bg-red-600 text-white";
    return "bg-yellow-400"; // Pending
  };

  const handleRowClick = (loan) => {
    if (loan.isRejected) {
      setId(loan.loanId);
      setRejectionMessage(loan.rejectMessage || "No message provided.");
      setShowPopup(true);
    }
  };

  // Sort loan applications by date (newest to oldest)
  const sortedLoanApplications = loanApplications
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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
        <header className="flex items-center bg-gradient-to-r rounded-lg from-blue-500 to-teal-500 text-white justify-between py-1 md:py-2  md:shadow-md ">
          <img
            src={`/logo.jpg`}
            alt="Logo"
            className="md:h-10 h-7 w-auto md:ml-4 rounded-lg border-white border-2 "
          />
          <h1 className="text-2xl md:text-3xl md:m-auto mr-6 md:font-semibold md:text-center md:justify-center  ">
            Loan Applications
          </h1>
        </header>
        <div className="min-h-screen">
          {loading ? (
            <div className="text-center mt-4">
              <img
                src="/path-to-your-spinner.gif" // Replace with your spinner path
                alt="Loading..."
                className="mx-auto"
              />
              <div className="text-2xl">Loading...</div>
            </div>
          ) : error ? (
            <div className="text-2xl text-center mt-4">{error}</div>
          ) : (
            <div className="mt-4 pb-8">
              <div className="overflow-x-auto rounded-xl">
                <div className="sm:hidden">
                  {sortedLoanApplications.map((loan) => (
                    <div
                      key={loan._id}
                      className="mb-4 bg-white rounded-xl shadow-lg overflow-hidden"
                      onClick={() => handleRowClick(loan)}
                    >
                      <div className="p-3 border-b">
                        <span className="font-semibold">Date: </span>
                        {new Date(loan.date).toLocaleDateString()}
                      </div>
                      <div className="p-3 border-b">
                        <span className="font-semibold">ID: </span>
                        {loan.loanId}
                      </div>
                      <div className="p-3 border-b">
                        <span className="font-semibold">Loan Type: </span>
                        {loan.loanType}
                      </div>
                      <div className="p-3 border-b">
                        <span className="font-semibold">
                          Agent Referral Id:{" "}
                        </span>
                        {loan.referralId}
                      </div>
                      <div className="p-3 border-b">
                        <span className="font-semibold">Amount: </span>
                        {loan.amount}
                      </div>
                      <div className="p-3 border-b">
                        <span className="font-semibold">Duration: </span>
                        {`${loan.duration.value} ${loan.duration.unit}`}
                      </div>
                      <div
                        className={`p-3 text-center ${getStatusClassName(
                          loan
                        )}`}
                      >
                        {loan.isApproved
                          ? "Approved"
                          : loan.isRejected
                            ? "Rejected"
                            : "Pending"}
                      </div>
                    </div>
                  ))}
                </div>
                <table className="hidden sm:table md:w-full bg-white p-3 w-full border-slate-400 rounded-xl">
                  <thead className="border-4 rounded-xl">
                    <tr className="bg-zinc-100 uppercase">
                      <th className="py-2 border-r-4 md:table-cell">Date</th>
                      <th className="py-2 border-r-4  md:table-cell">ID</th>
                      <th className="py-2 border-r-4">Loan Type</th>
                      <th className="py-2 border-r-4">Agent Refferal Id</th>
                      <th className="py-2 border-r-4">Amount</th>
                      <th className="py-2 border-r-4">Duration</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="shadow-xl rounded-xl">
                    {sortedLoanApplications.map((loan) => (
                      <tr
                        key={loan._id}
                        className={`mb-4 text-center font-semibold cursor-pointer`}
                        onClick={() => handleRowClick(loan)}
                      >
                        <td className="py-2 border-r border-t-2 md:table-cell">
                          {new Date(loan.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 border-r border-t-2 md:table-cell">
                          {loan.loanId}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {loan.loanType}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {loan.referralId}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {loan.amount}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {`${loan.duration.value} ${loan.duration.unit}`}
                        </td>
                        <td
                          className={`py-2 ${getStatusClassName(
                            loan
                          )} border-t-2 border-slate-300`}
                        >
                          {loan.isApproved
                            ? "Approved"
                            : loan.isRejected
                              ? "Rejected"
                              : "Pending"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <UserFooter />
      </div>

      {showPopup && (
        <>
          <div className="fixed inset-0 flex items-center bg-black/20 backdrop-blur-sm h-screen w-screen justify-center z-999">
            <div className="bg-white p-6 rounded-lg shadow-lg z-60 max-w-xs w-full mx-4 md:mx-0 md:max-w-md">
              <p className="text-black font-medium mb-2">
                LOAN ID: <span className="font-bold text-gray-800">{id}</span>
              </p>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Loan Rejection Reason :
              </h2>
              <p className="py-3 text-xl font-bold text-black px-4 bg-yellow-200/80 rounded-md">
                {rejectionMessage}
              </p>

              <p className="mt-1">
                For any enquiry please contact Customer care number.{" "}
              </p>
              <button
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserStatus;
