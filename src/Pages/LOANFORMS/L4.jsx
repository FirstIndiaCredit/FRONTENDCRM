import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function L4() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        "https://backendcrm.vercel.app/api/v1/agent/allagents"
      );
      setAgents(response.data.allAgents || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Business Loan";
    fetchAgents();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    duration: {
      value: "",
      unit: "months",
    },
    referralId: "",
    phone: "",
    motherName: "",
    fatherName: "",
    spouseName: "",
    maritalStatus: "",
    residenceType: "",
    currentAddress: "",
    cityState: "",
    pincode: "",
    salary: "",
    companyName: "",
    totalWorkExperience: "",
    yearsInPresentJob: "",
    officialEmail: "",
    designation: "",
    officeAddress: "",
    officeLandmark: "",
    officeCityState: "",
    officePincode: "",
    reference1Name: "",
    reference1Phone: "",
    reference1Address: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Address: "",
    aadhaarImage: null,
    panCardImage: null,
    otherDocumentImage: null,
  });

  const [update, setUpdate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "amount",
      "duration.value",
      "phone",
      "referralId",
      "motherName",
      "fatherName",
      "maritalStatus",
      "residenceType",
      "currentAddress",
      "cityState",
      "pincode",
      "salary",
      "companyName",
      "totalWorkExperience",
      "yearsInPresentJob",
      "officialEmail",
      "designation",
      "officeAddress",
      "officeCityState",
      "officePincode",
      "reference1Name",
      "reference1Phone",
      "reference1Address",
      "aadhaarImage",
      "panCardImage",
      "otherDocumentImage",
    ];

    const isFormValid = requiredFields.every((field) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return formData[parent][child];
      }
      return formData[field];
    });

    if (!isFormValid) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in");
        setLoading(false);
        return;
      }
      const { durationValue, durationUnit, ...otherData } = formData;

      const dataToSubmit = {
        ...formData,
        duration: {
          value: parseInt(formData.duration.value),
          unit: formData.duration.unit,
        },
      };
      const data = new FormData();

      data.append("userId", userId);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("amount", formData.amount);
      data.append("duration", JSON.stringify(dataToSubmit.duration));
      data.append("duration[value]", dataToSubmit.duration.value);
      data.append("duration[unit]", dataToSubmit.duration.unit);
      data.append("aadhaarImage", formData.aadhaarImage);
      data.append("panCardImage", formData.panCardImage);
      data.append("otherDocumentImage", formData.otherDocumentImage);
      data.append("referralId", formData.referralId);
      data.append("motherName", formData.motherName);
      data.append("fatherName", formData.fatherName);
      data.append("spouseName", formData.spouseName);
      data.append("maritalStatus", formData.maritalStatus);
      data.append("residenceType", formData.residenceType);
      data.append("currentAddress", formData.currentAddress);
      data.append("cityState", formData.cityState);
      data.append("pincode", formData.pincode);
      data.append("salary", formData.salary);
      data.append("companyName", formData.companyName);
      data.append("totalWorkExperience", formData.totalWorkExperience);
      data.append("yearsInPresentJob", formData.yearsInPresentJob);
      data.append("officialEmail", formData.officialEmail);
      data.append("designation", formData.designation);
      data.append("officeAddress", formData.officeAddress);
      data.append("officeLandmark", formData.officeLandmark);
      data.append("officeCityState", formData.officeCityState);
      data.append("officePincode", formData.officePincode);
      data.append("reference1Name", formData.reference1Name);
      data.append("reference1Phone", formData.reference1Phone);
      data.append("reference1Address", formData.reference1Address);
      data.append("reference2Name", formData.reference2Name);
      data.append("reference2Phone", formData.reference2Phone);
      data.append("reference2Address", formData.reference2Address);

      const response = await axios.post(
        "https://backendcrm.vercel.app/api/v2/loan/Business",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUpdate(response.data.message);

      if (response.status === 200) {
        navigate("/user/LoanSubmitted");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    } finally {
      setLoading(false);
    }
  };

  const requiredFieldsPerStep = {
    1: ["name", "email", "referralId", "phone"],
    2: ["amount", "duration.value", "motherName", "fatherName"],
    3: ["maritalStatus", "residenceType", "currentAddress"],
    4: ["cityState", "pincode", "salary", "companyName"],
    5: ["totalWorkExperience", "yearsInPresentJob", "officialEmail", "designation"],
    6: ["officeAddress", "officeCityState", "officePincode"],
    7: ["reference1Name", "reference1Phone", "reference1Address"],
    8: ["aadhaarImage", "panCardImage", "otherDocumentImage"],
  };

  const isStepValid = () => {
    const fields = requiredFieldsPerStep[currentStep];
    return fields.every((field) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return formData[parent][child];
      }
      return formData[field];
    });
  };

  const nextStep = () => {
    if (isStepValid()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert("Please fill in all required fields for this step");
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <FormInput
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormSelect
              label="Select Your Agent"
              name="referralId"
              value={formData.referralId}
              onChange={handleChange}
              options={agents.map((agent) => ({
                value: agent.referralId,
                label: `${agent.Name} - ${agent.referralId}`,
              }))}
              required
            />
            <FormInput
              label="Phone Number"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <FormInput
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              prefix="₹"
            />
            <FormDurationInput
              label="Duration"
              value={formData.duration.value}
              unit={formData.duration.unit}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Mother's Name"
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Father's Name"
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <FormInput
              label="Spouse's Name (optional)*"
              type="text"
              name="spouseName"
              value={formData.spouseName}
              onChange={handleChange}
            />
            <FormSelect
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              options={[
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
                { value: "Divorced", label: "Divorced" },
              ]}
              required
            />
            <FormSelect
              label="Residence Type"
              name="residenceType"
              value={formData.residenceType}
              onChange={handleChange}
              options={[
                { value: "Owned", label: "Owned" },
                { value: "Rented", label: "Rented" },
              ]}
              required
            />
            <FormInput
              label="Current Address"
              type="text"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            />
          </>
        );
      case 4:
        return (
          <>
            <FormInput
              label="City & State"
              type="text"
              name="cityState"
              value={formData.cityState}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Pincode"
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Salary"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              prefix="₹"
            />
            <FormInput
              label="Company Name"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </>
        );
      case 5:
        return (
          <>
            <FormInput
              label="Total Work Experience in years"
              type="number"
              name="totalWorkExperience"
              value={formData.totalWorkExperience}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Years in Present Job"
              type="number"
              name="yearsInPresentJob"
              value={formData.yearsInPresentJob}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Official Email"
              type="email"
              name="officialEmail"
              value={formData.officialEmail}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Designation"
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </>
        );
      case 6:
        return (
          <>
            <FormInput
              label="Office Address"
              type="text"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Office Landmark"
              type="text"
              name="officeLandmark"
              value={formData.officeLandmark}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Office City & State"
              type="text"
              name="officeCityState"
              value={formData.officeCityState}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Office Pincode"
              type="text"
              name="officePincode"
              value={formData.officePincode}
              onChange={handleChange}
              required
            />
          </>
        );
      case 7:
        return (
          <>
            <FormInput
              label="Reference 1 Name"
              type="text"
              name="reference1Name"
              value={formData.reference1Name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Reference 1 Phone"
              type="text"
              name="reference1Phone"
              value={formData.reference1Phone}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Reference 1 Address"
              type="text"
              name="reference1Address"
              value={formData.reference1Address}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Reference 2 Name (optional)*"
              type="text"
              name="reference2Name"
              value={formData.reference2Name}
              onChange={handleChange}
            />
            <FormInput
              label="Reference 2 Phone (optional)*"
              type="text"
              name="reference2Phone"
              value={formData.reference2Phone}
              onChange={handleChange}
            />
            <FormInput
              label="Reference 2 Address (optional)*"
              type="text"
              name="reference2Address"
              value={formData.reference2Address}
              onChange={handleChange}
            />
          </>
        );
      case 8:
        return (
          <>
            <FormFileInput
              label="Aadhaar Image"
              name="aadhaarImage"
              onChange={handleFileChange}
              required
            />
            <FormFileInput
              label="PAN Card Image"
              name="panCardImage"
              onChange={handleFileChange}
              required
            />
            <FormFileInput
              label="Other Document Image"
              name="otherDocumentImage"
              onChange={handleFileChange}
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl m-2 bg-white rounded-lg shadow-lg  duration-500 ">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Business Loan Application
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">{renderStep(currentStep)}</div>
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Previous
                </button>
              )}


              {currentStep == 1 && (
                <button
                  type="button"
                  onClick={() => {
                    navigate("/user/dashboard")
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  close
                </button>
              )}
              <div className="text-center font-semibold">{currentStep}{"/8"}</div>
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              )}
              {currentStep === totalSteps && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
            {update && <p className="mt-4 text-green-500">{update}</p>}
            {loading && <p className="mt-4 text-red-500">Loading...</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

const FormInput = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
    />
  </div>
);

const FormSelect = ({ label, options, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormDurationInput = ({ label, value, unit, onChange }) => (
  <div className="mb-4 flex items-center">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      name="duration.value"
      value={value}
      onChange={onChange}
      className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
    />
    <select
      name="duration.unit"
      value={unit}
      onChange={onChange}
      className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
    >
      <option value="years">Years</option>
      <option value="months">Months</option>
    </select>
  </div>
);

const FormFileInput = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      {...props}
      className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
    />
  </div>
);

export default L4;
