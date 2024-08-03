import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function LoanDetailsCheckAdmin() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Loan Details for Admin";
    const fetchDetailLoan = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://backendcrm.vercel.app/api/v2/agent/detailloan?_id=${_id}`
        );
        setLoanDetails(response.data);
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
        { _id }
      );
      setMessage("Loan Approved");
      navigate("/admin/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.error("Approval error:", error);
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
        { _id, message }
      );
      if (response.status === 200) {
        setMessage("Loan Rejected Successfully");
        navigate("/admin/dashboard");
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

  const renderLoanDetails = (loan, loanType) => (
    <div className="mb-8">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">
        {loanType} Loan
      </h2>
      <table className="m-auto w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <tbody>
          <tr className="border-b bg-blue-500">
            <td className="p-4 text-white text-xl md:text-2xl font-bold">
              Loan Id for the User:
            </td>
            <td className="py-2 text-white text-xl md:text-2xl font-bold">
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
          <tr className="border-b">
            <td className="p-2 font-bold">User ID:</td>
            <td className="p-2">{loan.userId}</td>
          </tr>
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
            <td className="p-2 font-bold">Co-applicant Name:</td>
            <td className="p-2">{loan.coApplicantName}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-bold">Co-applicant Relation:</td>
            <td className="p-2">{loan.coApplicantRelation}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-bold">Co-applicant Phone:</td>
            <td className="p-2">{loan.coApplicantPhone}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-bold">Co-applicant Address:</td>
            <td className="p-2">{loan.coApplicantAddress}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-bold">Co-applicant Pincode:</td>
            <td className="p-2">{loan.coApplicantPincode}</td>
          </tr>
          {renderDocument("Aadhar Front", loan.aadharFrontUrl)}
          {renderDocument("Aadhar Back", loan.aadharBackUrl)}
          {renderDocument("Pan Front", loan.panFrontUrl)}
          {renderDocument("Bank Cheque", loan.bankChequeUrl)}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 md:p-8 md:w-3/4 mx-auto">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      {!isLoading && !error && loanDetails && (
        <>
          {loanDetails.newLoan && renderLoanDetails(loanDetails.newLoan, "New")}
          {loanDetails.refinanceLoan &&
            renderLoanDetails(loanDetails.refinanceLoan, "Refinance")}
          <div className="mt-4 flex flex-col md:flex-row justify-center md:justify-between">
            <button
              className="bg-green-500 text-white p-2 rounded m-2"
              onClick={approveLoan}
            >
              Approve Loan
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded m-2"
              onClick={rejectLoan}
            >
              Reject Loan
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LoanDetailsCheckAdmin;
