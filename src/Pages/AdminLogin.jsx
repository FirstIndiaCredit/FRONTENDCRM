import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  useEffect(() => {
    document.title = "Admin Login";
  }, []);

  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const IDHandle = (e) => {
    setID(e.target.value);
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
        "https://backendcrm.vercel.app/api/v1/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("ADMIN", ID);
        localStorage.setItem("TOKEN", data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 p-12 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg hover:shadow-2xl">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Admin Login</h1>
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
              id="ID"
              value={ID}
              onChange={IDHandle}
              className="w-full px-12 py-3 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="ID"
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
              className="w-full px-12 py-3 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                  <path d="M12 3c5.177 0 9.577 3.293 10.819 7.926a10.15 10.15 0 01-10.819 7.574 10.15 10.15 0 01-10.819-7.574c1.242-4.633 5.642-7.926 10.819-7.926zm0 1.5c-4.061 0-7.571 2.518-8.833 6.032 1.262 3.514 4.772 6.032 8.833 6.032 4.061 0 7.571-2.518 8.833-6.032-1.262-3.514-4.772-6.032-8.833-6.032zm0 2c.53 0 1.04.139 1.485.393l-1.485 1.485-1.485-1.485c.445-.254.955-.393 1.485-.393zm0 1.5c-.672 0-1.252.261-1.715.682l1.715 1.716 1.715-1.716c-.463-.421-1.043-.682-1.715-.682zm5.464 1.036l-1.768 1.768 1.768 1.768c.229-.241.447-.499.639-.779a8.138 8.138 0 001.432-2.682c-.195-.753-.497-1.454-.91-2.091a7.958 7.958 0 00-1.161-1.307zm-9.072 0a7.958 7.958 0 00-1.161 1.307 8.138 8.138 0 00-1.542 4.773 8.138 8.138 0 001.542 4.773c.192.28.41.538.639.779l1.768-1.768-1.768-1.768c-.462-.421-.902-.918-1.307-1.432a8.138 8.138 0 01-.682-1.432 8.138 8.138 0 01-.682-1.432 8.138 8.138 0 01-.682-1.432c-.145-.528-.283-1.057-.283-1.582s.138-1.054.283-1.582c.1-.361.205-.72.318-1.075.11-.351.235-.693.375-1.033z" />
                </svg>
              )}
            </button>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
