import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Assuming FontAwesome icons

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Log in";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await fetch(
        "https://backendcrm.vercel.app/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      console.log("Login response:", data); // Log the response data

      if (response.ok) {
        localStorage.setItem("mail", email);
        localStorage.setItem("TOKEN", data.token);

        if (data.userId) {
          localStorage.setItem("userId", data.userId); // Store userId in localStorage
          console.log("userId stored:", data.userId); // Confirm userId is stored
        } else {
          console.error("userId not found in response");
        }
        if (data.name) {
          localStorage.setItem("NAME", data.name); // Store userId in localStorage
          console.log("name stored:", data.name); // Confirm userId is stored
        } else {
          console.error("name not found in response");
        }

        navigate("/user/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("error", error.message);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailLog = (e) => {
    setEmail(e.target.value);
  };

  const passwordLog = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center text-slate-800">
        <div className="flex  md:mt-10 md:left-1/2">
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <div className="flex justify-center">
              <img
                src={"/logo.jpg"}
                alt="Logo"
                className="w-10 h-10 rounded-lg"
              />
            </div>
            <p className="text-center text-3xl mt-2 font-bold md:leading-tight md:text-left md:text-5xl">
              Welcome
              {/* to <span className="text-blue-600">FIC</span> */}
            </p>
            <p className="mt-2 text-center font-medium md:text-left">
              Sign in to your account below.
            </p>
            <form
              className="flex flex-col items-stretch pt-3 md:pt-8"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="email"
                    id="login-email"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={emailLog}
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col pt-4 relative">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={passwordLog}
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
              <Link
                to={"/forgotpassword"}
                className="mb-6 text-center text-sm font-medium text-blue-600/80 md:text-left"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className={`rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={loading} // Disable button when loading
              >
                {loading ? "Signing In..." : "Sign in"}
              </button>
            </form>
            {error && <div className="text-red-600">{error}</div>}
            <div className="py-4 text-center">
              <p className="text-gray-600">
                Don't have an account?
                <Link
                  to="/signup"
                  className="whitespace-nowrap font-semibold text-gray-900"
                >
                  {" "}
                  <span className="text-blue-500  underline underline-offset-1">
                    Sign up
                  </span>{" "}
                  here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
