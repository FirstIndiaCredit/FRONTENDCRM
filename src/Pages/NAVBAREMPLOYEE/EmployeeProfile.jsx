import React, { useState, useEffect } from "react";
import EmployeeDashNavbarMobile from "../../Components/EmployeeDashNavbarMobile";
import EmployeeDashNavigator from "../../Components/EmployeeDashNavigator";
import EmployeeDashNavBar from "../../Components/EmployeeDashNavBar";
import axios from "axios";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";

function EmployeeProfile() {
  useEffect(() => {
    document.title = "Agent Profile";
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaarImage: null,
    panCardImage: null,
  });
  const [update, setUpdate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file && file.type.startsWith("image/") && file.size <= 1048576) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          setFormData({
            ...formData,
            [name]: result,
          });
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      alert("Please upload a valid image file under 1MB in size.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const agentId = localStorage.getItem("agentId");
      if (!agentId) {
        alert("Agent not logged in");
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        `https://backendcrm.vercel.app/api/v2/agents/${agentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUpdate(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <EmployeeDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="sm:shadow-none hidden md:block sm:static sm:top-0">
          <EmployeeDashNavBar />
        </div>

        <div className="bg-white sm:shadow-none block md:hidden sm:bg-red-500 sm:static sm:top-0">
          <EmployeeDashNavbarMobile />
        </div>
        <div className="bg-white shadow-md md:max-w-[40vw] rounded-lg items-center m-auto p-6 mt-4 mb-14 w-full ">
          <div className="flex items-center justify-between mb-6">
            <img
              src={`/logo.jpg`}
              alt="Logo"
              className="h-10 rounded-sm ml-2 w-auto"
            />
            <h1 className="text-lg md:text-3xl w-auto m-auto font-semibold">
              Agent Profile
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300"
              src="https://media.istockphoto.com/id/1083280462/vector/businessman-icon.jpg?s=612x612&w=0&k=20&c=1i09J79rtBIhkenFrsjkNHOOBKiN1AXyjdZgniKShy0=&auto=format&fit=crop&w=500&q=60"
              alt="Profile Avatar"
            />
            <div className="flex flex-col mt-4 space-y-3">
              <button className="py-2 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                Change picture
              </button>
              <button className="py-2 px-4 text-indigo-900 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-200">
                Delete picture
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-indigo-900"
              >
                Your first name
              </label>
              <input
                type="text"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5"
                placeholder="Your first name"
                value={firstName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-indigo-900"
              >
                Your last name
              </label>
              <input
                type="text"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5"
                placeholder="Your last name"
                value={lastName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-indigo-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5"
                placeholder="your.email@mail.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-indigo-900"
              >
                Phone
              </label>
              <input
                type="number"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full p-2.5"
                placeholder="agent phone number"
                required
              />
            </div>
            {update && <p className="text-green-600">{update}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
