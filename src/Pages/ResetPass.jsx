// ResetPassword.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "https://backendcrm.vercel.app/api/v1/user/resetpassword",
        {
          token,
          password,
        }
      );
      setMessage(response.data.message);
      alert("Password Reset Successfully");
      navigate("/signin");
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-200 bg-cover bg-center"
      style={{ backgroundImage: "url(/path/to/your/logo/background.png)" }}
    >
      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/logo.jpg" alt="Logo" className="h-10" />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-red-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
