import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ExpandableCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [noti, setNoti] = useState(false);
  const [userImage, setUserImage] = useState("");
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
    <div className="md:block lg:hidden"> {/* Show on tablet, hide on desktop */}
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
                    <img
                      className="w-8 h-8"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD10lEQVR4nO2dy4tcZRDFT3wrgi9UUFEUXxtdGEREZEDjeL/THaOLEVciiCCI+CfEfyGu1E0WIuLtqjtRJCuJIiLiQgQRRVE0gi+MxnfUmJZunBl1CJNJ3+6qW10/OJteNOec6q9vQV9uA0mSJEmSJEmSJF3gzvoaFGlQ5Md/1KA0V1vbmg+qwe0o8j2ow/9o9FrR26ztxabo/Sj6+7ryVyV/ojQPWduMSZHHQDly9PJXh3AERR8HhlusLcdg4ZWTUOTJjYv//1eS7sbWp062tt9tFuozQdm76fLX9DK21WdZx+gmd+25CNS3Jyh/5eL8Lvr1pdZxukVZvg6U/ROXv3Zd+AJ9vcE6VjfoyTZQD7ZX/qp+QiW0jucbygOg/jGF8v+9pj5sHdMhwy3j1XFqxa+7LuzKNXWFpfoUFH1mZuWvDaHGwu7TMNfsWD4bRffNvPzVIei+sYe5pFdfjCLvmJW/pvdAuQxzRTW4HpTPHZS/chK+RG95K+aCarAIyg/mpXOdfkZp+ggN5cHxKmhf9vAoJ+Ewij6CeMx4zeSkg5Bd2LnzBISg2nsqqM+al8pNS7BUn45O03vpHFBedVDm8DhPwhuo6vPRSbbXl6Po++YlcmJ9hJ5chU5R6Y0o8pWD8oYtnYRvUeQWdAI2O1DkF/PS2Lp+Awf3wjWjH8Q9r5mc9CToYVAfhT86tmYy0po6WjOLPGdeCmc+hMZ+TV2sz0XR18zLoNUQ9E3coRfYlN+TK0D9wLwEmg/h4/GtkjOFg5tA+do8PN3oAHqDW2dTfk/vQdFfHYQe+pIcQk/vm/7tgUX/sg+rTrVyW2TbLNUnosgT9gG1I5Knx7dUtsLoh+uiz9uH0m6pyB70XzxjsvLvbs4D9XXzMOyq5C1sf+HC4yt/sb4SRT+0D6HdVtFP0JdrN1d+v7kZ1G/MzTOIinyHqlk4tvJLU8YrlbVpRpMcGne78QD0M3uzGlNFP914AJ7u12E0yf5j/QrKIXAK5VMrtI75p0ptZY51AcwB2JfAPAH2RdBI5lgXwByAfQnME2BfBI1kjnUBzAH4/oTRub/wAencX/iAdO4vfEA69xc+IJ37Cx+Qzv2FD0jn/sIHpHN/4QPSub/wAencX/iAdO4vfEA69xc+IJ37Cx+Qzv2FD0jn/sIHpHN/4QPSub/wAencX/iAdO4vfEA69xc+IJ37Cx+Qzv2FD0jn/sIHpHN/EzP6H6/pBTwY3l8LAZspBpTw/iZm9KiW0dNC2g93oJWnFXr31wqVXjJ+Hn8rz4SW0XtIq+G8+0uSJEmSJEmSJEmSJEkwD/wNXg1NDBMDdlYAAAAASUVORK5CYII="
                      alt="Dashboard Icon"
                    />
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
                        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v7.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-7.5zM20.25 6h-7.5A.375.375 0 0012.375 6v-1.5c0-.207.168-.375.375-.375h7.5a.375.375 0 00.375.375V6a.375.375 0 00-.375.375z"
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
                        d="M9 3.75a.75.75 0 011.5 0V4.5h3V3.75a.75.75 0 011.5 0V4.5h2.25c.69 0 1.25.56 1.25 1.25V6H5.5v-.25c0-.69.56-1.25 1.25-1.25H9v-.75zM5.5 7.5h13v10.25c0 .69-.56 1.25-1.25 1.25H6.75c-.69 0-1.25-.56-1.25-1.25V7.5zm6 6.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="ml-4">
                    <p className="text-gray-600">Sign Out</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={toggleCard}
            className="fixed bottom-6 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors"
          >
            {isOpen ? 'Close' : 'Open Menu'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpandableCard;
