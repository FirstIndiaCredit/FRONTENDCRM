import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserDasNavBarBig() {
  const [isOpen, setIsOpen] = useState(false);
  const [noti, setNoti] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setUserImage(storedImage);
    }
  }, []);

  const handleNotification = () => {
    setNoti(!noti);
    navigate(`/user/notification/${localStorage.getItem("userId")}`);
  };

  const handleSignout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/signin");
  };

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:block lg:hidden">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md mx-4 relative">
            <button
              onClick={toggleCard}
              className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors"
            >
              &times;
            </button>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Link to="/user/dashboard" className="flex items-center w-full">
                  <button
                    className="relative w-12 h-12 rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                  >
                    {imageLoading && (
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-t-4 border-solid rounded-full animate-spin"></div>
                    )}
                    {!imageLoading && (
                      <img
                        className="w-8 h-8"
                        src={userImage || "./logo.jpg"}
                        alt="User"
                        onLoad={() => setImageLoading(false)}
                      />
                    )}
                  </button>
                  <div className="ml-4">
                    <p className="text-gray-600">Dashboard</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center">
                <Link to="/user/status" className="flex items-center w-full">
                  <button
                    className="relative w-12 h-12 rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#004aad"
                      aria-hidden="true"
                      className="w-8 h-8 text-inherit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 01.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v7.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-7.5zM20.25 6h-7.5A.375.375 0 0012.375 6v-1.5c0-.207.168-.375.375-.375h7.5a.375.375 0 00.375.375V6a.375.375 0 00-.375.375z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="ml-4">
                    <p className="text-gray-600">Status</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleNotification}
                  className="flex items-center w-full"
                >
                  <button
                    className="relative w-12 h-12 rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#004aad"
                      aria-hidden="true"
                      className="w-8 h-8 text-inherit"
                    >
                      <path d="M12 1.5c-.83 0-1.5.67-1.5 1.5v.318c-3.592.86-6 4.049-6 7.682v2.889l-.324 1.94C4.078 16.518 4.62 17 5.243 17h.58c.024.073.045.147.075.221.213.515.543.966.979 1.326A4.24 4.24 0 0011.364 20H12.636c.961 0 1.875-.342 2.567-.912.437-.36.766-.811.979-1.326.03-.074.051-.148.075-.221h.58c.623 0 1.165-.482 1.155-1.07L19.5 13.889V11c0-3.633-2.408-6.822-6-7.682V3c0-.83-.67-1.5-1.5-1.5zM7.308 15c.086-.286.132-.579.132-.884v-2.647h2.797c.357.376.84.63 1.371.719.662.114 1.331-.053 1.866-.419H16.56v2.647c0 .305.046.598.132.884H7.308zM8.25 13.25V10.25a.75.75 0 011.5 0v3c0 .41-.34.75-.75.75a.752.752 0 01-.75-.75zM15.75 13.25a.75.75 0 01-.75-.75v-3a.75.75 0 011.5 0v3c0 .41-.34.75-.75.75z" />
                    </svg>
                  </button>
                  <div className="ml-4">
                    <p className="text-gray-600">Notification</p>
                  </div>
                </button>
              </div>
              <div className="flex items-center w-full">
                <Link to="/user/profile" className="flex items-center w-full">
                  <button
                    className="relative w-12 h-12 rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#004aad"
                      aria-hidden="true"
                      className="w-8 h-8 text-inherit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-3.67-1.593A7.475 7.475 0 0112 20.25c-1.65 0-3.205-.525-4.515-1.473a7.468 7.468 0 01-2.33-5.777c0-4.126 3.361-7.487 7.487-7.487 4.126 0 7.487 3.361 7.487 7.487a7.468 7.468 0 01-2.33 5.777 7.475 7.475 0 01-4.515 1.473zm-.47-9.95a.752.752 0 00-1.061 1.061l1.5 1.5a.752.752 0 001.061 0l2.5-2.5a.752.752 0 10-1.061-1.061l-1.969 1.968-1.369-1.368a.752.752 0 00-1.061 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="ml-4">
                    <p className="text-gray-600">Profile</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleSignout}
                  className="flex items-center w-full"
                >
                  <button
                    className="relative w-12 h-12 rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#004aad"
                      aria-hidden="true"
                      className="w-8 h-8 text-inherit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.75 4.5a.75.75 0 00-1.5 0v1.25H3a.75.75 0 000 1.5h6.25V11a.75.75 0 001.5 0V7.25H21a.75.75 0 000-1.5h-9.75V4.5zM3 12.75a.75.75 0 011.5 0v5.5h2.25a.75.75 0 000-1.5H4.5v-4h14.25a.75.75 0 000-1.5H3.75a.75.75 0 01-.75.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="ml-4">
                    <p className="text-gray-600">Sign out</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDasNavBarBig;
