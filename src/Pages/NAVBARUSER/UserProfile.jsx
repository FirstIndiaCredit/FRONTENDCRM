import React, { useState, useEffect } from "react";
import UserDashNavigator from "../../Components/UserDashNavigator";
import UserDashNavBar from "../../Components/UserDashNavBar";
import UserFooter from "../../Components/UserFooter";
import UserDashNavBarBig from "../../Components/UserDashNavBarBig";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  useEffect(() => {
    document.title = "User Profile";
  }, []);
  const Navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("TOKEN");
    alert("User has been Deleted👍");
    Navigate("/signin");
  };

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setUserImage(storedImage);
    }
  }, []);

  const handleSave = () => {
    // Handle save logic here
    console.log({
      email,
      oldPassword,
      newPassword,
      confirmPassword,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDelete(true);
  };
  const confirmDelete = () => {
    if (deleteInput === "Delete My Account") {
      handleSignout();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setUserImage(`data:image/png;base64,${base64String}`);
        localStorage.setItem(
          "userImage",
          `data:image/png;base64,${base64String}`
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-white">
        <aside className="bg-[#004aad] -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
          <UserDashNavigator />
        </aside>
        <div className=" xl:ml-80">
          {/* Navbar */}
          <div className="sm:shadow-none hidden md:block sm:bg-transparent sm:static sm:top-0">
            <UserDashNavBarBig />
          </div>
          <div className="bg-white sm:shadow-none block md:hidden sm:bg-transparent sm:static sm:top-0">
            <UserDashNavBar />
          </div>
          {/* Content */}
          <div className="w-full flex gap-5 px-3 md:px-16 lg:px-28  text-[#161931]  ">
            <div className="flex justify-center  items-center  m-auto w-full">
              <div className="w-full   mb-10 mt-8 sm:max-w-xl rounded-xl sm:rounded-2xl">
                <div className="flex bg-gradient-to-r from-blue-500 to-teal-500 text-white items-center justify-between mb-4 py-1 md:py-2 md:shadow-md  rounded-lg ">
                  <img
                    src={`/logo.jpg`}
                    alt="Logo"
                    className="md:h-10 ml-2 h-7 w-auto md:ml-3 border-2 border-white rounded-lg "
                  />
                  <h1 className="text-2xl  md:text-3xl md:m-auto mr-20 md:font-semibold md:text-center md:justify-center font-semibold">
                    User Profile
                  </h1>
                </div>
                <div className="shadow-xl rounded-xl">
                  <div className="max-w-2xl  mx-auto rounded-t-xl items-center pt-2 bg-blue-500 flex flex-col">
                    <div className="translate-y-7">
                      {userImage ? (
                        <img
                          className="object-cover w-40 h-40 p-1 bg-white rounded-full ring-4 ring-blue-500 "
                          src={userImage}
                          alt="User avatar"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-40 h-40 p-1 bg-white rounded-full ring-4 ring-red-500 text-4xl font-bold text-indigo-900">
                          <h2 className="text-center font-bold">
                            {localStorage.getItem("NAME").toUpperCase()}
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center px-8 mt-10">
                    <label className="py-3 px-8  font-bold w-full text-base text-indigo-100 focus:outline-none bg-blue-700 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 text-center">
                      Change picture
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center px-8 mt-2">
                    <button
                      type="button"
                      className="py-3 px-8 w-full  text-base font-bold text-white focus:outline-none bg-red-500 rounded-lg border border-indigo-200 hover:bg-red-700 transition-all hover:text-white focus:z-10 focus:ring-4 focus:ring-indigo-200"
                      onClick={() => {
                        setUserImage("");
                        localStorage.removeItem("userImage");
                      }}
                    >
                      Delete picture
                    </button>
                  </div>
                  <div className="px-14 pb-4 pt-4">
                    <button
                      type="button"
                      className="mt-8 mb-4 w-full mx-auto py-3 md:py-3 text-white bg-[#004aad] hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-lg text-lg"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                    {isEditing && (
                      <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                        <div className="flex flex-col mb-2 sm:mb-6">
                          <div className="w-full mb-4">
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-indigo-900"
                            >
                              Your email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                              placeholder="your.email@mail.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="w-full mb-4">
                            <label
                              htmlFor="old_password"
                              className="block mb-2 text-sm font-medium text-indigo-900"
                            >
                              Old Password
                            </label>
                            <div className="relative">
                              <input
                                type={showOldPassword ? "text" : "password"}
                                id="old_password"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-indigo-900"
                                onClick={() =>
                                  setShowOldPassword(!showOldPassword)
                                }
                              >
                                {showOldPassword ? "Hide" : "Show"}
                              </button>
                            </div>
                          </div>
                          <div className="w-full mb-4">
                            <label
                              htmlFor="new_password"
                              className="block mb-2 text-sm font-medium text-indigo-900"
                            >
                              New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                id="new_password"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-indigo-900"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                {showNewPassword ? "Hide" : "Show"}
                              </button>
                            </div>
                          </div>
                          <div className="w-full mb-4">
                            <label
                              htmlFor="confirm_password"
                              className="block mb-2 text-sm font-medium text-indigo-900"
                            >
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm_password"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                required
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-indigo-900"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? "Hide" : "Show"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handleSave}
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                          >
                            Save All Changes
                          </button>
                        </div>
                      </div>
                    )}
                    <hr className="my-4" />
                    {/* <div
                      onClick={handleDelete}
                      className="font-medium w-full text-center px-4 rounded-md py-1 cursor-pointer hover:bg-red-500 transition-all hover:text-white ring-1 ring-red-500 text-red-600 my-5 mx-2 text-xl"
                    >
                      Delete Account
                    </div> *
                    {isdelete && (
                      <div className="fixed inset-0 flex  items-center bg-black/90 backdrop-blur-sm h-screen w-screen justify-center z-999">
                        <div className="bg-red-600 xl:ml-60 relative p-4 rounded-lg shadow-2xl">
                          <div
                            onClick={() => setIsDelete(false)}
                            className="absolute bg-blue-600/20 cursor-pointer text-white top-[-3rem] right-[0] px-5 py-3 rounded-lg"
                          >
                            X
                          </div>
                          <p className="text-center mb-4 text-white">
                            Type exactly <strong> "Delete My Account"</strong>{" "}
                            to proceed
                          </p>
                          {/* <div className="flex gap-3 justify-center">
                            <input
                              className="w-full rounded-md px-5 font-semibold text-red-800"
                              value={deleteInput}
                              onChange={(e) => setDeleteInput(e.target.value)}
                              type="text"
                            />

                          </div> 
                        </div>
                      </div>
                    )}*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
