import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Notification.css";

function Signup() {
  const [agents, setAgents] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign up";
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        "https://backendcrm.vercel.app/api/v1/agent/allagents"
      );
      setAgents(response.data.allAgents || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setError("Failed to fetch agents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralId, setReferralId] = useState("");
  const [error, setError] = useState("");

  const emailHandle = (e) => setEmail(e.target.value);
  const passHandle = (e) => setPassword(e.target.value);
  const confirmPassHandle = (e) => setConfirmPassword(e.target.value);
  const firstNameHandle = (e) => setFirstName(e.target.value);
  const lastNameHandle = (e) => setLastName(e.target.value);
  const phoneHandle = (e) => setPhone(e.target.value);
  const referralHandle = (e) => setReferralId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !referralId
    ) {
      setError("All fields are required");
      return;
    }
    if (!referralId) {
      setError("Please select an agent");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://backendcrm.vercel.app/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            phone,
            referralId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        navigate("/verify", { state: { userId: data.userId } });
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap pb-10 pt-4 text-slate-800">
        <div className="flex w-full flex-col px-4">
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <div>
              <a href="/" className="text-xl font-bold text-blue-600">
                FirstIndiaCredit.
              </a>
            </div>
            <p className="text-3xl font-bold md:text-left md:leading-tight">
              Create your free account
            </p>
            <p className=" mt-2 font-medium md:text-left">
              Already using FIC?
              <Link
                to="/signin"
                className="whitespace-nowrap font-semibold text-blue-700"
              >
                Login here
              </Link>
            </p>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            {loading ? (
              <div className="relative mt-60 flex items-center justify-center">
                <div className="spinner">
                  <div className="logo-bounce">
                    <img src="/logo.jpg" alt="Logo" className="logo" />
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-stretch mt-0 md:pt-8"
              >
                <div className="flex flex-col pt-4">
                  <div className="relative flex overflow-hidden pb-1 rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="login-name"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="First Name"
                      value={firstName}
                      onChange={firstNameHandle}
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-4">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="login1-name"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={lastNameHandle}
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-4">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="email"
                      id="login-email"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Email"
                      value={email}
                      onChange={emailHandle}
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-col pt-4">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Password (minimum 8 characters)"
                      value={password}
                      onChange={passHandle}
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-gray-400"
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex flex-col">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirm-password"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={confirmPassHandle}
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-gray-400"
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex flex-col">
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="tel"
                      id="login-phone"
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={phoneHandle}
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-col">
                  <div className="relative flex overflow-hidden text-gray-500 rounded-md border-2 transition focus-within:border-blue-600">
                    <select
                      name="referralId"
                      className="pt-3 pb-2 pl-5 block w-full  px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                      onChange={(e) => setReferralId(e.target.value)}
                      value={referralId}
                    >
                      <option className=" text-gray-500" value="">
                        Select Your Agent
                      </option>
                      {agents.map((agent) => (
                        <option
                          key={agent._id}
                          className="text-black"
                          value={agent.referralId}
                        >
                          {agent.Name} {"-"} {agent.referralId}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    className="w-4 h-4 mx-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                    type="checkbox"
                    required
                  />

                  <a
                    target="_blank"
                    href="https://firstindiacredit.com/terms-conditions/"
                  >
                    I agree to the{" "}
                    <span className="underline">Terms and Conditions</span>
                  </a>
                </div>
                <button
                  type="submit"
                  className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
