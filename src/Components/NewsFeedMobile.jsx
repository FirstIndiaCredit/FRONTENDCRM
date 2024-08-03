import React from "react";
import { Link } from "react-router-dom";

function NewsFeedMobile({ link, img }) {
  return (
    <div className="">
      <Link to={link} className="flex items-center gap-4 py-2 px-8">
        {/* <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white"></h6> */}
        <img className="mx-auto  w-96 " src={img} alt="image" />
      </Link>
    </div>
  );
}

export default NewsFeedMobile;
