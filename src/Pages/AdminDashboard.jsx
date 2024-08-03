import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashNavBar from "../Components/AdminDashNavBar";
import AdminDashNavigator from "../Components/AdminDashNavigator";
import UserFooter from "../Components/UserFooter";
import AdminDashNavbarMobile from "../Components/AdminDashNavbarMobile";
import axios from "axios";
import "./Notification.css";

function AdminDashboard() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgentReferralId, setSelectedAgentReferralId] = useState("");
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard";
    fetchLoans();
    fetchAgents();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backendcrm.vercel.app/api/v2/agent/getallpendinglist"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch loans");
      }
      const data = await response.json();
      setLoans(data.pendingLoanList);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        "https://backendcrm.vercel.app/api/v1/agent/allagents"
      );
      setAgents(response.data.allAgents || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleCheckClick = (loanId) => {
    navigate(`/agent/user/${loanId}`);
  };

  const handleAgentFilterChange = (event) => {
    setSelectedAgentReferralId(event.target.value);
  };

  const filteredLoans = selectedAgentReferralId
    ? loans.filter((loan) => loan.referralId === selectedAgentReferralId)
    : loans;

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <AdminDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="hidden md:block">
          <AdminDashNavBar />
        </div>
        <div className="block md:hidden">
          <AdminDashNavbarMobile />
        </div>
        <div className="min-h-screen">
          {loading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative flex items-center justify-center">
                <div className="spinner">
                  <div className="logo-bounce">
                    <img src="/logo.jpg" alt="Logo" className="logo" />
                  </div>
                </div>
              </div>
            </div>
          ) : loans.length === 0 ? (
            <div className="text-2xl text-center mt-4">
              *--NO LOAN AVAILABLE--*
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex justify-center mt-4 mb-4">
                <label className="mr-2 font-bold">Filter by Agent:</label>
                <select
                  value={selectedAgentReferralId}
                  onChange={handleAgentFilterChange}
                  className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">All Agents</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent.referralId}>
                      {agent.Name}
                      {"-"}
                      {agent.referralId}
                    </option>
                  ))}
                </select>
              </div>
              <h1 className="text-3xl mb-4">Loan Applications History</h1>
              <div className="hidden md:block">
                <table className="min-w-full bg-white">
                  <thead className="border-4">
                    <tr className="bg-zinc-100 uppercase">
                      <th className="py-2 border-r-4">S no.</th>
                      <th className="py-2 border-r-4">AGENT ID</th>
                      <th className="py-2 border-r-4">Loan Id</th>
                      <th className="py-2 border-r-4">Name</th>
                      <th className="py-2 border-r-4">Loan Type</th>
                      <th className="py-2 border-r-4">Amount</th>
                      <th className="py-2 border-r-4">Duration</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="shadow-xl">
                    {filteredLoans.map((loan, index) => (
                      <tr
                        key={loan._id}
                        className="mb-4 text-center font-semibold"
                      >
                        <td className="py-2 border-r border-t-2 ">
                          {index + 1}
                        </td>
                        <td className="py-2 border-r border-t-2 ">
                          {loan.referralId}
                        </td>
                        <td className="py-2 border-r border-t-2 ">
                          {loan.loanId}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {loan.name}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {loan.loanType}
                        </td>
                        <td className="py-2 border-r border-t-2">
                          {loan.amount}
                        </td>
                        <td className="py-2 border-r border-t-2">{`${loan.duration.value} ${loan.duration.unit}`}</td>
                        <td
                          onClick={() => handleCheckClick(loan._id)}
                          className={`py-2 text-white bg-blue-600 transition-all border-slate-300 border-t-2 cursor-pointer`}
                        >
                          CHECK
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Responsive Card view for mobile */}
              <div className="block md:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLoans.map((loan, index) => (
                    <div
                      key={loan._id}
                      className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl"
                    >
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        <div className="flex justify-between items-center pb-2">
                          <div className="text-lg">No: {index + 1}</div>
                          <div className="text-gray-500">{loan.loanId}</div>
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Name:</strong> {loan.name}
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Agent Id:</strong> {loan.referralId}
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Loan Type:</strong> {loan.loanType}
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Amount:</strong> {loan.amount}
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Duration:</strong>{" "}
                          {`${loan.duration.value} ${loan.duration.unit}`}
                        </div>
                        <button
                          className="mt-4 w-full text-white bg-blue-600 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all"
                          onClick={() => handleCheckClick(loan._id)}
                        >
                          CHECK
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <UserFooter />
      </div>
    </div>
  );
}

export default AdminDashboard;
