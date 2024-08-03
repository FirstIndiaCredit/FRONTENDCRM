import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashNavBar from "../../Components/AdminDashNavBar";
import AdminDashNavigator from "../../Components/AdminDashNavigator";
import UserFooter from "../../Components/UserFooter";
import { useNavigate } from "react-router-dom";
import AdminDashNavbarMobile from "../../Components/AdminDashNavbarMobile";

function AdminAgent() {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Agents";
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        "https://backendcrm.vercel.app/api/v1/agent/allagents"
      );
      setAgents(response.data.allAgents || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setError("Failed to fetch agents. Please try again later.");
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter((agent) =>
    agent.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckClick = (agentId) => {
    navigate(`/admin/agent/${agentId}`);
  };

  const getStatusClassName = (agent) => {
    if (agent.isLogin) return "text-green-500";
    return "text-red-500";
  };

  if (loading)
    return (
      <>
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
          <AdminDashNavigator />
        </aside>
        <div>Loading...</div>
      </>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <AdminDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className=" sm:shadow-none hidden md:block  sm:static sm:top-0">
          <AdminDashNavBar />
        </div>
        <div className="bg-white sm:shadow-none block md:hidden sm:bg-red-500 sm:static sm:top-0">
          <AdminDashNavbarMobile />
        </div>

        <div className="min-h-screen">
          <div className="bg-gray-800 text-center sm:rounded-lg text-white font-semibold rounded-lg text-3xl mt-0 p-2">
            AGENTS
          </div>
          <div className="relative overflow-x-auto shadow-md mt-2 sm:rounded-lg">
            <div className="flex bg-white items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 p-4">
              <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for agents"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl">
              <div className="sm:hidden">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent._id}
                    className="mb-4 bg-white rounded-xl shadow-lg overflow-hidden"
                    onClick={() => handleCheckClick(agent._id)}
                  >
                    <div className="p-3 border-b">
                      <span className="font-semibold">Name: </span>
                      {agent.Name}
                    </div>
                    <div className="p-3 border-b">
                      <span className="font-semibold">Position: </span>
                      {agent.position}
                    </div>
                    <div className="p-3 border-b">
                      <span className="font-semibold">Referral ID: </span>
                      {agent.referralId}
                    </div>
                    <div className="p-3 border-b">
                      <span className="font-semibold">Status: </span>
                      <span className={getStatusClassName(agent)}>
                        {agent.isLogin ? "Online" : "Offline"}
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <button
                        type="button"
                        className="text-white w-full bg-blue-600 border focus:outline-none focus:ring-4 focus:ring-gray-100 font-bold rounded-lg  text-lg px-3 py-1.5"
                        onClick={() => handleCheckClick(agent._id)}
                      >
                        Check
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden sm:table w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => (
                    <tr
                      key={agent._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${agent._id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <label
                            htmlFor={`checkbox-table-search-${agent._id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                      >
                        <img
                          className="w-10 object-cover h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                          alt="Agent image"
                        />
                        <div className="pl-3">
                          <div className="text-xl uppercase font-semibold">
                            {agent.Name}
                          </div>
                          <div className="font-bold text-red-500">
                            {agent.referralId}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4 text-lg uppercase font-bold text-gray-600">
                        {agent.position}
                      </td>
                      <td
                        className={`px-6 py-4 font-bold text-gray-700 ${getStatusClassName(
                          agent
                        )}`}
                      >
                        {agent.isLogin ? "Online" : "Offline"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="text-white bg-blue-600 border focus:outline-none focus:ring-4 focus:ring-gray-100 font-bold rounded-lg text-lg px-3 py-1.5"
                            onClick={() => handleCheckClick(agent._id)}
                          >
                            Check
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAgents.length === 0 && (
              <p className="text-center p-4">No agents found.</p>
            )}
          </div>
        </div>
        <UserFooter />
      </div>
    </div>
  );
}

export default AdminAgent;
