import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  useEffect(() => {
    document.title = "Agent Login";
  }, []);

  const [referralId, setRef] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const refHandle = (e) => {
    setRef(e.target.value);
  };
  const passHandle = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backendcrm.vercel.app/api/v1/agent/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ referralId, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("AGENT", referralId);
        localStorage.setItem("TOKEN", data.token);
        localStorage.setItem("AGENTID", data.agentId);
        navigate("/agent/dashboard");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Agent Login</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-3 w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
            <input
              type="text"
              id="referralID"
              value={referralId}
              onChange={refHandle}
              className="w-full px-12 py-3 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Referral ID"
            />
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-3 w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={passHandle}
              className="w-full px-12 py-3 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5c-4.493 0-8.21 2.942-9.533 7.032a10.138 10.138 0 009.533 7.468 10.138 10.138 0 009.533-7.468c-1.323-4.09-5.04-7.032-9.533-7.032zm0 2c2.908 0 5.426 1.759 6.717 4.5a8.138 8.138 0 01-6.717 4.5 8.138 8.138 0 01-6.717-4.5c1.291-2.741 3.809-4.5 6.717-4.5zm0 1.75a2.75 2.75 0 00-2.75 2.75 2.75 2.75 0 002.75 2.75 2.75 2.75 0 002.75-2.75 2.75 2.75 0 00-2.75-2.75zm0 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3c5.177 0 9.577 3.293 10.819 7.926a10.15 10.15 0 01-10.819 7.574 10.15 10.15 0 01-10.819-7.574c1.242-4.633 5.642-7.926 10.819-7.926zm0 1.5c-4.061 0-7.571 2.518-8.833 6.032 1.262 3.514 4.772 6.032 8.833 6.032 4.061 0 7.571-2.518 8.833-6.032-1.262-3.514-4.772-6.032-8.833-6.032zm0 2c.53 0 1.04.139 1.485.393l-1.485 1.485-1.485-1.485c.445-.254.955-.393 1.485-.393zm1.485 1.485l1.485 1.485 1.485-1.485c-.445-.254-.955-.393-1.485-.393s-1.04.139-1.485.393l1.485 1.485z" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLogin;
