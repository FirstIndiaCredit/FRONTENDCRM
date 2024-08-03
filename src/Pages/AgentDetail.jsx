import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
function AgentDetail() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [agentDetails, setAgentDetails] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Agent Details";
  }, []);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://backendcrm.vercel.app/api/v1/agent/agentDetail?_id=${_id}`
        );
        setAgentDetails(response.data.agent);
      } catch (error) {
        setError(error.message || "Error fetching agent details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentDetails();
  }, [_id]);

  const handleDelete = async (agentId) => {
    try {
      await axios.delete(`https://backendcrm.vercel.app/api/v1/agent/delete`, {
        params: { _id: agentId },
      });
      navigate("/admin/agent");
    } catch (error) {
      console.error("Error deleting agent:", error);
      setError("Failed to delete agent. Please try again later.");
    }
  };

  const renderDocument = (label, url) => (
    <tr className="border-b">
      <td className="font-bold">{label}:</td>
      <td>
        {url ? (
          <PhotoProvider>
            <PhotoView src={url}>
              <img
                src={url}
                alt={label}
                className="w-32 h-32 object-cover cursor-pointer"
              />
            </PhotoView>
          </PhotoProvider>
        ) : (
          <span className="text-gray-500">Not provided</span>
        )}
      </td>
    </tr>
  );

  return (
    <div className="p-4  md:p-8 bg-white min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 mb-4 md:mb-8 text-white px-6 md:px-8 rounded-xl py-2 text-lg md:text-xl"
      >
        Back
      </button>
      <h1 className="text-xl md:text-3xl font-bold mb-4">
        Agent Details for ID: <span className="text-red-500">{_id}</span>
      </h1>
      {isLoading ? (
        <p className="text-lg md:text-xl text-center">Loading...</p>
      ) : error ? (
        <p className="text-lg md:text-xl text-center text-red-500">{error}</p>
      ) : agentDetails ? (
        <div className="space-y-6 md:space-y-8 bg-white mb-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-4">
              Agent Details
            </h2>
            <table className="m-auto w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-b bg-blue-500">
                  <td className="p-4 text-white text-2xl font-bold">
                    Referral ID :
                  </td>
                  <td className="py-2 text-white text-2xl font-bold">
                    {agentDetails.referralId}
                  </td>
                </tr>
                <tr className="border-b h-16">
                  <td className="p-2 font-bold">Name :</td>
                  <td className="p-2">{agentDetails.Name}</td>
                </tr>
                <tr className="border-b h-16">
                  <td className="p-2 font-bold">Position :</td>
                  <td className="p-2">{agentDetails.position}</td>
                </tr>
                <tr className="border-b h-16">
                  <td className="p-2 font-bold">Phone :</td>
                  <td className="p-2">{agentDetails.Phone}</td>
                </tr>
                <tr className="border-b h-16">
                  <td className="p-2 font-bold">Login Status :</td>
                  <td className="p-2">{agentDetails.isLogin}</td>
                </tr>
                {renderDocument("Aadhaar", agentDetails.aadhaarImage)}
                {renderDocument("PAN Card", agentDetails.panCardImage)}
              </tbody>
            </table>
            <button
              type="button"
              className=" text-white bg-red-600 mb-3 border focus:outline-none focus:ring-4 focus:ring-gray-100 font-bold rounded-lg text-lg float-right px-14 py-2 mt-8"
              onClick={() => handleDelete(agentDetails._id)}
            >
              <img
                className="inline-block -translate-y-[1px] mr-2"
                width="22"
                height="20"
                src="https://img.icons8.com/external-solid-design-circle/256/ffffff/external-Dustbin-seo-web-optimization-solid-design-circle.png"
                alt="Delete Icon"
              />
              Remove Agent
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg md:text-xl text-center">
          No agent details found.
        </p>
      )}
    </div>
  );
}

export default AgentDetail;
