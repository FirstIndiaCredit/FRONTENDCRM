import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashNavBar from "../../Components/AdminDashNavBar";
import AdminDashNavigator from "../../Components/AdminDashNavigator";
import UserFooter from "../../Components/UserFooter";
import Compressor from "compressorjs";
import AdminDashNavBarMobile from "../../Components/AdminDashNavbarMobile";

function AddAgent() {
  useEffect(() => {
    document.title = "Add Agent";
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [aadharImage, setAadharImage] = useState(null);
  const [panCardImage, setPanCardImage] = useState(null);
  const [referralId, setReferralId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/") && file.size <= 1048576) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          setImage(result);
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
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !name ||
      !phone ||
      !position ||
      !referralId ||
      !password ||
      !aadharImage ||
      !panCardImage
    ) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("password", password);
    formData.append("referralId", referralId);
    formData.append("Phone", phone);
    formData.append("position", position);
    formData.append("aadhaarImage", aadharImage);
    formData.append("panCardImage", panCardImage);

    try {
      const response = await fetch(
        "https://backendcrm.vercel.app/api/v1/agent/signup",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Agent created successfully");
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Failed to create agent");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <AdminDashNavigator />
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="hidden md:block">
          <AdminDashNavBar />
        </div>
        <div className="block md:hidden">
          <AdminDashNavBarMobile />
        </div>

        <div className="min-h-screen">
          <div className="mt-5">
            <div className="bg-white shadow-2xl w-100% md:w-[50%] mx-auto rounded-xl p-6">
              <div className="text-3xl mx-auto bg-blue-500 text-white w-fit py-3 font-bold -translate-y-10 shadow-xl shadow-blue-300 px-6 rounded-2xl mb-2">
                ADD AGENT
              </div>

              {error && <div className="text-red-500 mb-4">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  icon={<UserIcon />}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Agent Name"
                  required
                />
                <InputField
                  icon={<UserIcon />}
                  type="text"
                  value={referralId}
                  onChange={(e) => setReferralId(e.target.value)}
                  placeholder="Create Referral Id"
                  required
                />
                <InputField
                  icon={<PhoneIcon />}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Agent Phone"
                  required
                />
                <InputField
                  icon={<PosiIcon />}
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Assign Position"
                  required
                />
                <InputField
                  icon={<LockIcon />}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Agent Password"
                  required
                />
                <InputField
                  icon={<LockIcon />}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />

                <hr className="my-2" />
                <p className="origin-0 text-xl font-medium text-indigo-900">
                  KYC Verification
                </p>
                <p className="mb-6 text-red-600 text-sm">
                  *Agent needs to verify in order to start working in loan*
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="aadharImage"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Upload Aadhaar Card
                    </label>
                    <input
                      type="file"
                      id="aadharImage"
                      onChange={(e) => handleFileChange(e, setAadharImage)}
                      accept="image/*"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="panCardImage"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Upload PAN Card
                    </label>
                    <input
                      type="file"
                      id="panCardImage"
                      onChange={(e) => handleFileChange(e, setPanCardImage)}
                      accept="image/*"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-b rounded-2xl shadow-xl shadow-red-300 from-red-500 to-red-600 font-medium p-2 md:p-4 text-white uppercase w-full"
                >
                  Create Agent
                </button>
              </form>
            </div>
          </div>
        </div>
        <UserFooter />
      </div>
    </div>
  );
}

const InputField = ({ icon, type, value, onChange, placeholder }) => (
  <div className="flex items-center text-lg">
    <span className="absolute ml-3">{icon}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="bg-gray-200 pl-12 rounded-2xl py-2 md:py-4 focus:outline-none w-full"
      placeholder={placeholder}
    />
  </div>
);

const UserIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
  </svg>
);
const PosiIcon = () => (
  <img
    width="26"
    height="26"
    src="https://img.icons8.com/fluency-systems-filled/48/business.png"
    alt="business"
  />
);

const LockIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
  </svg>
);

export default AddAgent;
