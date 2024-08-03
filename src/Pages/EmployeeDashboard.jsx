import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import EmployeeDashNavigator from "../Components/EmployeeDashNavigator";
import EmployeeDashNavBar from "../Components/EmployeeDashNavBar";
import { useNavigate } from "react-router-dom";
import EmployeeDashNavbarMobile from "../Components/EmployeeDashNavbarMobile";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const loanApplications = useLoaderData();
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "Agent Dashboard";

    setUsername(localStorage.getItem("AGENT"));
  }, []);

  const handleCheckClick = (userId) => {
    navigate(`/agent/user/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <EmployeeDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="hidden md:block ">
          <EmployeeDashNavBar />
        </div>
        <div className="block md:hidden">
          <EmployeeDashNavbarMobile />
        </div>

        <div className=" ">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-lg  mb-2">
            <h1 className="text-xl md:text-3xl font-bold">Welcome, {username}👋</h1>
          </div>

          {loanApplications.length === 0 ? (
            <div className="text-2xl text-center mt-4">
              *NO APPLICATION FOUND*
            </div>
          ) : (
            <div>
              {/* <h1 className="text-3xl mb-4">Loan Applications</h1> */}
              <header header className="flex items-center justify-between py-1 md:py-2 md:bg-white md:shadow-md md:mb-4 md:mt-3 rounded-lg ">
                <img src={`/logo.jpg`} alt="Logo" className="md:h-10 rounded-sm ml-2 h-7 w-auto md:ml-4 " />
                <h1 className="text-2xl md:text-3xl md:m-auto mr-6 md:font-semibold md:text-center md:justify-center font-semibold">Loan Applications</h1>
              </header>


              <div className="hidden md:block">
                <table className="min-w-full bg-white">
                  <thead className="border-4">
                    <tr className="bg-zinc-100 uppercase">
                      <th className="py-2 border-r-4">S no.</th>
                      <th className="py-2 border-r-4">ID</th>
                      <th className="py-2 border-r-4">Name</th>
                      <th className="py-2 border-r-4">Loan Type</th>
                      <th className="py-2 border-r-4">Amount</th>
                      <th className="py-2 border-r-4">Duration</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="shadow-xl">
                    {loanApplications.map((loan, index) => (
                      <tr
                        key={loan.loanId}
                        className={`mb-4 text-center font-semibold`}
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
                          className={`py-2 bg-blue-500 text-white hover:cursor-pointer transition-all hover:bg-blue-700 border-slate-300 border-t-2`}
                          onClick={() => handleCheckClick(loan._id)}
                        >
                          CHECK
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card view for mobile */}
              <div className="block md:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loanApplications.map((loan, index) => (
                    <div
                      key={loan.loanId}
                      className="bg-white shadow-lg rounded-lg p-4  hover:shadow-xl"
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
                          <strong>Loan Type:</strong> {loan.loanType}
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Amount:</strong> {loan.amount}
                        </div>
                        <div className="py-2 text-gray-700">
                          <strong>Duration:</strong> {`${loan.duration.value} ${loan.duration.unit}`}
                        </div>
                        <button
                          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all"
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
      </div>
    </div >
  );
}

export default EmployeeDashboard;
