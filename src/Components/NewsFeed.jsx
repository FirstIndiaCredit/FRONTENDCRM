import React from "react";
import { Link } from "react-router-dom";
function NewsFeed({ img, link }) {
  console.log(img);
  return (
    <div className="border-l pl-4">
      <Link className="flex items-center gap-4 py-6 px-0" to={link}>
        <img className="mx-auto max-w-md w-64 h-50" src={img} alt="image" />
      </Link>
    </div>
  );
}

export default NewsFeed;
