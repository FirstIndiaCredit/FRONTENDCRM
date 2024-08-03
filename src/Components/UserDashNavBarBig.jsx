import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDashNavBarBig() {
  const [noti, setNoti] = useState(false);
  const [userImage, setUserImage] = useState("");
  const handleNotification = (userId) => {
    setNoti(!noti);
    navigate(`/user/notification/${userId}`);
  };
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/signin");
  };
  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setUserImage(storedImage);
    }
  }, []);
  return (
    <div>
      <nav className="hidden w-full xl:hidden max-w-full text-white shadow-none md:block rounded-xl transition-all px-0 py-1">
        <div className="flex xl:justify-end justify-between gap-6">
          {/* PROFILE */}
          <Link to="/user/profile" className="xl:hidden">
            <button
              className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
              type="button"
            >
              <div>
                {userImage && (
                  <img
                    className="object-cover w-10 h-10 ring-3  ring-black bg-black rounded-full "
                    src={userImage}
                    alt="User avatar"
                  />
                )}
              </div>
            </button>
          </Link>
          <div className="flex ">
            {/* Dashboard */}
            <Link to="/user/dashboard">
              <button
                className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
                type="button"
              >
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD10lEQVR4nO2dy4tcZRDFT3wrgi9UUFEUXxtdGEREZEDjeL/THaOLEVciiCCI+CfEfyGu1E0WIuLtqjtRJCuJIiLiQgQRRVE0gi+MxnfUmJZunBl1CJNJ3+6qW10/OJteNOec6q9vQV9uA0mSJEmSJEmSJF3gzvoaFGlQ5Md/1KA0V1vbmg+qwe0o8j2ow/9o9FrR26ztxabo/Sj6+7ryVyV/ojQPWduMSZHHQDly9PJXh3AERR8HhlusLcdg4ZWTUOTJjYv//1eS7sbWp062tt9tFuozQdm76fLX9DK21WdZx+gmd+25CNS3Jyh/5eL8Lvr1pdZxukVZvg6U/ROXv3Zd+AJ9vcE6VjfoyTZQD7ZX/qp+QiW0jucbygOg/jGF8v+9pj5sHdMhwy3j1XFqxa+7LuzKNXWFpfoUFH1mZuWvDaHGwu7TMNfsWD4bRffNvPzVIei+sYe5pFdfjCLvmJW/pvdAuQxzRTW4HpTPHZS/chK+RG95K+aCarAIyg/mpXOdfkZp+ggN5cHxKmhf9vAoJ+Ewij6CeMx4zeSkg5Bd2LnzBISg2nsqqM+al8pNS7BUn45O03vpHFBedVDm8DhPwhuo6vPRSbbXl6Po++YlcmJ9hJ5chU5R6Y0o8pWD8oYtnYRvUeQWdAI2O1DkF/PS2Lp+Awf3wjWjH8Q9r5mc9CToYVAfhT86tmYy0po6WjOLPGdeCmc+hMZ+TV2sz0XR18zLoNUQ9E3coRfYlN+TK0D9wLwEmg/h4/GtkjOFg5tA+do8PN3oAHqDW2dTfk/vQdFfHYQe+pIcQk/vm/7tgUX/sg+rTrVyW2TbLNUnosgT9gG1I5Knx7dUtsLoh+uiz9uH0m6pyB70XzxjsvLvbs4D9XXzMOyq5C1sf+HC4yt/sb4SRT+0D6HdVtFP0JdrN1d+v7kZ1G/MzTOIinyHqlk4tvJLU8YrlbVpRpMcGne78QD0M3uzGlNFP914AJ7u12E0yf5j/QrKIXAK5VMrtI75p0ptZY51AcwB2JfAPAH2RdBI5lgXwByAfQnME2BfBI1kjnUBzAH4/oTRub/wAencX/iAdO4vfEA69xc+IJ37Cx+Qzv2FD0jn/sIHpHN/4QPSub/wAencX/iAdO4vfEA69xc+IJ37Cx+Qzv2FD0jn/sIHpHN/4QPSub/wAencX/iAdO4vfEA69xc+IJ37Cx+Qzv2FD0jn/sIHpHN/EzP6H6/pBTwY3l8LAZspBpTw/iZm9KiW0dNC2g93oJWnFXr31wqVXjJ+Hn8rz4SW0XtIq+G8+0uSJEmSJEmSJEmSJEkwD/wNXg1NDBMDdlYAAAAASUVORK5CYII=" />
                </span>
              </button>
            </Link>

            {/* STATUS */}
            <Link to="/user/status" className="xl:hidden">
              <button
                className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
                type="button"
              >
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#004aad"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </Link>

            {/* NOTIFICATION */}
            <button
              aria-expanded="false"
              aria-haspopup="menu"
              id=":r2:"
              className={`relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`}
              type="button"
              onClick={() => handleNotification(localStorage.getItem("userId"))}
            >
              {noti && <NotificationWindow />}
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#004aad"
                  aria-hidden="true"
                  className="h-5 w-5 text-blue-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            {/*  */}
            {/* ---------------  LOGOUT  ----------- */}
            <button
              className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
              type="button"
              onClick={handleSignout}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <img
                  className="w-32"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACAUlEQVR4nO2aPasTURCGXzSCWqo/QBSjIFbpbAIWJjObwibcTv+CqH3EHyBqFxsbi3s3MxtIo11aEbSVi+IH3FvGi9fG7sguEpBETWSTc7JnHphuOcO8OzPngwEMwzAMwzCMkmiOa+jIJSTDRqmWr5mvHSyd0RmQPAHJAVjdSozkK0ge40Z2GkHRSi+C9PPKAp8x+QTK6giCzugkWN+vL/ipCLvopid8hw+w3lt/8NOSuOM7fIDltT8B9FUIGfDdYwYchiCA82reYRPAWQawlYCzHsDWBJ3tAlz6Pv8GpP2/HrW9wys75e2g1ztS+Gg+Ow7WYWwCXPvNT6N/DCRZPAIkg1szvnIRWCUOAUj20RqenS+CDKovABdl8AXt7PyMz256FCzPN08AkgOQ3gfJFpKsu5Dx4Opcv/n7IOs2NkcA+YHW4HKpvoN4JOWF//4LVBJeuJ5fopLwEiVAwyvxlgD/aoIsDyJtgvp/22Ai56qzDfJSwe/FfRAivRn5UVgjvwyRpHFfh7mwt2B5CpYPf/ym4gK4f5p32ARwlgFsJeCsB7A1QRfnLkBy6K8HyDff4cNGZEjuesuAtt72/f9RjKrlI2vrDp70XXFHCALK6sXw4vqC/4hELiAorqenwPoIrJMVBj8BycPCV7A0x7UiI8oels7XDOIR1DAMwzAMA9XgJ3Qkt/3jE3KLAAAAAElFTkSuQmCC"
                />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserDashNavBarBig;
