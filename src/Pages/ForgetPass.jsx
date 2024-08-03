// ForgotPassword.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendcrm.vercel.app/api/v1/user/forgetpassword",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending reset link. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="mb-4 text-2xl font-bold">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center bg-blue-500  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
