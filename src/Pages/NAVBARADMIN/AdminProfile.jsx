import React, { useState, useEffect } from "react";
import AdminDashNavBar from "../../Components/AdminDashNavBar";
import AdminDashNavigator from "../../Components/AdminDashNavigator";
import UserFooter from "../../Components/UserFooter";
import AdminDashNavbarMobile from "../../Components/AdminDashNavbarMobile";
import { NavLink, useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/admin/login");
  };
  useEffect(() => {
    document.title = "Admin Profile";
  }, []);

  const [firstName, setFirstName] = useState("MD");
  const [lastName, setLastName] = useState("SHARIK");
  const [email, setEmail] = useState("MD.SHARIK5012@GMAIL.COM");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingConfirmPassword, setIsEditingConfirmPassword] =
    useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-50/50">
          <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <AdminDashNavigator />
          </aside>
          <div className="p-4 xl:ml-80">
            <div className="hidden md:block">
              <AdminDashNavBar />
            </div>
            <div className="block md:hidden">
              <AdminDashNavbarMobile />
            </div>

            {/* content */}
            <div className="w-full flex gap-5 px-3 md:px-16 lg:px-28 text-[#161931]">
              <div className="p-2 md:p-4 flex m-auto w-full ">
                <div className="w-full mt-8 sm:max-w-xl m-auto sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Admin Profile
                  </h2>

                  <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                    {/* Name Change Section */}
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your first name
                        </label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            id="first_name"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="Your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            readOnly={!isEditingFirstName}
                            required
                          />
                          <button
                            type="button"
                            className="ml-2 text-white
                             bg-blue-600 hover:bg-blue-800 px-4 py-1 rounded-md"
                            onClick={() =>
                              setIsEditingFirstName(!isEditingFirstName)
                            }
                          >
                            {isEditingFirstName ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your last name
                        </label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            id="last_name"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="Your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            readOnly={!isEditingLastName}
                            required
                          />
                          <button
                            type="button"
                            className="ml-2 text-white
                             bg-blue-600 hover:bg-blue-800 px-4 py-1 rounded-md"
                            onClick={() =>
                              setIsEditingLastName(!isEditingLastName)
                            }
                          >
                            {isEditingLastName ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Email Section */}
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <div className="flex items-center">
                        <input
                          type="email"
                          id="email"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="your.email@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          readOnly={!isEditingEmail}
                          required
                        />
                        <button
                          type="button"
                          className="ml-2 text-white
                             bg-blue-600 hover:bg-blue-800 px-4 py-1 rounded-md"
                          onClick={() => setIsEditingEmail(!isEditingEmail)}
                        >
                          {isEditingEmail ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>

                    {/* Password Change Section */}
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        New Password
                      </label>
                      <div className="flex items-center">
                        <input
                          type="password"
                          id="password"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="New Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          readOnly={!isEditingPassword}
                          required
                        />
                        <button
                          type="button"
                          className="ml-2 text-white
                             bg-blue-600 hover:bg-blue-800 px-4 py-1 rounded-md"
                          onClick={() =>
                            setIsEditingPassword(!isEditingPassword)
                          }
                        >
                          {isEditingPassword ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>

                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Confirm New Password
                      </label>
                      <div className="flex items-center">
                        <input
                          type="password"
                          id="confirm_password"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Confirm New Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          readOnly={!isEditingConfirmPassword}
                          required
                        />
                        <button
                          type="button"
                          className="ml-2 text-white
                             bg-blue-600 hover:bg-blue-800 px-4 py-1 rounded-md"
                          onClick={() =>
                            setIsEditingConfirmPassword(
                              !isEditingConfirmPassword
                            )
                          }
                        >
                          {isEditingConfirmPassword ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                      >
                        Save All Changes
                      </button>
                    </div>

                    <div
                      onClick={handleSignout}
                      className="text-white py-2.5 mt-2  bg-red-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      SIGN OUT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-blue-gray-600">
          <UserFooter />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
