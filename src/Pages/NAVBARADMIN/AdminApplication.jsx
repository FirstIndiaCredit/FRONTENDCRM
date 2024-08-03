import React, { useState, useEffect } from "react";
import AdminDashNavBar from "../../Components/AdminDashNavBar";
import AdminDashNavigator from "../../Components/AdminDashNavigator";
import UserFooter from "../../Components/UserFooter";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminDashNavbarMobile from "../../Components/AdminDashNavbarMobile";
function AdminApplication() {
  useEffect(() => {
    document.title = "Admin Application";
    fetchLoans();
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loans, setLoans] = useState([]);
  const allLoanStatus = useLoaderData();

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const data = await allLoanStatus();
      setLoans(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch loans");
      setLoading(false);
    }
  };

  const handleCheckClick = (userId) => {
    navigate(`/agent/user/${userId}`);
  };

  const getStatusClassName = (loan) => {
    if (loan.isApproved) return "bg-green-500 text-white";
    if (loan.isRejected) return "bg-red-500 text-white";
    return "bg-yellow-400"; // Pending
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <AdminDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="bg-white sm:shadow-none block md:hidden sm:bg-red-500 sm:static sm:top-0">
          <AdminDashNavbarMobile />
        </div>
        <AdminDashNavBar />
        <div className="min-h-screen">
          <div className="bg-blue-500 md:bg-gray-800 text-center sm:rounded-lg text-white font-semibold rounded-lg text-3xl mb-5 mt-0 pt-2 pb-3 ">
            LOAN APPLICATION
          </div>

          {allLoanStatus.length === 0 ? (
            <div className="text-2xl text-center mt-4">
              *NO APPLICATION FOUND*
            </div>
          ) : (
            <div className="overflow-x-auto shadow-xl">
              <table className="min-w-full bg-white hidden md:table">
                <thead className="border-4">
                  <tr className="bg-zinc-100 uppercase">
                    <th className="py-2 border-r-4">S.no</th>
                    <th className="py-2 border-r-4">Agent ID</th>
                    <th className="py-2 border-r-4">Loan ID</th>
                    <th className="py-2 border-r-4">Loan Type</th>
                    <th className="py-2 border-r-4">Name</th>
                    <th className="py-2 border-r-4">Amount</th>
                    <th className="py-2 border-r-4">Time Period</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="shadow-xl">
                  {allLoanStatus.map((loan, index) => (
                    <tr
                      key={loan._id}
                      className={`mb-4 text-center font-semibold`}
                    >
                      <td className="py-2 border-r border-t-2">{index + 1}</td>
                      <td className="py-2 border-r border-t-2">
                        {loan.referralId}
                      </td>
                      <td className="py-2 border-r border-t-2">
                        {loan.loanId}
                      </td>
                      <td className="py-2 border-r border-t-2">
                        {loan.loanType}
                      </td>
                      <td className="py-2 border-r border-t-2">{loan.name}</td>
                      <td className="py-2 border-r border-t-2">
                        {`${loan.duration.value} ${loan.duration.unit}`}
                      </td>
                      <td className="py-2 border-r border-t-2">
                        {loan.amount}
                      </td>
                      <td
                        onClick={() => handleCheckClick(loan._id)}
                        className={`py-2 cursor-pointer ${getStatusClassName(
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

              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {allLoanStatus.map((loan, index) => (
                  <div
                    key={loan._id}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-700">{`#${
                        index + 1
                      }`}</div>
                      <div className="flex-1 text-center">
                        <p className="uppercase">
                          <strong>{loan.name}</strong>
                        </p>
                      </div>
                      <div
                        onClick={() => handleCheckClick(loan._id)}
                        className={`py-1 px-3 rounded-lg cursor-pointer ${getStatusClassName(
                          loan
                        )} text-white text-center`}
                      >
                        {loan.isApproved
                          ? "Approved"
                          : loan.isRejected
                          ? "Rejected"
                          : "Pending"}
                      </div>
                    </div>
                    <div className="mt-2 text-gray-700">
                      <p>
                        <strong>Loan Id:</strong> {loan.loanId}
                      </p>
                      <p>
                        <strong>Agent ID:</strong> {loan.referralId}
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminApplication;
