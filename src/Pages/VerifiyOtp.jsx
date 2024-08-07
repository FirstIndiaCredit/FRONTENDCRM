import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP() {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Verify OTP";
    if (location.state && location.state.userId) {
      setUserId(location.state.userId);
    }
  }, [location.state]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/verifyOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, otp }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Email verified successfully");
        navigate("/signin");
      } else {
        setError(data.message);
      }
    } catch (e) {
      console.log("error: ", e);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimeLeft(60);
    try {
      await fetch("http://localhost:3000/api/v1/user/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      alert("OTP resent successfully");
    } catch (e) {
      console.log("error: ", e);
      setError("An error occurred while resending OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-wrap text-slate-800">
      <div className="flex w-full flex-col items-center">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 py-8 rounded-lg items-center border lg:w-[28rem] bg-white shadow-lg">

          <div className="flex items-center mb-4">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-lg mr-4"
            />
            <p className="text-center text-xl md:text-3xl font-bold md:text-left md:leading-tight">
              Verify Your Email
            </p>

          </div>
          <p className="flex text-center text-sm md:text-lg font-bold text-red-500 md:text-left md:leading-tight">
            O​tp has send on your Email
          </p>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form
            onSubmit={handleOTPSubmit}
            className="flex flex-col items-stretch pt-3 md:pt-8"
          >
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="otp"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-lg bg-blue-600 px-4 py-2 w-full text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="mt-4 rounded-lg bg-green-600 w-full px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-gray-500 ring-offset-2 transition hover:bg-gray-700 focus:ring-2 md:w-32"
              >
                Resend OTP
              </button>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                Resend OTP in {timeLeft} seconds
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
