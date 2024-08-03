import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function SubmittedLoan() {
  useEffect(() => {
    document.title = "loan submitted";
  }, []);
  const location = useLocation();
  const [loanName, setLoanName] = useState("");

  useEffect(() => {
    if (location.state && location.state.loan) {
      setLoanName(location.state.loan);
    }
  }, [location.state]);

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div>
          <div className="flex flex-col  items-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-28 w-28 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold px-2 text-green-600  text-center">
              Thank you for applying Loan!
            </h1>

            <span className=" text-[#004aad] px-2 text-center font-medium text-2xl mt-1 pb-10">
              *Verification may take 2-3 business days*
            </span>

            <Link to={"/user/dashboard"}>
              <button className="font-medium px-5 text-lg hover:bg-blue-600 transition-all py-2 bg-blue-500 text-white rounded-xl">
                {" "}
                <FontAwesomeIcon icon={faHome} size="sm" /> Dashboard{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedLoan;
