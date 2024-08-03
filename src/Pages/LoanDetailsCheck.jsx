import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function LoanDetailsCheck() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loanId, setLoanId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Loan Details";
  }, []);

  useEffect(() => {
    const fetchDetailLoan = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://backendcrm.vercel.app/api/v2/agent/detailloan?_id=${_id}`
        );
        setLoanDetails(response.data);
        if (response.data.personal) {
          console.log(response.data.personal.email);
          setEmail(response.data.personal.email);
          setLoanId(response.data.personal.loanId);
        }
        if (response.data.car) {
          setEmail(response.data.car.email);
          setLoanId(response.data.car.loanId);
        }
        if (response.data.home) {
          setEmail(response.data.home.email);
          setLoanId(response.data.home.loanId);
        }
        if (response.data.business) {
          setEmail(response.data.business.email);
          setLoanId(response.data.business.loanId);
        }
      } catch (error) {
        setError(error.message || "Error fetching loan details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailLoan();
  }, [_id]);

  const approveLoan = async () => {
    try {
      setIsLoading(true);
      setMessage("Processing approval...");
      const response = await axios.put(
        "https://backendcrm.vercel.app/api/v2/agent/approveloan",
        { _id, loanId, email }
      );
      setMessage("Loan Approved");
      navigate("/agent/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.error("Approval error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      setMessage("Error approving loan. Please try again.");
      setIsLoading(false);
    }
  };

  const rejectLoan = async () => {
    const message = prompt("REJECTION REASON");
    try {
      setIsLoading(true);
      setMessage("Processing rejection...");
      const response = await axios.put(
        "https://backendcrm.vercel.app/api/v2/agent/rejectloan",
        { _id, message, loanId, email }
      );
      if (response.status === 200) {
        setMessage("Loan Rejected Successfully");
        navigate("/agent/dashboard");
      } else {
        setMessage("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error("Rejection error:", error.response || error);
      setMessage("Error rejecting loan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderDocument = (label, url) => (
    <tr className="border-b">
      <td className="p-2 font-bold">{label}:</td>
      <td className="p-2">
        {url ? (
          <PhotoProvider>
            <PhotoView src={url}>
              <img
                src={url}
                alt={label}
                className="w-32 h-32 object-cover mt-2 cursor-pointer"
              />
            </PhotoView>
          </PhotoProvider>
        ) : (
          <span className="text-gray-500">Not provided</span>
        )}
      </td>
    </tr>
  );

  const renderLoanDetails = (loan, loanType, loanId) => (
    <div className="mb-8">
      <h2 className="text-3xl md:text-5xl font-semibold mb-4">
        {loanType} Loan
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <tbody>
            <tr className="border-b bg-blue-500">
              <td className="p-4 text-white text-lg md:text-2xl font-bold">
                Loan Id for the User:
              </td>
              <td className="py-2 text-white text-lg md:text-2xl font-bold">
                {loan.loanId}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Name:</td>
              <td className="p-2">{loan.name}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Email:</td>
              <td className="p-2">{loan.email}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Phone:</td>
              <td className="p-2">{loan.phone}</td>
            </tr>
            {/* <tr className="border-b">
              <td className="p-2 font-bold">User ID:</td>
              <td className="p-2">{loan.userId}</td>
            </tr> */}
            <tr className="border-b">
              <td className="p-2 font-bold">Referral ID:</td>
              <td className="p-2">{loan.referralId}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Loan Type:</td>
              <td className="p-2">{loan.loanType}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Amount:</td>
              <td className="p-2">{loan.amount}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Duration:</td>
              <td className="p-2">{`${loan.duration.value} ${loan.duration.unit}`}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Mother's Name:</td>
              <td className="p-2">{loan.motherName}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Father's Name:</td>
              <td className="p-2">{loan.fatherName}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Spouse's Name:</td>
              <td className="p-2">{loan.spouseName}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Marital Status:</td>
              <td className="p-2">{loan.maritalStatus}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Residence Type:</td>
              <td className="p-2">{loan.residenceType}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Current Address:</td>
              <td className="p-2">{loan.currentAddress}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">City/State:</td>
              <td className="p-2">{loan.cityState}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Pincode:</td>
              <td className="p-2">{loan.pincode}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Salary:</td>
              <td className="p-2">{loan.salary}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Company Name:</td>
              <td className="p-2">{loan.companyName}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Total Work Experience:</td>
              <td className="p-2">{loan.totalWorkExperience}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Years in Present Job:</td>
              <td className="p-2">{loan.yearsInPresentJob}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Official Email:</td>
              <td className="p-2">{loan.officialEmail}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Designation:</td>
              <td className="p-2">{loan.designation}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Office Address:</td>
              <td className="p-2">{loan.officeAddress}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Office Landmark:</td>
              <td className="p-2">{loan.officeLandmark}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Office City/State:</td>
              <td className="p-2">{loan.officeCityState}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Office Pincode:</td>
              <td className="p-2">{loan.officePincode}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Reference 1 Name:</td>
              <td className="p-2">{loan.reference1Name}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Reference 1 Phone:</td>
              <td className="p-2">{loan.reference1Phone}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Reference 1 Address:</td>
              <td className="p-2">{loan.reference1Address}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Reference 2 Name:</td>
              <td className="p-2">{loan.reference2Name}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Reference 2 Phone:</td>
              <td className="p-2">{loan.reference2Phone}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold">Reference 2 Address:</td>
              <td className="p-2">{loan.reference2Address}</td>
            </tr>
            {renderDocument("Aadhaar", loan.aadhaarImage)}
            {renderDocument("PAN Card", loan.panCardImage)}
            {renderDocument("Other Document", loan.otherDocumentImage)}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 mb-8 text-white px-8 rounded-xl py-2 text-xl"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">
        Loan Details for User:{" "}
        <span className="text-lg lg:text-3xl text-red-500">{_id}</span>
      </h1>

      {isLoading ? (
        <p className="text-xl text-center">Loading...</p>
      ) : error ? (
        <p className="text-xl text-center text-red-500">{error}</p>
      ) : loanDetails ? (
        <div className="space-y-8">
          {loanDetails.car && renderLoanDetails(loanDetails.car, "Car")}
          {loanDetails.home && renderLoanDetails(loanDetails.home, "Home")}
          {loanDetails.personal &&
            renderLoanDetails(loanDetails.personal, "Personal")}

          {message && (
            <p className="text-xl text-center font-bold text-green-600">
              {message}
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center">
            <button
              onClick={approveLoan}
              disabled={isLoading}
              className={`text-xl font-bold hover:bg-green-600 text-white px-9 py-2 rounded-xl hover:rounded-md shadow-lg shadow-green-400 transition-all ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700"
              }`}
            >
              {isLoading ? "Processing..." : "Approve"}
            </button>
            <button
              onClick={rejectLoan}
              disabled={isLoading}
              className={`text-xl font-bold hover:bg-red-600 text-white px-9 py-2 rounded-xl hover:rounded-md shadow-lg shadow-red-400 transition-all ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-700"
              }`}
            >
              {isLoading ? "Processing..." : "Reject"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xl text-center">No loan details found.</p>
      )}
    </div>
  );
}

export default LoanDetailsCheck;
